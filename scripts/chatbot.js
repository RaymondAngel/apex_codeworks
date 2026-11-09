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
      "monitoring",
      "rollover",
      "roll over",
      "unused",
      "allowance",
      "hour",
      "hours"
    ],
    "answer": "Optional care starts at $150 per month. Monthly website availability, inquiry-form, and backup checks are separate from your update allowance; a recoverable copy is saved before changes. You get up to 60 minutes of customer-requested text, photo, and business-information changes per billing month, including making, testing, and publishing them. Unused time does not roll over. New pages, redesigns, integrations, new features, urgent work, troubleshooting, and repairs are quoted separately. We explain and obtain approval for out-of-scope work or time beyond your allowance before starting it. We respond within two business days, Monday through Friday; completion dates are agreed per request. No continuous monitoring, unlimited repairs, or 24-hour support. Hosting, domain renewals, and third-party fees are separate. Billing and cancellation terms are agreed before the plan begins.",
    "links": [
      [
        "Optional website care",
        "hosting-security.html"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ],
      [
        "Care and project FAQs",
        "faq.html"
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
      ],
      [
        "Care and project FAQs",
        "faq.html"
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
      ],
      [
        "Care and project FAQs",
        "faq.html"
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
  },
  {
    "id": "faq-timeline",
    "title": "How long does a website take?",
    "terms": [
      "timeline",
      "deadline",
      "how long",
      "weeks",
      "turnaround",
      "delivery"
    ],
    "answer": "A straightforward five-page site typically takes 2\u20134 weeks after the initial payment and required content are received and the scope is approved. This is an estimate, not a guaranteed deadline. We confirm a schedule before starting; delayed materials, feedback, approvals, third-party services, or added work can move the launch date.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#timeline"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-materials",
    "title": "What do I need to provide?",
    "terms": [
      "materials",
      "provide",
      "photos",
      "logo",
      "copywriting",
      "content"
    ],
    "answer": "Provide your business details, service descriptions, logo if you have one, contact information, and photos you have permission to use. You approve the final text and images. We can help organize your material; substantial copywriting, photography, branding, and paid assets are separately scoped. Please do not put passwords or API secrets in the inquiry form or chatbot; access arrangements are agreed separately.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#materials"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-deposit",
    "title": "When do I pay?",
    "terms": [
      "deposit",
      "milestone",
      "when do i pay",
      "payment schedule",
      "upfront",
      "balance"
    ],
    "answer": "For standard website projects, 50% is due after you accept the written proposal to reserve the agreed start, and 50% is due after you approve the completed preview, before public launch and file handover. For a $1,750 project, that is $875 at each stage. Larger or custom projects may use different milestones stated in the proposal. Optional care is billed monthly in advance from its agreed start date.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#deposit"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-revisions",
    "title": "What counts as a revision round?",
    "terms": [
      "revision",
      "revisions",
      "feedback",
      "rounds"
    ],
    "answer": "A revision round is one consolidated list of feedback on the agreed website, such as wording, photo choices, colors, or layout refinements within the approved scope. Two rounds are included. New pages, a new design direction after approval, integrations, and extra features are changes in scope. We explain any added price and obtain your approval before doing extra work.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#revisions"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-costs",
    "title": "Are hosting, domains, and other fees included?",
    "terms": [
      "fees",
      "domain",
      "hosting charges",
      "third party costs",
      "subscriptions"
    ],
    "answer": "Domain registration and renewals, hosting charges, payment-processing fees, paid assets, and other third-party subscriptions are separate from the website build and care fees unless your proposal explicitly includes them. We identify expected services and costs before setup, and you approve paid additions. Provider prices can change; we do not promise free hosting indefinitely.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#costs"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-excluded",
    "title": "What is outside the care plan?",
    "terms": [
      "excluded",
      "extra work",
      "urgent",
      "outage",
      "repairs"
    ],
    "answer": "New pages, layout redesigns, payment integrations, new features, urgent work, and troubleshooting or repairs beyond routine checks are quoted separately. We explain the scope and price and obtain your approval before starting extra work. The plan does not include unlimited edits, continuous monitoring, 24-hour support, or responsibility for third-party outages.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#excluded"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-response",
    "title": "How quickly will you answer a request?",
    "terms": [
      "response",
      "respond",
      "support",
      "emergency",
      "same day"
    ],
    "answer": "We respond within two business days, Monday through Friday. That is an initial response, not a guaranteed completion time. We agree on timing for each request based on its scope and current workload. Emergency or same-day service is not included in the standard care plan.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#response"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-cancel-care",
    "title": "How do I cancel website care?",
    "terms": [
      "cancel",
      "cancellation",
      "renewal"
    ],
    "answer": "Care is month to month and billed in advance. Email Raymond.Angel.Developer@gmail.com before the next renewal date to cancel future renewals. Your cancellation takes effect at the end of your current paid billing period; it does not require us to approve the cancellation. We continue the agreed care services through that date, then stop the care services and future care charges. Accepted payments for the current care period are nonrefundable, with no proration or credit for unused time, except where a refund is required by applicable law or to correct an erroneous charge. This policy applies only to optional website care, not website-build payments or an installment agreement. Canceling care does not take away or shut down a fully paid website; you arrange ongoing hosting, renewals, and maintenance.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#cancel-care"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-cancel-project",
    "title": "What if I need to pause or cancel a website project?",
    "terms": [
      "pause",
      "cancel project",
      "refund"
    ],
    "answer": "Tell us as soon as possible so we can review the project status together. Before work starts, the written proposal sets out how completed work, approved third-party costs, unused payments, and any refunds are handled if the project is paused or canceled. A restart may require a new schedule. We do not promise a blanket full refund regardless of work already completed.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#cancel-project"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-defects",
    "title": "What if something does not work after launch?",
    "terms": [
      "defect",
      "bug",
      "broken",
      "30 days",
      "warranty"
    ],
    "answer": "For the first 30 days after launch, we correct defects in the work delivered under the agreed website scope. New requests, changes made by others, and third-party service problems are outside that correction period. Afterward, troubleshooting and repairs are separately quoted unless included in your written agreement. Let us know what happened and which page is affected.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#defects"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-editing",
    "title": "Can I edit the website myself or hire another developer?",
    "terms": [
      "edit myself",
      "another developer",
      "cms",
      "dashboard",
      "editor"
    ],
    "answer": "Yes. After full payment and handover, you can edit the delivered files or hire another developer. Static websites usually require HTML, CSS, or JavaScript knowledge rather than a built-in editing dashboard. A content-management system or custom editor is a separate project. Changes by others may need a review before we resume support.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#editing"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "faq-results",
    "title": "Do website hosting or care guarantee Google indexing, placement, or rankings?",
    "terms": [
      "google",
      "rankings",
      "seo",
      "leads",
      "guarantee",
      "customers",
      "index",
      "indexing",
      "indexed",
      "placement",
      "sitemap"
    ],
    "answer": "No. Website development, hosting, and website care do not guarantee that Google will crawl, index, keep indexed, or display any page, or give it a particular search position. Being online, submitting a sitemap, or requesting indexing does not guarantee inclusion or ranking. Google controls its own indexing and search results. We provide the agreed website work and care tasks; search-friendly structure does not promise traffic, leads, or sales. Ongoing SEO work and indexing investigations are separately scoped unless expressly included in your proposal.",
    "links": [
      [
        "Read the FAQ",
        "faq.html#results"
      ],
      [
        "Discuss your project",
        "contact.html#project-form"
      ],
      [
        "Google: how Search works",
        "https://developers.google.com/search/docs/fundamentals/how-search-works"
      ],
      [
        "Google SEO Starter Guide",
        "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
      ]
    ]
  },
  {
    "id": "faq",
    "title": "Frequently asked questions",
    "terms": [
      "faq",
      "frequently asked questions"
    ],
    "answer": "Read the FAQ for standard project and care terms. Your written proposal confirms the final scope, price, schedule, and agreed differences before work starts.",
    "links": [
      [
        "Frequently asked questions",
        "faq.html"
      ]
    ]
  },
  {
    "id": "payment-plan",
    "title": "Proposed 12-month payment option",
    "terms": [
      "payment plan",
      "installments",
      "instalments",
      "credit",
      "financing",
      "monthly payments"
    ],
    "answer": "The proposed 12-month package combines a $1,750 website build and $150 monthly care: 11 payments of $295.83 and a final payment of $295.87, totaling $3,550 before separately agreed additions or third-party charges. Care is required during this proposed package. The plan is not yet open for enrollment; final approval and written terms are still required. You can submit a preliminary request with a self-reported score. The proposed 15-day grace period and any suspension or reinstatement terms are not active collection procedures.",
    "links": [
      [
        "Proposed payment option",
        "custom-websites.html#payment-plan"
      ],
      [
        "Request credit application instructions",
        "credit-application.html"
      ]
    ]
  },
  {
    "id": "home",
    "title": "Home and services",
    "terms": [
      "home",
      "homepage",
      "main page",
      "start over",
      "services",
      "what do you do"
    ],
    "answer": "Start on the home page to explore business websites, website improvements, optional care, and the project process.",
    "links": [
      [
        "Home",
        "index.html"
      ],
      [
        "Services",
        "index.html#services"
      ]
    ]
  },
  {
    "id": "examples",
    "title": "Website examples and portfolio",
    "terms": [
      "examples",
      "portfolio",
      "sample",
      "samples",
      "previous work",
      "projects",
      "high desert",
      "wall street",
      "italian pickup"
    ],
    "answer": "Explore High Desert Development, a delivered contractor website; Wall Street Watchers, a research application; and The Italian Pickup, a fictional bakery concept. The examples page includes images and links to each project.",
    "links": [
      [
        "Website examples",
        "website-examples.html"
      ],
      [
        "High Desert Development example",
        "website-examples.html#high-desert-development"
      ],
      [
        "Wall Street Watchers example",
        "website-examples.html#wall-street-watchers"
      ],
      [
        "The Italian Pickup example",
        "website-examples.html#italian-pickup"
      ]
    ]
  },
  {
    "id": "about",
    "title": "About the company",
    "terms": [
      "about",
      "history",
      "team",
      "founder",
      "who are you",
      "harvard",
      "byu",
      "credentials",
      "university",
      "qualifications"
    ],
    "answer": "Read about the company foundation, university-issued credentials, development standards, and approach to working with businesses.",
    "links": [
      [
        "About Apex Code Works California",
        "about.html"
      ]
    ]
  },
  {
    "id": "process",
    "title": "How a project works",
    "terms": [
      "process",
      "steps",
      "how it works",
      "how do we start",
      "get started",
      "workflow for a project"
    ],
    "answer": "The process starts with your goals and scope, then design, development, review, and launch. Your written proposal confirms price, schedule, and responsibilities.",
    "links": [
      [
        "Project process",
        "index.html#process"
      ],
      [
        "Project questions",
        "faq.html"
      ],
      [
        "Start a conversation",
        "contact.html#project-form"
      ]
    ]
  },
  {
    "id": "application",
    "title": "Credit application request form",
    "terms": [
      "apply",
      "application",
      "credit application",
      "apply for credit",
      "submit form",
      "fill out",
      "sign up",
      "enroll"
    ],
    "answer": "The Credit Application page is the place to submit a preliminary request with business contact details and your self-reported credit score. Complete required fields, review both sets of documents, scroll to the end, choose I agree, and then check each acknowledgment. The proposed payment plan is not yet open for enrollment. This form does not run a credit check, approve credit, or activate an arbitration waiver.",
    "links": [
      [
        "Credit Application form",
        "credit-application.html"
      ],
      [
        "Payment-plan price breakdown",
        "custom-websites.html#payment-plan"
      ],
      [
        "Application terms",
        "credit-terms.html"
      ]
    ]
  },
  {
    "id": "score",
    "title": "Self-reported credit score",
    "terms": [
      "credit score",
      "score",
      "fico",
      "vantagescore",
      "no credit",
      "no score",
      "credit check",
      "credit report",
      "ssn"
    ],
    "answer": "The preliminary form requires your current self-reported personal credit score on a 300\u2013850 scale. It is unverified and does not authorize a bureau check or guarantee approval. Do not guess or send reports or identity documents. If you have no score, do not know it, or use a different scale, contact us to discuss your request.",
    "links": [
      [
        "Self-reported score field",
        "credit-application.html#credit-score"
      ],
      [
        "Contact the company",
        "contact.html"
      ],
      [
        "Privacy notice",
        "privacy.html"
      ]
    ]
  },
  {
    "id": "privacy",
    "title": "Privacy and information handling",
    "terms": [
      "privacy",
      "private",
      "confidential",
      "data",
      "information",
      "secure",
      "security of my information",
      "delete my information"
    ],
    "answer": "The privacy notice describes the information collected and how Web3Forms, email, and hosting providers process it. Closing the confirmation or leaving the request page clears browser form data; it does not delete a submission already received by Web3Forms or the business inbox. Ask the business about access, correction, or deletion requests.",
    "links": [
      [
        "Privacy notice",
        "privacy.html"
      ],
      [
        "Application request",
        "credit-application.html"
      ],
      [
        "Privacy questions",
        "contact.html"
      ]
    ]
  },
  {
    "id": "terms",
    "title": "Application terms and authorization",
    "terms": [
      "terms",
      "conditions",
      "usage agreement",
      "disclaimer",
      "authorization",
      "permission",
      "consent"
    ],
    "answer": "Read the application-request terms and proposed credit authorization before submitting. The current acknowledgments concern reviewing notices and drafts; they do not authorize a credit check or activate an arbitration agreement.",
    "links": [
      [
        "Application request terms",
        "credit-terms.html"
      ],
      [
        "Privacy notice",
        "privacy.html"
      ],
      [
        "Proposed dispute agreement",
        "arbitration.html"
      ]
    ]
  },
  {
    "id": "arbitration",
    "title": "Proposed dispute resolution agreement",
    "terms": [
      "arbitration",
      "arbitrate",
      "dispute",
      "court",
      "jury",
      "trial",
      "settlement",
      "lawsuit"
    ],
    "answer": "The proposed mutual dispute agreement explains customer-service discussions, arbitration, and preserved court exceptions. It remains a review draft. The preliminary form records acknowledgment of reading the draft, not a binding arbitration acceptance or court-trial waiver.",
    "links": [
      [
        "Proposed dispute resolution agreement",
        "arbitration.html"
      ],
      [
        "Application request terms",
        "credit-terms.html"
      ]
    ]
  },
  {
    "id": "form-help",
    "title": "Help with the form and agreement windows",
    "terms": [
      "cant submit",
      "cannot submit",
      "button disabled",
      "button grey",
      "button gray",
      "not clickable",
      "i agree",
      "checkbox",
      "check box",
      "scroll",
      "cancel window",
      "form not working"
    ],
    "answer": "A disabled submit button means a required field or acknowledgment is incomplete. Enter the required contact details and a valid self-reported score. Open each review window, scroll its documents to the bottom, click I agree, and then check its box. Canceling or leaving the page clears the review state. If documents fail to load, cancel and reopen to retry. Contact us if the form still does not work; do not email sensitive documents.",
    "links": [
      [
        "Application form",
        "credit-application.html#project-form"
      ],
      [
        "Application terms",
        "credit-terms.html"
      ],
      [
        "Contact for help",
        "contact.html"
      ]
    ]
  },
  {
    "id": "confirmation",
    "title": "Confirmation numbers and fresh forms",
    "terms": [
      "confirmation",
      "reference number",
      "receipt",
      "submitted",
      "after submission",
      "reset",
      "blank form",
      "close x",
      "confirmation number"
    ],
    "answer": "After the submission service accepts your request, a window shows a confirmation number. Save it before closing X. Closing X clears the form and confirmation, and leaving and returning starts fresh. A confirmation records receipt by the submission service, not credit approval. Contact the business with your saved reference for follow-up.",
    "links": [
      [
        "Application request",
        "credit-application.html"
      ],
      [
        "Follow up with the business",
        "contact.html"
      ]
    ]
  },
  {
    "id": "careers",
    "title": "Careers and opportunities",
    "terms": [
      "careers",
      "jobs",
      "job",
      "hiring",
      "employment",
      "work for you",
      "openings"
    ],
    "answer": "Visit Careers for current opportunities. Availability is stated on that page.",
    "links": [
      [
        "Careers",
        "careers.html"
      ]
    ]
  },
  {
    "id": "shortcut",
    "title": "Save the website shortcut",
    "terms": [
      "shortcut",
      "desktop icon",
      "download icon",
      "save website",
      "home screen",
      "bookmark"
    ],
    "answer": "The shortcut page explains how to save a desktop shortcut or add the website to your device for easy access.",
    "links": [
      [
        "Save Apex to your device",
        "save-apex.html"
      ]
    ]
  }
];
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[’']/g, '').replace(/pay\s+pal/g, 'paypal').replace(/web\s+site/g, 'website')
    .replace(/\b(faqs)\b/g, 'faq').replace(/[^a-z0-9]+/g, ' ').trim();
  // Specific intentions precede broad words such as "website", "credit", or "payment".
  const ROUTES = [
    ['form-help', /\b(cant submit|cannot submit|unable to submit|wont submit|button.*(?:disabled|grey|gray|click)|not clickable|i agree|check ?box|scroll|cancel window|form not working)\b/],
    ['arbitration', /\b(arbitration|arbitrate|disputes?|courts?|jury|trial|lawsuit|settlement)\b/],
    ['privacy', /\b(privacy|private|confidential|delete my (?:data|information)|data security|secure information|keep.*information)\b/],
    ['terms', /\b(terms|conditions|disclaimer|usage agreement|authorization|permission|consent)\b/],
    ['confirmation', /\b(confirmation|receipt|reference number|after submission|already submitted|reset|blank form|close x)\b/],
    ['faq-cancel-care', /\b(refunds?|refundable|nonrefundable|proration|prorated)\b.*\b(care|maintenance|monthly)\b|\b(care|maintenance|monthly)\b.*\b(refunds?|refundable|proration)\b/],
    ['faq-cancel-project', /\b(cancel|cancellation|refund|pause)\b.*\b(project|build)\b|\b(project|build)\b.*\b(cancel|refund|pause)\b/],
    ['faq-cancel-care', /\b(cancel|cancellation|renewal|unsubscribe|stop paying for care)\b/],
    ['score', /\b(credit score|fico|vantagescore|no score|dont know my score|credit check|credit report|ssn)\b/],
    ['application', /\b(apply|application|fill (?:out|in)|sign up|enroll|credit form)\b/],
    ['payment-plan', /\b(payment plan|pay.*monthly|monthly payments|pay.*over time|installments?|instalments?|financ(?:e|ing)|cant afford|cannot afford|grace|reinstatement|suspension|price breakdown|program cost)\b/],
    ['examples', /\b(examples?|portfolio|samples?|previous work|show.*work|high desert|wall street|italian pickup)\b/],
    ['careers', /\b(careers?|jobs?|hiring|employment|work for you|openings)\b/],
    ['shortcut', /\b(shortcut|desktop icon|download icon|home screen|bookmark|save.*website)\b/],
    ['about', /\b(about|history|team|founder|who are you|harvard|byu|credentials|university|qualifications)\b/],
    ['home', /\b(home|homepage|main page|services|what do you do|what do you offer)\b/],
    ['process', /\b(process|steps|how it works|how do we start|get started)\b/],
    ['faq', /\b(faq|frequently asked questions|common questions)\b/],
    ['faq-timeline', /\b(timeline|deadline|how long|weeks|turnaround|delivery|when.*ready)\b/],
    ['faq-response', /\b(how quickly|respond|response|answer a request|reply)\b/],
    ['faq-deposit', /\b(deposit|milestones?|upfront|balance|when do i pay|payment schedule|50 50)\b/],
    ['faq-revisions', /\b(revisions?|rounds|feedback)\b/],
    ['faq-results', /\b(google|rankings?|seo|leads|guarantee|index|indexing|indexed|placement|sitemap|search results)\b/],
    ['payments', /\b(stripe|paypal|accept payments|take payments|checkout|apis?|integrations?)\b/],
    ['ownership', /\b(ownership|own|keep|handover|source code|my files)\b/],
    ['faq-editing', /\b(edit myself|edit.*myself|another developer|cms|editor)\b/],
    ['automation', /\b(automation|automations|automate|workflow|software|portal|dashboard)\b/],
    ['faq-materials', /\b(materials|provide|logo|copywriting|what.*send|what.*need from me)\b/],
    ['faq-costs', /\b(domain|third party fees|processing fees|extra fees)\b/],
    ['care', /\b(care|hosting|maintenance|updates|backups?|monitoring|security|support|rollover|roll over|unused|allowance|hours?|150)\b/],
    ['improve', /\b(repair|fix|redesign|improve|broken|outdated)\b/],
    ['contact', /\b(contact|email|phone|call|talk to|reach you|consultation|human|real person)\b/],
    ['quote', /\b(price|pricing|cost|quote|budget|how much|1750)\b/],
    ['payment-plan', /\b(credit)\b/]
  ];
  function match(value) {
    const query = ` ${normalize(value)} `;
    for (const [id, pattern] of ROUTES) {
      if (pattern.test(query)) {
        const topic = TOPICS.find(topic => topic.id === id);
        if (topic) return [topic];
      }
    }
    return TOPICS.map(topic => ({ topic, score: topic.terms.reduce((score, term) => query.includes(` ${normalize(term)} `) ? score + term.split(/\s+/).length * 2 : score, 0) }))
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
    const bubble = message("Hi! I can help you explore Apex Code Works California services, plan a project, or find contact information. Choose a starting point or type a question below.");
    addLinks(bubble, [["Home and services", "index.html#services"], ["Website examples", "website-examples.html"], ["Credit Application", "credit-application.html"]]);
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
    const greeting = /^(hi|hello|hey|thanks|thank you|good morning|good afternoon|good evening)$/.test(normalized);
    if (sensitive) {
      log.lastElementChild.querySelector("p").textContent = "[Possible API key hidden]";
      addLinks(message("Please keep API keys and sensitive information out of chat. Clear this chat if you entered sensitive information."), [["Privacy notice", "privacy.html"], ["Contact the business", "contact.html"]]);
    } else if (greeting) {
      addLinks(message("Happy to help! Ask where to apply, see website examples, compare prices, or find care and project answers."), [["Services", "index.html#services"], ["Frequently asked questions", "faq.html"], ["Credit Application", "credit-application.html"]]);
    } else if (matches.length) {
      const bubble = message(matches[0].answer);
      addLinks(bubble, matches[0].links);
      if (matches.length > 1) {
        bubble.append(element("p", "", "Other matching topics:"));
        for (const topic of matches.slice(1)) bubble.append(button(topic.title, () => answer(topic.title, [topic]), "apex-chat-shortcut"));
      }
    } else {
      addLinks(message("I could not confidently match that request. Try phrases such as show me your work, where do I apply, explain monthly payments, cancel care, or contact a person."), [["Frequently asked questions", "faq.html"], ["Services", "index.html#services"], ["Contact a person", "contact.html"]]);
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
