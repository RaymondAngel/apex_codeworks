param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl
)

$ErrorActionPreference = 'Stop'
$site = [Uri]$SiteUrl
if ($site.Scheme -ne 'https' -or $site.AbsolutePath -ne '/' -or $site.Query -or $site.Fragment) {
    throw 'SiteUrl must be the confirmed HTTPS website origin, without a path, query, or fragment.'
}
$origin = $site.GetLeftPart([UriPartial]::Authority)
$root = Split-Path $PSScriptRoot -Parent
$output = Join-Path $root ('cloudflare-upload-' + [Guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory -Path $output | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)

# Only publish public website assets, excluding Git metadata and working files.
Get-ChildItem -LiteralPath $root -File | Where-Object {
    $_.Extension -eq '.html' -or $_.Name -in @('robots.txt', 'sitemap.xml', 'site.webmanifest')
} | Copy-Item -Destination $output
foreach ($folder in @('styles', 'scripts', 'images', 'icons', 'downloads')) {
    $destination = Join-Path $output $folder
    New-Item -ItemType Directory -Path $destination | Out-Null
    Get-ChildItem -LiteralPath (Join-Path $root $folder) -File | Where-Object {
        $_.Extension -notin @('.ps1', '.mjs')
    } | Copy-Item -Destination $destination
}

$oldOrigin = 'https://raymondangel.github.io/apex_codeworks'
Get-ChildItem -LiteralPath $output -Recurse -File | Where-Object {
    $_.Extension -in @('.html', '.xml', '.txt', '.js', '.json', '.webmanifest', '.url', '.webloc', '.css', '.svg')
} | ForEach-Object {
    $content = [IO.File]::ReadAllText($_.FullName)
    $content = $content.Replace($oldOrigin, $origin)
    # Pages serves clean page URLs and redirects requests ending in .html.
    if ($_.Extension -in @('.html', '.xml', '.url', '.webloc')) {
        $content = $content.Replace("$origin/index.html", "$origin/")
        $content = [regex]::Replace($content, [regex]::Escape($origin) + '/([a-z-]+)\.html', "$origin/`$1")
    }
    [IO.File]::WriteAllText($_.FullName, $content, $utf8)
}

# A real 404 prevents unknown URLs from falling back to the homepage (soft 404).
$notFound = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Apex Code Works</title><link rel="stylesheet" href="/styles/main.css"></head><body><main class="section-shell"><h1>Page not found</h1><p>This page could not be found.</p><p><a href="/">Return to Apex Code Works</a></p></main></body></html>'
[IO.File]::WriteAllText((Join-Path $output '404.html'), $notFound, $utf8)
[IO.File]::WriteAllText((Join-Path $output '_headers'), "/*`n  X-Content-Type-Options: nosniff`n  Referrer-Policy: strict-origin-when-cross-origin`n", $utf8)

[xml]$sitemap = [IO.File]::ReadAllText((Join-Path $output 'sitemap.xml'))
foreach ($entry in $sitemap.urlset.url) {
    $url = [Uri]$entry.loc
    if ($url.GetLeftPart([UriPartial]::Authority) -ne $origin) { throw "Incorrect sitemap origin: $url" }
    $page = if ($url.AbsolutePath -eq '/') { 'index.html' } else { $url.AbsolutePath.TrimStart('/') + '.html' }
    if (-not (Test-Path -LiteralPath (Join-Path $output $page))) { throw "Missing sitemap page: $page" }
}
Get-ChildItem -LiteralPath $output -File -Filter '*.html' | Where-Object Name -ne '404.html' | ForEach-Object {
    $html = [IO.File]::ReadAllText($_.FullName)
    if ($html -notmatch '<link rel="canonical" href="https://') { throw "Missing canonical URL: $($_.Name)" }
    if ($html -match $oldOrigin -or $html -match 'noindex') { throw "Indexing conflict: $($_.Name)" }
}
$files = @(Get-ChildItem -LiteralPath $output -Recurse -File)
if ($files.Count -gt 1000) { throw 'Too many files for dashboard upload.' }
if ($files | Where-Object Length -gt 25MB) { throw 'An asset exceeds the Pages file-size limit.' }
$archive = "$output.zip"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::Open($archive, [IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($file in $files) {
        $relative = $file.FullName.Substring($output.Length + 1).Replace('\', '/')
        [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $relative) | Out-Null
    }
} finally { $zip.Dispose() }
Write-Output "Validated $($sitemap.urlset.url.Count) sitemap pages and $($files.Count) public files."
Write-Output "Upload ZIP: $archive"
Write-Output 'The URL must match the address Cloudflare assigns before publishing.'
