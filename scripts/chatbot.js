/* Static site guide. Edit TOPICS to tailor answers and destinations.
   No API, dependencies, storage or remote requests. */
(() => {
  "use strict";
  if (document.getElementById("apex-chat")) return;
  const script = document.currentScript;
  const base = new URL("../", script.src);
  const TOPICS = [
    {
        "id":  "api",
        "title":  "API and third-party integrations",
        "terms":  [
                      "api",
                      "apis",
                      "integration",
                      "integrations",
                      "integrate",
                      "connect",
                      "third party",
                      "third-party"
                  ],
        "answer":  "Apex offers API and third-party service integrations for web applications, plus system integrations for custom software. These connections let applications exchange information and work together. Tell us which systems you use and what information or actions should move between them so Apex can review compatibility and scope. Please do not share API keys here.",
        "links":  [
                      [
                          "Web application integrations",
                          "web-applications.html"
                      ],
                      [
                          "System integrations",
                          "custom-software.html"
                      ],
                      [
                          "Discuss an integration",
                          "contact.html#project-form"
                      ]
                  ]
    },
    {
        "id":  "automation",
        "title":  "Workflow automation and business tools",
        "terms":  [
                      "automation",
                      "automate",
                      "automated",
                      "workflow",
                      "workflows",
                      "repetitive",
                      "manual",
                      "business tools"
                  ],
        "answer":  "Apex builds workflow automation and business tools to reduce repetitive manual processes. Describe the steps your team performs today, the systems involved and the result you need. A custom solution can be planned around the way your organization works.",
        "links":  [
                      [
                          "Custom software",
                          "custom-software.html"
                      ],
                      [
                          "Workflow applications",
                          "web-applications.html"
                      ]
                  ]
    },
    {
        "id":  "data",
        "title":  "Data management, reporting and dashboards",
        "terms":  [
                      "data",
                      "database",
                      "databases",
                      "reporting",
                      "report",
                      "reports",
                      "dashboard",
                      "dashboards",
                      "calculator",
                      "calculators",
                      "internal tools"
                  ],
        "answer":  "Apex offers data management and reporting through custom software, and dashboards, calculators and internal tools through web applications. Share your data sources, who needs access and what information or calculations the tool should show.",
        "links":  [
                      [
                          "Data management and reporting",
                          "custom-software.html"
                      ],
                      [
                          "Dashboards and calculators",
                          "web-applications.html"
                      ]
                  ]
    },
    {
        "id":  "portals",
        "title":  "Customer and employee portals",
        "terms":  [
                      "portal",
                      "portals",
                      "customer portal",
                      "employee portal"
                  ],
        "answer":  "Apex builds browser-based customer and employee portals that connect people with information across devices. Describe your users, the information they need and the tasks they should complete.",
        "links":  [
                      [
                          "Customer and employee portals",
                          "web-applications.html"
                      ]
                  ]
    },
    {
        "id":  "accounts",
        "title":  "Secure accounts and role-based access",
        "terms":  [
                      "account",
                      "accounts",
                      "login",
                      "log in",
                      "sign in",
                      "authentication",
                      "authorization",
                      "permissions",
                      "roles",
                      "role based",
                      "user access"
                  ],
        "answer":  "Apex offers secure accounts and role-based access as part of web application development. Different users can be given access appropriate to their responsibilities. Tell Apex which user roles and access rules your application needs; this chat cannot access or reset accounts.",
        "links":  [
                      [
                          "Secure web applications",
                          "web-applications.html"
                      ],
                      [
                          "Discuss access requirements",
                          "contact.html#project-form"
                      ]
                  ]
    },
    {
        "id":  "responsive",
        "title":  "Responsive layouts across devices",
        "terms":  [
                      "responsive",
                      "mobile",
                      "phone",
                      "phones",
                      "tablet",
                      "tablets",
                      "desktop layout",
                      "screen sizes"
                  ],
        "answer":  "Apex designs responsive layouts for phones, tablets and desktops. Responsive design is included in its custom website, website design and redesign services so visitors can use the site across screen sizes.",
        "links":  [
                      [
                          "Custom websites",
                          "custom-websites.html"
                      ],
                      [
                          "Website design",
                          "website-design.html"
                      ],
                      [
                          "Website redesigns",
                          "website-redesigns.html"
                      ]
                  ]
    },
    {
        "id":  "accessibility",
        "title":  "Accessibility, navigation and usability",
        "terms":  [
                      "accessible",
                      "accessibility",
                      "navigation",
                      "usability",
                      "user experience",
                      "screen reader",
                      "interaction patterns"
                  ],
        "answer":  "Apex offers clear navigation, accessible user experiences, accessible interface components and usability reviews. Existing sites can be reviewed for performance and accessibility improvements. Discuss your audience and accessibility requirements with Apex to define the project scope.",
        "links":  [
                      [
                          "Accessible website design",
                          "website-design.html"
                      ],
                      [
                          "Usability and accessibility improvements",
                          "website-redesigns.html"
                      ],
                      [
                          "Custom websites",
                          "custom-websites.html"
                      ]
                  ]
    },
    {
        "id":  "search",
        "title":  "Search-friendly structure and performance",
        "terms":  [
                      "seo",
                      "search",
                      "search engine",
                      "search friendly",
                      "performance",
                      "optimization",
                      "optimisation",
                      "speed",
                      "slow",
                      "fast",
                      "loading"
                  ],
        "answer":  "Apex offers search-friendly website structure and performance optimization for custom websites, performance improvements during redesigns, and ongoing performance checks through hosting and maintenance. Contact Apex to discuss your current site and goals.",
        "links":  [
                      [
                          "Search-friendly custom websites",
                          "custom-websites.html"
                      ],
                      [
                          "Website performance improvements",
                          "website-redesigns.html"
                      ],
                      [
                          "Ongoing performance checks",
                          "hosting-security.html"
                      ]
                  ]
    },
    {
        "id":  "content",
        "title":  "Content planning and maintainable websites",
        "terms":  [
                      "content",
                      "cms",
                      "content management",
                      "page planning",
                      "information architecture",
                      "maintain content"
                  ],
        "answer":  "Apex offers information architecture and page planning through website design, easy-to-maintain content systems through custom websites, and content reviews during redesigns. Tell Apex who will update your site and how your information should be organized.",
        "links":  [
                      [
                          "Content systems",
                          "custom-websites.html"
                      ],
                      [
                          "Page planning",
                          "website-design.html"
                      ],
                      [
                          "Content reviews",
                          "website-redesigns.html"
                      ]
                  ]
    },
    {
        "id":  "branding",
        "title":  "Brand-aligned website design",
        "terms":  [
                      "brand",
                      "branding",
                      "colors",
                      "colours",
                      "color",
                      "typography",
                      "fonts",
                      "imagery",
                      "visual",
                      "interface",
                      "ui"
                  ],
        "answer":  "Apex creates website visual systems with brand-aligned color, typography and imagery, responsive interface design and accessible interaction patterns. Share your existing brand materials and the audience your website should serve.",
        "links":  [
                      [
                          "Website design",
                          "website-design.html"
                      ]
                  ]
    },
    {
        "id":  "migration",
        "title":  "Migration and system modernization",
        "terms":  [
                      "migration",
                      "migrate",
                      "migrating",
                      "modernization",
                      "modernize",
                      "legacy",
                      "move website",
                      "launch support"
                  ],
        "answer":  "Apex offers migration planning with launch support for website redesigns, and system integrations and modernization for custom software. Share the current system, what needs to be preserved and your launch constraints so Apex can discuss a plan.",
        "links":  [
                      [
                          "Website migration planning",
                          "website-redesigns.html"
                      ],
                      [
                          "System modernization",
                          "custom-software.html"
                      ]
                  ]
    },
    {
        "id":  "deployment",
        "title":  "Deployment, domains and SSL",
        "terms":  [
                      "deployment",
                      "deploy",
                      "domain",
                      "domains",
                      "dns",
                      "ssl",
                      "https",
                      "certificate",
                      "hosting"
                  ],
        "answer":  "Apex offers managed hosting, secure deployment, domain configuration and SSL through its hosting and security services. Tell Apex about your current hosting, domain and deployment needs to discuss the setup.",
        "links":  [
                      [
                          "Hosting, deployment and domains",
                          "hosting-security.html"
                      ]
                  ]
    },
    {
        "id":  "maintenance",
        "title":  "Backups, monitoring and maintenance",
        "terms":  [
                      "backup",
                      "backups",
                      "monitoring",
                      "uptime",
                      "availability monitoring",
                      "maintenance",
                      "updates",
                      "vulnerability",
                      "vulnerabilities",
                      "security"
                  ],
        "answer":  "Apex offers backups, availability monitoring, software updates, vulnerability reduction, performance checks and ongoing maintenance. Contact Apex to agree on the support scope for your website or application.",
        "links":  [
                      [
                          "Hosting and security maintenance",
                          "hosting-security.html"
                      ],
                      [
                          "Discuss ongoing support",
                          "contact.html"
                      ]
                  ]
    },
    {
        "id":  "testing",
        "title":  "Testing, documentation and ongoing support",
        "terms":  [
                      "testing",
                      "test",
                      "tests",
                      "documentation",
                      "document",
                      "ongoing support",
                      "quality assurance",
                      "qa"
                  ],
        "answer":  "Apex lists testing, documentation and ongoing support as part of its custom software services. Its project process also covers development, testing, refinement and launch. Discuss the checks, documentation and ongoing support your team needs.",
        "links":  [
                      [
                          "Custom software support",
                          "custom-software.html"
                      ],
                      [
                          "Project process",
                          "index.html#process"
                      ]
                  ]
    },
    {
        "id":  "start",
        "title":  "Explore Apex services",
        "terms":  [
                      "start",
                      "help",
                      "services",
                      "service",
                      "about",
                      "apex",
                      "what can"
                  ],
        "answer":  "Apex Code Works builds custom websites, web applications and software, and offers website design, redesigns, hosting and security. Explore our services or tell us what you want to build.",
        "links":  [
                      [
                          "Explore services",
                          "index.html#services"
                      ],
                      [
                          "About Apex",
                          "about.html"
                      ]
                  ]
    },
    {
        "id":  "websites",
        "title":  "Websites and design",
        "terms":  [
                      "website",
                      "websites",
                      "design",
                      "responsive",
                      "new site"
                  ],
        "answer":  "Apex creates responsive business websites shaped around your brand, message and customers. Explore custom development and website design, then share your goals in a project inquiry.",
        "links":  [
                      [
                          "Custom websites",
                          "custom-websites.html"
                      ],
                      [
                          "Website design",
                          "website-design.html"
                      ]
                  ]
    },
    {
        "id":  "redesign",
        "title":  "Website redesigns",
        "terms":  [
                      "redesign",
                      "redesigns",
                      "existing",
                      "refresh",
                      "modern"
                  ],
        "answer":  "Give your existing website a clearer, faster and more modern experience. Share your current site and what you would like to improve.",
        "links":  [
                      [
                          "Website redesigns",
                          "website-redesigns.html"
                      ],
                      [
                          "Discuss a redesign",
                          "contact.html#project-form"
                      ]
                  ]
    },
    {
        "id":  "software",
        "title":  "Applications and software",
        "terms":  [
                      "app",
                      "apps",
                      "application",
                      "applications",
                      "software",
                      "automation",
                      "workflow",
                      "tool",
                      "tools"
                  ],
        "answer":  "Apex builds interactive web applications and custom software around your business needs. Tell us what your solution should accomplish and who will use it.",
        "links":  [
                      [
                          "Web applications",
                          "web-applications.html"
                      ],
                      [
                          "Custom software",
                          "custom-software.html"
                      ]
                  ]
    },
    {
        "id":  "hosting",
        "title":  "Hosting, security and support",
        "terms":  [
                      "hosting",
                      "security",
                      "secure",
                      "maintenance",
                      "support",
                      "updates",
                      "broken",
                      "error"
                  ],
        "answer":  "Apex offers deployment, protection, monitoring and maintenance through its hosting and security services. Contact Apex for help with an existing project; this guide cannot inspect accounts or systems.",
        "links":  [
                      [
                          "Hosting and security",
                          "hosting-security.html"
                      ],
                      [
                          "Contact support",
                          "contact.html"
                      ]
                  ]
    },
    {
        "id":  "quote",
        "title":  "Start a project / get a quote",
        "terms":  [
                      "quote",
                      "pricing",
                      "price",
                      "cost",
                      "budget",
                      "estimate",
                      "hire",
                      "payment",
                      "rates",
                      "timeline",
                      "how much",
                      "project"
                  ],
        "answer":  "Use the project inquiry form to share your service needs, goals and optional budget in US dollars. Apex can discuss scope, timing and a quote with you. This guide cannot give a binding price or book a project.",
        "links":  [
                      [
                          "Request a project quote",
                          "contact.html#project-form"
                      ]
                  ]
    },
    {
        "id":  "process",
        "title":  "Process and service area",
        "terms":  [
                      "process",
                      "steps",
                      "launch",
                      "remote",
                      "california",
                      "location",
                      "where",
                      "city",
                      "county",
                      "area"
                  ],
        "answer":  "Apex collaborates remotely with businesses throughout California, including California City, Kern County, Los Angeles County, Antelope Valley and San Francisco. Our process covers discovery, design, build and support.",
        "links":  [
                      [
                          "How we work",
                          "index.html#process"
                      ],
                      [
                          "Discuss your project",
                          "contact.html"
                      ]
                  ]
    },
    {
        "id":  "contact",
        "title":  "Contact Apex Code Works",
        "terms":  [
                      "contact",
                      "email",
                      "phone",
                      "call",
                      "human",
                      "person",
                      "message",
                      "inquiry",
                      "confirmation"
                  ],
        "answer":  "Email Raymond.Angel.Developer@gmail.com or call 661-646-3424. You can also send the project inquiry form. Include your confirmation number when following up, if you have one. This guide cannot send messages or connect you to a live agent.",
        "links":  [
                      [
                          "Project inquiry form",
                          "contact.html#project-form"
                      ],
                      [
                          "Email Apex",
                          "mailto:Raymond.Angel.Developer@gmail.com"
                      ],
                      [
                          "Call Apex",
                          "tel:+16616463424"
                      ]
                  ]
    },
    {
        "id":  "careers",
        "title":  "Career opportunities",
        "terms":  [
                      "career",
                      "careers",
                      "job",
                      "jobs",
                      "hiring",
                      "employment"
                  ],
        "answer":  "Visit the Careers page for published opportunities and availability.",
        "links":  [
                      [
                          "View careers",
                          "careers.html"
                      ]
                  ]
    },
    {
        "id":  "save",
        "title":  "Save Apex to your device",
        "terms":  [
                      "save",
                      "download",
                      "install",
                      "icon",
                      "desktop",
                      "home screen",
                      "bookmark"
                  ],
        "answer":  "The Save Apex page explains how to download the desktop icon or add Apex Code Works to your home screen for easy access.",
        "links":  [
                      [
                          "Save Apex",
                          "save-apex.html"
                      ]
                  ]
    },
    {
        "id":  "privacy",
        "title":  "About this chat",
        "terms":  [
                      "privacy",
                      "private",
                      "store",
                      "stored",
                      "chat",
                      "bot",
                      "ai",
                      "password",
                      "tracking"
                  ],
        "answer":  "This automated site guide matches questions to prepared Apex information in your browser. It does not send or save chat messages. Minimize keeps this page\u0027s conversation; Clear chat or reloading removes it. Please keep passwords and sensitive information out of chat.",
        "links":  [
                      [
                          "Contact Apex",
                          "contact.html"
                      ]
                  ]
    }
];
  const normalize = value => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  function match(value) {
    const query = ` ${normalize(value)} `;
    // Specific services take priority over general words such as website or project.
    // Each condition points to the corresponding prepared answer above.
    let serviceId;
    if (/\b(apis?|integrations?|integrate|connect|third party)\b/.test(query)) serviceId = "api";
    else if (/\b(automation|automate|automated|workflows?|repetitive|manual|business tools)\b/.test(query)) serviceId = "automation";
    else if (/\b(data|databases?|reports?|reporting|dashboards?|calculators?|internal tools)\b/.test(query)) serviceId = "data";
    else if (/\b(portals?)\b/.test(query)) serviceId = "portals";
    else if (/\b(accounts?|login|log in|sign in|authentication|authorization|permissions|roles?|role based|user access)\b/.test(query)) serviceId = "accounts";
    else if (/\b(responsive|mobile|phones?|tablets?|desktop layout|screen sizes)\b/.test(query)) serviceId = "responsive";
    else if (/\b(accessible|accessibility|navigation|usability|user experience|screen reader|interaction patterns)\b/.test(query)) serviceId = "accessibility";
    else if (/\b(seo|search|performance|optimization|optimisation|speed|slow|fast|loading)\b/.test(query)) serviceId = "search";
    else if (/\b(content|cms|page planning|information architecture)\b/.test(query)) serviceId = "content";
    else if (/\b(brand|branding|colors?|colours?|typography|fonts?|imagery|visual|interface|ui)\b/.test(query)) serviceId = "branding";
    else if (/\b(migration|migrate|migrating|modernization|modernize|legacy|move website|launch support)\b/.test(query)) serviceId = "migration";
    else if (/\b(deployment|deploy|domains?|dns|ssl|https|certificate|hosting)\b/.test(query)) serviceId = "deployment";
    else if (/\b(backups?|monitoring|uptime|maintenance|updates|vulnerability|vulnerabilities|security)\b/.test(query)) serviceId = "maintenance";
    else if (/\b(testing|tests?|documentation|document|ongoing support|quality assurance|qa)\b/.test(query)) serviceId = "testing";
    if (serviceId) return [TOPICS.find(topic => topic.id === serviceId)];
    return TOPICS.map(topic => ({ topic, score: topic.terms.reduce((score, term) => query.includes(` ${term} `) ? score + term.split(" ").length * 2 : score, 0) }))
      .filter(result => result.score).sort((a, b) => b.score - a.score).slice(0, 3).map(result => result.topic);
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function button(label, action, className = "") {
    const node = element("button", className, label);
    node.type = "button";
    node.addEventListener("click", action);
    return node;
  }
  const root = element("aside", "apex-chat");
  root.id = "apex-chat";
  root.setAttribute("aria-label", "Website navigation chat");
  const toggle = button("", () => setOpen(panel.hidden), "apex-chat-toggle");
  toggle.setAttribute("aria-label", "Open Apex chat");
  toggle.title = "Chat with the Apex site guide";
  const robot = element("img", "apex-chat-robot");
  robot.src = new URL("images/chat-robot.svg", base).href;
  robot.alt = "";
  robot.width = 36;
  robot.height = 36;
  toggle.prepend(robot);
  toggle.setAttribute("aria-controls", "apex-chat-panel");
  toggle.setAttribute("aria-expanded", "false");
  const panel = element("section", "apex-chat-panel");
  panel.id = "apex-chat-panel";
  panel.hidden = true;
  panel.setAttribute("aria-labelledby", "apex-chat-title");
  const header = element("div", "apex-chat-header");
  const heading = element("h2", "", "Your Apex website guide");
  heading.id = "apex-chat-title";
  const controls = element("div", "apex-chat-window-controls");
  const expand = button("⤢", () => {
    const expanded = root.classList.toggle("apex-chat-expanded");
    expand.setAttribute("aria-pressed", String(expanded));
    expand.setAttribute("aria-label", expanded ? "Restore chat size" : "Expand chat by 20 percent");
    expand.title = expanded ? "Restore size" : "Expand by 20%";
  });
  expand.setAttribute("aria-label", "Expand chat by 20 percent");
  expand.setAttribute("aria-pressed", "false");
  expand.title = "Expand by 20%";
  const minimize = button("−", () => setOpen(false));
  minimize.setAttribute("aria-label", "Minimize website chat");
  minimize.title = "Minimize chat";
  controls.append(expand, minimize);
  header.append(heading, controls);
  const intro = element("p", "apex-chat-intro", "Ask about Apex services or find a page. Automated site guide; no live agent.");
  const log = element("div", "apex-chat-log");
  log.setAttribute("role", "log");
  log.setAttribute("aria-label", "Chat messages");
  log.setAttribute("aria-live", "polite");
  log.setAttribute("aria-relevant", "additions");
  log.tabIndex = 0;
  const suggestions = element("div", "apex-chat-topics");
  suggestions.setAttribute("aria-label", "Suggested topics");
  for (const topic of TOPICS) suggestions.append(button(topic.title, () => answer(topic.title, [topic])));
  const topicDetails = element("details", "apex-chat-topic-list");
  topicDetails.append(element("summary", "", "Browse all topics"), suggestions);
  const form = element("form", "apex-chat-form");
  const label = element("label", "", "What would you like to find?");
  label.htmlFor = "apex-chat-question";
  const input = element("input");
  input.id = "apex-chat-question";
  input.type = "text";
  input.maxLength = 300;
  input.required = true;
  input.autocomplete = "off";
  input.placeholder = "Try: Can you redesign my website?";
  const row = element("div", "apex-chat-input-row");
  const send = element("button", "apex-chat-send", "Send");
  send.type = "submit";
  row.append(input, send);
  form.append(label, row);
  const footer = element("div", "apex-chat-footer");
  footer.append(element("span", "", "Browser-only · No AI fees"), button("Clear chat", () => { log.replaceChildren(); welcome(); log.scrollTop = 0; input.focus(); }));
  panel.append(header, intro, log, topicDetails, form, footer);
  root.append(panel, toggle);
  document.body.append(root);
  function message(text, from = "Guide") {
    const bubble = element("div", `apex-chat-message${from === "You" ? " apex-chat-user" : ""}`);
    bubble.append(element("strong", "apex-chat-speaker", from), element("p", "", text));
    log.append(bubble);
    // Bound DOM size for long sessions; nothing is persisted.
    while (log.children.length > 40) log.firstElementChild.remove();
    return bubble;
  }
  function welcome() {
    const bubble = message("Hi! I can help you explore Apex Code Works services, plan a project, or find contact information. Choose a starting point or type a question below.");
    for (const id of ["start", "quote", "contact"]) {
      const topic = TOPICS.find(item => item.id === id);
      bubble.append(button(topic.title, () => answer(topic.title, [topic]), "apex-chat-shortcut"));
    }
  }
  function answer(question, matches = match(question)) {
    topicDetails.open = false;
    message(question, "You");
    const normalized = normalize(question);
    const sensitive = /\b(sk-|AIza)[A-Za-z0-9_-]{12,}/.test(question);
    const greeting = /^(hi|hello|hey|thanks|thank you)$/.test(normalized);
    if (sensitive) {
      log.lastElementChild.querySelector("p").textContent = "[Possible API key hidden]";
      message("Please keep API keys and sensitive information out of chat. Clear this chat if you entered sensitive information.");
    } else if (greeting) {
      message("Happy to help! Tell me what you want to find, or open Browse all topics.");
    } else if (matches.length) {
      const bubble = message(matches[0].answer);
      addLinks(bubble, matches[0].links);
      if (matches.length > 1) {
        bubble.append(element("p", "", "Other matching topics:"));
        for (const topic of matches.slice(1)) bubble.append(button(topic.title, () => answer(topic.title, [topic]), "apex-chat-shortcut"));
      }
    } else {
      message("I couldn't match that to an Apex topic. Try websites, redesign, software, hosting, pricing, or contact. Browse all topics for the full directory.");
    }
    // Start at the answer's beginning instead of skipping to its last link.
    log.scrollTop = log.lastElementChild.offsetTop;
  }
  function addLinks(bubble, links) {
    const list = element("ul", "apex-chat-links");
    for (const [label, path] of links) {
      const item = element("li");
      const link = element("a", "", label);
      link.href = new URL(path, base).href;
      item.append(link);
      list.append(item);
    }
    bubble.append(list);
  }
  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) input.focus(); else toggle.focus();
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    input.value = "";
    answer(question);
    input.focus();
  });
  root.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) { event.preventDefault(); setOpen(false); }
  });
  welcome();
})();
