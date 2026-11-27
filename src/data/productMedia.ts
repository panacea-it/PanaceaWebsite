export type ProductMedia = {
    category: string;
    shortName: string;
    image: string;
    alt: string;
    benefitImage?: string;
    benefitAlt?: string;
};

const unsplash = (id: string) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const productMedia: Record<string, ProductMedia> = {
    /* On-Demand & Delivery Apps */
    "car-wash": {
        category: "On-Demand & Delivery Apps",
        shortName: "Car Wash App",
        image: unsplash("1520340356584-f9917d1eea6f"),
        alt: "Professional cleaning a car at a car wash",
    },
    grocery: {
        category: "On-Demand & Delivery Apps",
        shortName: "Grocery Delivery App",
        image: unsplash("1542838132-92c53300491e"),
        alt: "Fresh groceries and produce in a store",
    },
    "food-delivery": {
        category: "On-Demand & Delivery Apps",
        shortName: "Food Delivery App",
        image: unsplash("1504674900247-0877df9cc836"),
        alt: "Freshly prepared food ready for delivery",
        benefitImage: unsplash("1565299624946-b28f40a0ae38"),
        benefitAlt: "Restaurant team preparing fresh food orders",
    },
    "courier-logistics": {
        category: "On-Demand & Delivery Apps",
        shortName: "Courier & Logistics App",
        image: unsplash("1586528116311-ad8dd3c8310d"),
        alt: "Delivery van and logistics operations",
    },

    /* Booking and Service Platforms */
    tickets: {
        category: "Booking and Service Platforms",
        shortName: "Ticket Booking App",
        image: unsplash("1470229722913-7c0e2dbbafd3"),
        alt: "Live event crowd with stage lighting",
    },
    "party-rentals": {
        category: "Booking and Service Platforms",
        shortName: "Party Rentals App",
        image: unsplash("1530103862676-de8c9debad1d"),
        alt: "Celebration table setup with party decorations",
    },
    "appointment-booking": {
        category: "Booking and Service Platforms",
        shortName: "Appointment Booking Platform",
        image: unsplash("1506784983877-45594efa4cbe"),
        alt: "Calendar and planner for scheduling appointments",
    },
    "home-services": {
        category: "Booking and Service Platforms",
        shortName: "Home Services App",
        image: unsplash("1581578731548-c64695cc6952"),
        alt: "Professional cleaning a modern home",
    },

    /* E-Commerce & Marketplace Solutions */
    "multi-vendor-marketplace": {
        category: "E-Commerce & Marketplace Solutions",
        shortName: "Multi-Vendor Marketplace",
        image: unsplash("1556742049-0cfed4f6a45d"),
        alt: "Online shopping and marketplace checkout",
    },
    "online-store": {
        category: "E-Commerce & Marketplace Solutions",
        shortName: "Online Store Platform",
        image: unsplash("1441986300917-64674bd600d8"),
        alt: "Modern retail store interior with products",
    },
    "subscription-commerce": {
        category: "E-Commerce & Marketplace Solutions",
        shortName: "Subscription Commerce Platform",
        image: unsplash("1556742111-a301076d9d18"),
        alt: "Subscription boxes and recurring commerce packaging",
    },
    "b2b-marketplace": {
        category: "E-Commerce & Marketplace Solutions",
        shortName: "B2B Marketplace",
        image: unsplash("1553413077-190dd305871c"),
        alt: "Warehouse shelves with wholesale inventory",
    },

    /* Education & Entertainment */
    school: {
        category: "Education & Entertainment",
        shortName: "School Management App",
        image: unsplash("1580582932707-520aed937b7b"),
        alt: "Students learning in a modern classroom",
    },
    "child-care": {
        category: "Education & Entertainment",
        shortName: "Child Care System",
        image: unsplash("1503454537195-1dcabb73ffb9"),
        alt: "Children playing and learning at a daycare",
    },
    omr: {
        category: "Education & Entertainment",
        shortName: "OMR Customization",
        image: unsplash("1434030216411-0b793f4b4173"),
        alt: "Students taking an exam with answer sheets",
    },
    elearning: {
        category: "Education & Entertainment",
        shortName: "eLearning Platform",
        image: unsplash("1501504905252-473c47e087f8"),
        alt: "Learner studying online with a laptop",
    },
    "interactive-media": {
        category: "Education & Entertainment",
        shortName: "Interactive Media Platform",
        image: unsplash("1511512578047-dfb367046420"),
        alt: "Interactive gaming and entertainment setup",
    },

    /* Healthcare & Wellness */
    "patient-management": {
        category: "Healthcare & Wellness",
        shortName: "Patient Management System",
        image: unsplash("1576091160399-112ba8d25d1d"),
        alt: "Doctor reviewing patient records",
    },
    telemedicine: {
        category: "Healthcare & Wellness",
        shortName: "Telemedicine App",
        image: unsplash("1576091160550-2173dba999ef"),
        alt: "Doctor consulting a patient remotely",
    },
    "clinic-booking": {
        category: "Healthcare & Wellness",
        shortName: "Clinic Booking Platform",
        image: unsplash("1519494026892-80bbd2d6fd0d"),
        alt: "Modern clinic reception and waiting area",
    },
    "fitness-wellness": {
        category: "Healthcare & Wellness",
        shortName: "Fitness & Wellness App",
        image: unsplash("1534438327276-14e5300c3a48"),
        alt: "Fitness training in a modern gym",
    },

    /* Social & Media Apps */
    influencers: {
        category: "Social & Media Apps",
        shortName: "Influencers App",
        image: unsplash("1611162617213-7d7a39e9b1d7"),
        alt: "Creator recording social media content",
    },
    "community-platform": {
        category: "Social & Media Apps",
        shortName: "Community Platform",
        image: unsplash("1529156069898-49953e39b3ac"),
        alt: "Diverse community members connecting together",
    },
    "content-sharing": {
        category: "Social & Media Apps",
        shortName: "Content Sharing App",
        image: unsplash("1611162616305-c69b3fa7fbe0"),
        alt: "Content creator editing media for sharing",
    },
    "messaging-app": {
        category: "Social & Media Apps",
        shortName: "Messaging App",
        image: unsplash("1611606063065-ee7946f0787a"),
        alt: "Real-time messaging and chat interface",
    },

    /* AI-Powered Products */
    "ai-assistant": {
        category: "AI-Powered Products",
        shortName: "AI Assistant",
        image: unsplash("1677442136019-21780ecad995"),
        alt: "AI-powered assistant and neural network visualization",
    },
    "rag-knowledge-base": {
        category: "AI-Powered Products",
        shortName: "RAG Knowledge Base",
        image: unsplash("1655720828018-edd2daec9349"),
        alt: "AI knowledge retrieval and data search",
    },
    "ai-automation": {
        category: "AI-Powered Products",
        shortName: "AI Workflow Automation",
        image: unsplash("1620712943543-bcc4688e7485"),
        alt: "AI robot automating business workflows",
    },
    "predictive-analytics": {
        category: "AI-Powered Products",
        shortName: "Predictive Analytics",
        image: unsplash("1551288049-bebda4e38f71"),
        alt: "Analytics dashboard with charts and forecasts",
    },
};

export const fallbackProductMedia: ProductMedia = {
    category: "Products",
    shortName: "Digital Product",
    image: unsplash("1551434678-e076c223a692"),
    alt: "Digital product team collaborating on a platform",
};
