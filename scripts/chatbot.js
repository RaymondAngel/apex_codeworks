/* Static site guide. Edit TOPICS to tailor answers and destinations.
   No API, dependencies, storage or remote requests. */
(() => {
  "use strict";
  if (document.getElementById("apex-chat")) return;
  const script = document.currentScript;
  const base = new URL("../", script.src);
  const TOPICS = [
  {
    "id": "start",
    "title": "Business websites",
    "terms": [
      "website",
      "websites",
      "static",
      "contractor",
      "business",
      "responsive",
      "mobile",
      "gallery",
      "design"
    ],
    "answer": "Apex focuses on static business websites for contractors and local service businesses. Packages start at $1,750 for up to five pages, a project gallery, an inquiry form, mobile-friendly layouts, and two revision rounds. Final scope and schedule are agreed before work starts.",
    "links": [
      [
        "Business websites",
        "custom-websites.html"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "improve",
    "title": "Website improvements",
    "terms": [
      "repair",
      "fix",
      "redesign",
      "improve",
      "broken",
      "speed",
      "navigation",
      "accessibility"
    ],
    "answer": "Repairs and redesigns are quoted after a review of your current website. Agree on a specific problem or set of improvements before work begins.",
    "links": [
      [
        "Website improvements",
        "website-redesigns.html"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "care",
    "title": "Optional website care",
    "terms": [
      "care",
      "hosting",
      "support",
      "maintenance",
      "updates",
      "backup",
      "security",
      "monitoring"
    ],
    "answer": "Optional care starts at $150 per month and includes availability and inquiry-form checks, recoverable backups, and up to one hour of content updates per month. Extra work and third-party fees are separate. Scope, response times, and cancellation terms are agreed in advance.",
    "links": [
      [
        "Optional website care",
        "hosting-security.html"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "payments",
    "title": "Stripe and PayPal integrations",
    "terms": [
      "stripe",
      "paypal",
      "payment",
      "payments",
      "api",
      "integration",
      "checkout"
    ],
    "answer": "Stripe and PayPal payment integrations can be discussed as separately scoped add-ons, including hosted checkout and API connections where appropriate. You use your own provider account; availability, approval, and processing fees depend on the provider. Do not share API credentials in this chat or the inquiry form.",
    "links": [
      [
        "Stripe and PayPal integrations",
        "custom-websites.html"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "automation",
    "title": "Custom software and work automations",
    "terms": [
      "software",
      "automation",
      "automations",
      "workflow",
      "automate",
      "application",
      "portal",
      "dashboard"
    ],
    "answer": "Need more than a website? Custom software programs, work automations, and other third-party API integrations can be discussed and quoted separately after we review your workflow and requirements.",
    "links": [
      [
        "Custom software and work automations",
        "contact.html#project-form"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "ownership",
    "title": "Website ownership",
    "terms": [
      "own",
      "ownership",
      "files",
      "cancel",
      "keep",
      "handover"
    ],
    "answer": "After full payment, your completed website and the custom code covered by your agreement are yours. Website care is optional. Your domain and hosting accounts stay under your control. Third-party services and licensed assets retain their own terms and fees. Without care, you arrange hosting, renewals, maintenance, and future changes.",
    "links": [
      [
        "Website ownership",
        "custom-websites.html"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "quote",
    "title": "Pricing and project scope",
    "terms": [
      "price",
      "pricing",
      "cost",
      "quote",
      "budget",
      "1750",
      "150"
    ],
    "answer": "Business website packages start at $1,750; optional care starts at $150 per month. Repairs, payment integrations, and custom software are quoted separately. Final scope, payment milestones, and any third-party fees are agreed before work starts.",
    "links": [
      [
        "Pricing and project scope",
        "custom-websites.html"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "contact",
    "title": "Contact Apex",
    "terms": [
      "contact",
      "email",
      "phone",
      "call",
      "consultation",
      "remote",
      "california"
    ],
    "answer": "Contact Apex at Raymond.Angel.Developer@gmail.com or 661-646-3424. Remote consultations are available by appointment, Monday through Friday. Expect a response within two business days.",
    "links": [
      [
        "Contact Apex",
        "contact.html"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  }
];
  const normalize = value => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  function match(value) {
    const query = ` ${normalize(value)} `;

    let preferred;
    if (/\b(stripe|paypal|payments?|checkout|apis?|integrations?)\b/.test(query)) preferred = 'payments';
    else if (/\b(ownership|own|keep|handover|cancel)\b/.test(query)) preferred = 'ownership';
    else if (/\b(automation|automations|automate|workflow|software|portal|dashboard)\b/.test(query)) preferred = 'automation';
    else if (/\b(price|pricing|cost|quote|budget)\b/.test(query)) preferred = 'quote';
    else if (/\b(care|hosting|maintenance|updates|backups?|monitoring|security|support)\b/.test(query)) preferred = 'care';
    else if (/\b(repair|fix|redesign|improve|broken)\b/.test(query)) preferred = 'improve';
    if (preferred) return [TOPICS.find(topic => topic.id === preferred)];

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
      message("I couldn't match that to an Apex topic. Try websites, improvements, care, Stripe, PayPal, automation, ownership, pricing, or contact. Browse all topics for the full directory.");
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
