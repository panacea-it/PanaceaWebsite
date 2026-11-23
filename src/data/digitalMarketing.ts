import type { PageContent } from "@/data/companyContent";

export type MarketingGroupId = "search" | "advertising" | "brand" | "automation";

export type MarketingService = {
  number: string;
  slug: string;
  title: string;
  promise: string;
  group: MarketingGroupId;
  offerings: string[];
  discussLabel: string;
  overview: string;
  features: { title: string; desc: string }[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  note?: string;
};

export const marketingGroups: {
  id: MarketingGroupId;
  label: string;
  description: string;
}[] = [
  {
    id: "search",
    label: "Search",
    description: "Show up when people look for what you sell, on Google and in the answers AI tools pull from the web.",
  },
  {
    id: "advertising",
    label: "Advertising",
    description: "Paid campaigns for people who are already searching, browsing, or ready to come back.",
  },
  {
    id: "brand",
    label: "Brand & Content",
    description: "The look, the words, and the videos that make the business recognizable.",
  },
  {
    id: "automation",
    label: "Automation",
    description: "Follow-up that keeps moving after the first enquiry, without a lead sitting in an inbox.",
  },
];

const marketingProcess = [
  { step: 1, name: "Listen", desc: "Your offer, your customers, and what you already run." },
  { step: 2, name: "Plan", desc: "The first channel, and the pages or campaigns it needs." },
  { step: 3, name: "Set up", desc: "Tracking, profiles, creative, or content, ready to launch." },
  { step: 4, name: "Launch", desc: "Go live and watch the first responses." },
  { step: 5, name: "Report", desc: "A monthly look at what happened and what we change next." },
  { step: 6, name: "Improve", desc: "Keep what is working and stop what is not." },
];

const marketingProcessIntro =
  "We start from the offer and the customer, launch the work, report each month, and improve what is working.";

const marketingCtaDescription =
  "Tell us about your customers and what you want more of. We will recommend a practical place to start.";

export const marketingServices: MarketingService[] = [
  {
    number: "01",
    slug: "seo",
    title: "SEO",
    promise: "Get found on Google",
    group: "search",
    offerings: ["Keyword research", "Website SEO", "Competitor research", "Monthly reports"],
    discussLabel: "Discuss SEO",
    overview:
      "SEO is how your website earns visibility on Google. We find the searches your customers use, improve the pages that should answer them, and check what competitors already rank for. Each month you get a report of what changed.",
    features: [
      { title: "Keyword research", desc: "The searches customers actually type, grouped by what they are trying to do." },
      { title: "Website SEO", desc: "Titles, page structure, content, and technical fixes so Google can understand the site." },
      { title: "Competitor research", desc: "Which terms nearby and national competitors own, and where there is room to win." },
      { title: "Monthly reports", desc: "What we did, what moved, and what we do next. No vanity charts without a decision." },
    ],
    benefits: [
      "A short list of pages and terms to work on first",
      "Copy that answers a real search, not a keyword stuffed into a sentence",
      "A monthly record of the work and the movement",
    ],
    faqs: [
      {
        q: "Can you guarantee the first result on Google?",
        a: "No. Rankings depend on your site, the competition, and Google. We show the work and the change each month.",
      },
      {
        q: "How soon does SEO show a change?",
        a: "Technical fixes and new pages can move sooner. Competitive terms usually take a few months. The monthly report is where we say what is early and what needs more time.",
      },
    ],
  },
  {
    number: "02",
    slug: "local-seo",
    title: "Local SEO",
    promise: "Get found near you",
    group: "search",
    offerings: ["Google Business Profile", "Location pages", "Reviews"],
    discussLabel: "Discuss Local SEO",
    overview:
      "Local SEO helps people nearby find the business on Google Search and Maps. We tidy the Google Business Profile, build location pages that match how people search, and set up a simple way to earn real reviews.",
    features: [
      { title: "Google Business Profile", desc: "Name, category, hours, photos, and posts so the listing matches the real business." },
      { title: "Location pages", desc: "A page for each place you serve, with the services and details local searches expect." },
      { title: "Reviews", desc: "A straightforward ask for real customers, plus replies that show the business is paying attention." },
    ],
    benefits: [
      "A listing people can trust at a glance",
      "Pages that match city and neighbourhood searches",
      "Reviews that come from customers, not bought accounts",
    ],
    faqs: [
      {
        q: "Do you buy reviews?",
        a: "No. We help you ask customers who already used the service, and we help you reply.",
      },
      {
        q: "We have more than one location. Does this still fit?",
        a: "Yes. Each location gets its own profile details and its own page, so searches in that area land in the right place.",
      },
    ],
  },
  {
    number: "03",
    slug: "ai-search",
    title: "AI Search Visibility",
    promise: "Show up in AI answers",
    group: "search",
    offerings: ["Clear brand information", "FAQ content", "Expert content"],
    discussLabel: "Discuss AI Search",
    note: "We make you easier to find. No one can honestly guarantee AI answers, and we don’t.",
    overview:
      "AI answer tools reuse clear, specific pages. We tighten how the brand, the services, and the expertise are explained, so those systems have something accurate to draw from. We make you easier to find. No one can honestly guarantee AI answers, and we don’t.",
    features: [
      { title: "Clear brand information", desc: "A plain description of who you are, who you help, and what you will not do." },
      { title: "FAQ content", desc: "Answers to the questions customers already ask, written so a person or an answer engine can use them." },
      { title: "Expert content", desc: "Pages that show real experience: how you work, what you have shipped, and the decisions behind it." },
    ],
    benefits: [
      "Public pages that describe the business accurately",
      "Answers that match real customer questions",
      "No promise of a mention inside ChatGPT, Gemini, or Google AI Overviews",
    ],
    faqs: [
      {
        q: "Can you guarantee we appear in AI answers?",
        a: "No. Nobody can honestly sell a guaranteed mention. We make your public information clearer and more specific, which is the part you can control.",
      },
      {
        q: "Is this a replacement for SEO?",
        a: "No. It sits beside SEO. Search still needs useful pages. This work makes those pages easier for answer tools to interpret.",
      },
    ],
  },
  {
    number: "04",
    slug: "google-ads",
    title: "Google Ads / PPC",
    promise: "Reach people ready to buy",
    group: "advertising",
    offerings: ["Search ads", "Display ads", "Remarketing", "Conversion tracking"],
    discussLabel: "Discuss Google Ads",
    overview:
      "Google Ads puts the business in front of people who are already searching or browsing. We run search ads, display ads, and remarketing, and we track which clicks become enquiries. Ad spend is paid to Google separately from our work.",
    features: [
      { title: "Search ads", desc: "Ads on the searches closest to a real enquiry, with copy that matches the page they land on." },
      { title: "Display ads", desc: "Visual ads for awareness, used where they support the search campaigns rather than replacing them." },
      { title: "Remarketing", desc: "A follow-up for people who already visited and did not enquire." },
      { title: "Conversion tracking", desc: "Calls, forms, and bookings recorded so spend can be judged by enquiries, not clicks alone." },
    ],
    benefits: [
      "Budget pointed at searches that can turn into a conversation",
      "Landing pages and ads that say the same thing",
      "A record of which campaigns create enquiries",
    ],
    faqs: [
      {
        q: "Is the ad budget included in your fee?",
        a: "No. Media spend is paid to Google. We plan and manage the campaigns, and we tell you what the spend produced.",
      },
      {
        q: "Do we have to start on every campaign type?",
        a: "No. Most accounts should start with search and tracking. Display and remarketing come in when there is enough traffic to learn from.",
      },
    ],
  },
  {
    number: "05",
    slug: "meta-ads",
    title: "Meta Advertising",
    promise: "Ads on Facebook & Instagram",
    group: "advertising",
    offerings: ["Facebook & Instagram ads", "Lead generation", "Retargeting", "Testing"],
    discussLabel: "Discuss Meta Ads",
    overview:
      "Meta ads run on Facebook and Instagram. We use them for lead generation and for bringing people back, and we test creative so the budget moves toward what people actually respond to.",
    features: [
      { title: "Facebook & Instagram ads", desc: "Campaigns placed where your customers already spend time, with creative sized for the feed and stories." },
      { title: "Lead generation", desc: "Forms and landing pages aimed at a qualified enquiry, not a pile of names." },
      { title: "Retargeting", desc: "Ads for people who visited, watched, or started a form and did not finish." },
      { title: "Testing", desc: "A few clear creative tests at a time, then more budget for the version that holds up." },
    ],
    benefits: [
      "Creative written for the offer, not a generic boost",
      "Leads you can follow up",
      "A testing habit so weak ads get turned off",
    ],
    faqs: [
      {
        q: "Will boosting a post be enough?",
        a: "A boost is a start, not a system. We set up campaigns, audiences, and tests so you can see which message creates enquiries.",
      },
      {
        q: "Do you manage the ad account?",
        a: "Yes. You keep ownership of the ad account. We build, launch, and report inside it.",
      },
    ],
  },
  {
    number: "06",
    slug: "social-media",
    title: "Social Media Marketing",
    promise: "Grow your following",
    group: "brand",
    offerings: ["Instagram", "Facebook", "LinkedIn", "YouTube", "Content calendar", "Reels & posts"],
    discussLabel: "Discuss Social",
    overview:
      "Social marketing is a steady presence on the networks your customers already use. We plan the calendar and publish posts and reels for Instagram, Facebook, LinkedIn, and YouTube, in one recognizable voice.",
    features: [
      { title: "Instagram", desc: "Feed posts and reels for the audience that discovers you visually." },
      { title: "Facebook", desc: "Updates and community posts for customers who still live in groups and pages." },
      { title: "LinkedIn", desc: "A clearer company presence for partners, hiring, and business buyers." },
      { title: "YouTube", desc: "Longer explainers and shorts that can keep working after the week they go up." },
      { title: "Content calendar", desc: "What goes out, when, and why, agreed before the month starts." },
      { title: "Reels & posts", desc: "Short video and still posts cut for the platform, not one file dumped everywhere." },
    ],
    benefits: [
      "One calendar instead of last-minute posts",
      "A voice that matches the website and the ads",
      "Platforms chosen because your customers are there",
    ],
    faqs: [
      {
        q: "Do you post on every network?",
        a: "Only where it helps. We pick the networks your customers use and leave the rest alone.",
      },
      {
        q: "Do we still approve posts?",
        a: "Yes. The calendar is shared before publishing, and you can change a post before it goes out.",
      },
    ],
  },
  {
    number: "07",
    slug: "content-marketing",
    title: "Content Marketing",
    promise: "Content that builds trust",
    group: "brand",
    offerings: ["Website copy", "Blogs", "Email", "Case studies"],
    discussLabel: "Discuss Content",
    overview:
      "Content marketing is the writing that explains the offer and gives a buyer a reason to trust it. That includes website copy, blogs, email, and case studies drawn from work you have actually done.",
    features: [
      { title: "Website copy", desc: "Service and home-page language that says what you do, who it is for, and how to start." },
      { title: "Blogs", desc: "Articles that answer customer questions and support the pages you want found." },
      { title: "Email", desc: "Short sequences for new enquiries and a regular note for people who already know you." },
      { title: "Case studies", desc: "Stories of a real problem, what you did, and what changed. We do not invent results." },
    ],
    benefits: [
      "Pages a salesperson can send without rewriting them",
      "Articles tied to services, not random topics",
      "Proof that comes from your projects",
    ],
    faqs: [
      {
        q: "Will you invent client results?",
        a: "No. Case studies use work you can stand behind. If a number is not confirmed, it does not go on the page.",
      },
      {
        q: "How often do blogs go out?",
        a: "We agree a pace you can support with reviews. A useful article a month beats a pile of posts nobody checks.",
      },
    ],
  },
  {
    number: "08",
    slug: "video-reels",
    title: "Video & Reels",
    promise: "Short videos that sell",
    group: "brand",
    offerings: ["Reels", "Promo videos", "Customer stories", "Editing"],
    discussLabel: "Discuss Video",
    overview:
      "Short video for social and for the website: reels, promo videos, and customer stories, edited so someone understands the offer before they scroll on.",
    features: [
      { title: "Reels", desc: "Vertical videos for Instagram, Facebook, and shorts, built around one idea each." },
      { title: "Promo videos", desc: "A clear pitch of the product or service for the site, ads, and sales calls." },
      { title: "Customer stories", desc: "A customer explaining the problem and the result, filmed or cut from material you already have." },
      { title: "Editing", desc: "Cuts, captions, and covers so the video works with the sound off." },
    ],
    benefits: [
      "Videos sized for where they will actually run",
      "Captions for people watching without sound",
      "Stories based on real customers",
    ],
    faqs: [
      {
        q: "Do we need a studio?",
        a: "No. A quiet room, a phone, and a clear script are enough for many reels. We say when a shoot needs more than that.",
      },
      {
        q: "Can you edit footage we already shot?",
        a: "Yes. Send what you have. If a story cannot be cut from it, we will say so before editing starts.",
      },
    ],
  },
  {
    number: "09",
    slug: "branding",
    title: "Branding & Creative",
    promise: "A look people remember",
    group: "brand",
    offerings: ["Brand look & feel", "Social graphics", "Ad creative"],
    discussLabel: "Discuss Branding",
    overview:
      "Branding is the look people recognize before they read the name. We set the visual system, then use it for social graphics and ad creative so the website, posts, and ads feel like one company.",
    features: [
      { title: "Brand look & feel", desc: "Color, type, and a few rules for how the brand should look on a page, a post, and an ad." },
      { title: "Social graphics", desc: "Templates and finished posts that match the brand without starting from a blank canvas each week." },
      { title: "Ad creative", desc: "Images and frames made for Google and Meta campaigns, tied to the offer on the landing page." },
    ],
    benefits: [
      "A look your team can repeat",
      "Social posts that match the website",
      "Ads that look like the brand, not a stock template",
    ],
    faqs: [
      {
        q: "Is this a full logo redesign?",
        a: "Only if you need one. Many projects start from a logo you already have and build the system around it.",
      },
      {
        q: "Can the same creative be used in ads and on social?",
        a: "The idea can. The file usually cannot. We adapt the size, the text, and the crop for each placement.",
      },
    ],
  },
  {
    number: "10",
    slug: "marketing-automation",
    title: "Marketing Automation",
    promise: "Follow up automatically",
    group: "automation",
    offerings: ["CRM", "Email & SMS", "AI chatbots", "Booking & follow-up"],
    discussLabel: "Discuss Automation",
    overview:
      "Marketing automation keeps the next step moving after someone enquires. We connect the CRM, email and SMS, booking, and a chatbot where it answers a real question. A person still handles the conversation that needs judgment.",
    features: [
      { title: "CRM", desc: "Enquiries land in one place, with the source and the next action visible." },
      { title: "Email & SMS", desc: "A short follow-up when a form is filled, a call is missed, or a booking is coming up." },
      { title: "AI chatbots", desc: "Answers to common questions on the site. The bot hands off when the question needs a person." },
      { title: "Booking & follow-up", desc: "A way to book, a reminder before the meeting, and a note if someone does not show." },
    ],
    benefits: [
      "Leads are not left in a shared inbox",
      "Follow-up goes out the same day",
      "A chatbot with a clear handoff, not a bot pretending to be the whole team",
    ],
    faqs: [
      {
        q: "Will a chatbot replace our team?",
        a: "No. It covers repeated questions and collects the details. A person takes over for pricing, exceptions, and anything sensitive.",
      },
      {
        q: "Do we need a new CRM?",
        a: "Not always. We start with the system you have. A new CRM is only worth it when the current one cannot track the follow-up.",
      },
    ],
  },
];

export function marketingContactHref(slug: string) {
  return `/contact?service=${slug}`;
}

export function marketingInterestForSlug(slug: string | null): { interest: string; message: string } | null {
  if (!slug) return null;
  if (slug === "digital-marketing") {
    return {
      interest: "Digital Marketing",
      message: "I would like to discuss digital marketing.",
    };
  }
  const service = marketingServices.find((item) => item.slug === slug);
  if (!service) return null;
  return {
    interest: service.title,
      message: `I would like to discuss ${service.title}.`,
  };
}

export const marketingPageContent: Record<string, PageContent> = Object.fromEntries(
  marketingServices.map((service) => [
    service.slug,
    {
      slug: service.slug,
      title: service.title,
      subtitle: service.promise,
      overview: service.overview,
      cta: {
        title: `Ready to talk about ${service.title}?`,
        label: service.discussLabel,
        href: marketingContactHref(service.slug),
        description: marketingCtaDescription,
      },
      sections: {
        title: "What's included",
        description: service.note ?? service.promise,
        features: service.features,
        benefits: service.benefits,
        process: marketingProcess,
        processIntro: marketingProcessIntro,
        benefitsIntro:
          "The scope is specific, the report is monthly, and the work is aimed at the customers you want to reach.",
        faqs: service.faqs,
      },
    } satisfies PageContent,
  ]),
);
