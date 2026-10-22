// Generate shortcuts for the current deployment, including GitHub project subpaths.
document.querySelectorAll('[data-shortcut]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!['http:', 'https:'].includes(window.location.protocol)) return;
    event.preventDefault();
    const home = new URL('index.html', window.location.href).href;
    const xmlHome = home.replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[character]));
    const mac = link.dataset.shortcut === 'mac';
    const content = mac
      ? '<?xml version="1.0" encoding="UTF-8"?><plist version="1.0"><dict><key>URL</key><string>' + xmlHome + '</string></dict></plist>'
      : '[InternetShortcut]\r\nURL=' + home + '\r\n';
    const blob = new Blob([content], { type: mac ? 'application/xml' : 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = mac ? 'Apex Code Works.webloc' : 'Apex Code Works.url';
    document.body.append(download);
    download.click();
    download.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
});
