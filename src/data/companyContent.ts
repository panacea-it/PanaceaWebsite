
import React from "react";
import { marketingPageContent } from "@/data/digitalMarketing";

export type ContentSection = {
    title: string;
    description: string;
    features?: { title: string; desc: string; }[];
    benefits?: string[];
    process?: { step: number; name: string; desc: string }[];
    processIntro?: string;
    benefitsIntro?: string;
    faqs?: { q: string; a: string }[];
};

export type PageContent = {
    slug: string;
    title: string;
    subtitle: string;
    heroImage?: string;
    overview: string;
    sections: ContentSection;
    cta?: {
        title: string;
        label: string;
        href: string;
        description?: string;
    };
};

// Common Default Data to Fallback On
const defaultBenefits = [
    "Scalable and secure architecture",
    "Tailored to your specific business needs",
    "High performance and speed",
    "Seamless integration with existing systems",
    "Dedicated support and maintenance",
];

const defaultProcess = [
    { step: 1, name: "Discovery", desc: "Understanding your requirements and defining project goals." },
    { step: 2, name: "Strategy", desc: "Crafting a roadmap and technical architecture." },
    { step: 3, name: "Design", desc: "Creating intuitive and engaging user interfaces." },
    { step: 4, name: "Development", desc: "Building the solution with modern technologies." },
    { step: 5, name: "Testing", desc: "Rigorous quality assurance and performance testing." },
    { step: 6, name: "Launch", desc: "Deploying the solution to production." },
];

const defaultFaqs = [
    { q: "How long does a typical project take?", a: "Project timelines vary based on complexity, but typically range from 2 to 6 months for standard applications." },
    { q: "Do you provide post-launch support?", a: "Yes, we offer comprehensive maintenance and support packages to ensure your application runs smoothly." },
    { q: "What technologies do you use?", a: "We use modern stacks including Next.js, React, Node.js, Python, AWS, and more, tailored to your specific needs." },
];

export const servicesContent: Record<string, PageContent> = {
    "mobile": {
        slug: "mobile",
        title: "Mobile App Development",
        subtitle: "Custom iOS, Android & cross-platform solutions",
        overview: "We build high-performance mobile applications that provide intuitive user experiences and drive business growth across all major platforms.",
        sections: {
            title: "Mobile Solutions",
            description: "End-to-end mobile development services from concept to store launch.",
            features: [
                { title: "Native iOS App", desc: "High-performance apps for iPhone and iPad." },
                { title: "Native Android App", desc: "Robust applications for the Android ecosystem." },
                { title: "Cross-Platform", desc: "React Native and Flutter apps for cost-effective scaling." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "web": {
        slug: "web",
        title: "Web Application Development",
        subtitle: "Scalable web apps built for your business",
        overview: "Our web development services deliver secure, scalable, and fully functional web applications tailored to your specific business workflows.",
        sections: {
            title: "Web Development Capabilities",
            description: "Modern web solutions using the latest frontend and backend technologies.",
            features: [
                { title: "Frontend Development", desc: "Engaging UIs using React, Next.js, and Vue." },
                { title: "Backend Systems", desc: "Secure and scalable server architectures." },
                { title: "Progressive Web Apps", desc: "App-like experiences in the browser." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "ios": {
        slug: "ios",
        title: "iOS App Development",
        subtitle: "Native iPhone apps with seamless UX",
        overview: "We specialize in creating premium, high-performance iOS applications using Swift and Objective-C that strictly adhere to Apple's human interface guidelines.",
        sections: {
            title: "iOS Capabilities",
            description: "Delivering exceptional Apple ecosystem experiences.",
            features: [
                { title: "Swift Development", desc: "Modern, safe, and fast iOS applications." },
                { title: "iPad Optimization", desc: "Tailored experiences for larger screens." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "custom": {
        slug: "custom",
        title: "Custom Software Development",
        subtitle: "Tailored solutions for unique business needs",
        overview: "We design and develop bespoke software solutions that map perfectly to your unique business processes, eliminating inefficiencies.",
        sections: {
            title: "Custom Solutions",
            description: "Software that adapts to you, not the other way around.",
            features: [
                { title: "Enterprise Software", desc: "Large-scale systems for complex organizations." },
                { title: "Workflow Automation", desc: "Streamlining repetitive business tasks." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "android": {
        slug: "android",
        title: "Android App Development",
        subtitle: "Robust apps for the Android ecosystem",
        overview: "We develop reliable and scalable Android applications using Kotlin and Java, ensuring compatibility across a vast range of devices.",
        sections: {
            title: "Android Advantages",
            description: "Reaching the largest mobile user base globally.",
            features: [
                { title: "Kotlin Architecture", desc: "Modern and concise Android development." },
                { title: "Device Compatibility", desc: "Optimized for various screen sizes and hardware." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "ai-consulting": {
        slug: "ai-consulting",
        title: "AI Consulting & Strategy",
        subtitle: "Navigate the AI landscape securely",
        overview: "Our AI consulting services help you identify opportunities to integrate artificial intelligence into your business, driving efficiency and innovation.",
        sections: {
            title: "AI Strategy",
            description: "Transforming your business with intelligent data.",
            features: [
                { title: "AI Readiness Assessment", desc: "Evaluating your infrastructure for AI adoption." },
                { title: "Use Case Identification", desc: "Finding the best-ROI AI applications for you." },
            ],
            benefits: ["Data-driven decision making", "Operational efficiency", "Competitive advantage"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    ...marketingPageContent,
};

const createProductContent = (
    slug: string,
    title: string,
    subtitle: string,
    overview: string,
    features: { title: string; desc: string }[],
    benefits: string[],
    sectionTitle = "Product Features",
    description = "Built for performance, scale, and everyday usability.",
    process = defaultProcess,
    faqs = defaultFaqs
): PageContent => ({
    slug,
    title,
    subtitle,
    overview,
    sections: {
        title: sectionTitle,
        description,
        features,
        benefits,
        process,
        faqs
    }
});

export const productsContent: Record<string, PageContent> = {
    /* On-Demand & Delivery Apps */
    "car-wash": createProductContent(
        "car-wash",
        "Car Wash App",
        "Book auto cleaning instantly",
        "An on-demand car wash booking system connecting vehicle owners with professional detailers for scheduling doorstep or on-site cleaning services anytime. Built for solo detailing businesses, multi-branch wash stations, and mobile service fleets, the platform streamlines service discovery, package selection, and automated slot allocation. Customers can compare wash tiers, book recurring plans, track technician arrival in real time, and pay seamlessly via cards, wallets, or UPI. Meanwhile, operators manage staff schedules, service zones, pricing rules, and verified customer ratings from a centralized dashboard designed to boost repeat bookings and maximize daily fleet utilization.",
        [
            { title: "Instant Booking", desc: "Schedule washes with a few taps." },
            { title: "Service Tracking", desc: "Real-time updates on washer arrival." },
            { title: "Secure Payments", desc: "Pay online or after the service completes." },
            { title: "Ratings & Reviews", desc: "Build trust with verified customer feedback." }
        ],
        ["Increased bookings", "Optimized scheduling", "Customer loyalty", "Lower operational overhead"],
        "App Features",
        "Modernizing the car detailing business."
    ),
    "grocery": createProductContent(
        "grocery",
        "Grocery Delivery App",
        "Hyperlocal commerce platforms",
        "An on-demand grocery delivery platform connecting local supermarkets, kirana stores, and specialty grocers with neighborhood shoppers through a fast, mobile-first experience. Real-time inventory syncing prevents out-of-stock surprises, while flexible express and scheduled delivery slots let households order on their own terms. Store managers receive instant picking lists, substitution tools, and price controls, and delivery riders get optimized turn-by-turn dispatch routes. Complete with multi-mode checkout across cards, UPI, digital wallets, and cash on delivery, the platform helps local brands increase average basket size and build lasting customer retention.",
        [
            { title: "Smart Catalog & Inventory", desc: "Keep stock and pricing accurate across stores." },
            { title: "Slot-Based Delivery", desc: "Let customers choose delivery windows." },
            { title: "Store & Rider Apps", desc: "Give stores and delivery partners dedicated tools." },
            { title: "Secure Checkout", desc: "Support cards, wallets, UPI, and cash on delivery." }
        ],
        ["Faster deliveries", "Higher basket size", "More repeat orders", "Local store growth"],
        "Platform Features",
        "Everything needed to run hyperlocal grocery commerce."
    ),
    "food-delivery": createProductContent(
        "food-delivery",
        "Food Delivery App Development Company in Hyderabad",
        "Launch a scalable, user-friendly food delivery app with advanced features, seamless ordering, real-time tracking, and secure payment integration.",
        "Panacea IT Services is a leading food delivery app development company in Hyderabad, helping startups, restaurants, cloud kitchens, and enterprises build powerful digital ordering and delivery platforms. Whether you need a single-restaurant ordering app, a multi-vendor delivery marketplace, or a complete on-demand food delivery ecosystem, we engineer tailored solutions built for speed, reliability, and high order volumes. Customers enjoy effortless dish discovery, customizable menus, live GPS tracking, and secure multi-gateway payments, while partners gain dedicated restaurant, rider, and admin panels to manage commissions, payouts, promotions, and daily operations seamlessly.",
        [
            { title: "Easy Sign-Up & Login", desc: "Secure onboarding for customers, restaurants, and delivery partners." },
            { title: "Smart Search & Filters", desc: "Help users discover dishes, cuisines, and restaurants faster." },
            { title: "Restaurant Listings & Menus", desc: "Rich menus with pricing, availability, and customizations." },
            { title: "Cart & Quick Checkout", desc: "Frictionless ordering with saved addresses and repeat orders." },
            { title: "Multiple Payment Options", desc: "Cards, wallets, UPI, net banking, and cash on delivery." },
            { title: "Real-Time Order Tracking", desc: "Live status from order confirmation to doorstep delivery." },
            { title: "Ratings & Reviews", desc: "Verified feedback that builds trust and improves quality." },
            { title: "Push Notifications & Offers", desc: "Targeted campaigns, discounts, and re-engagement." },
            { title: "Admin, Restaurant & Delivery Panels", desc: "Manage users, menus, commissions, payouts, and routes from one dashboard." },
            { title: "Order Scheduling", desc: "Let customers schedule orders for a later time or date." },
            { title: "Coupons & Loyalty", desc: "Run discounts, cashback, and repeat-order rewards." },
            { title: "Multi-Language & Multi-Currency", desc: "Serve customers across regions and markets." }
        ],
        [
            "Single restaurant, multi-vendor, cloud kitchen, and subscription models",
            "Real-time tracking, route optimization, and delivery partner management",
            "Secure, PCI-compliant payment gateway integration",
            "AI-powered recommendations, smart search, and demand forecasting",
            "Custom UI/UX for customers, restaurants, and delivery agents",
            "Scalable architecture built for high order volumes",
            "Agile delivery with transparent communication",
            "Post-launch support, maintenance, and feature enhancements"
        ],
        "Core Features of Our Food Delivery App",
        "Everything customers, restaurants, delivery partners, and admins need to run a seamless food delivery business.",
        [
            { step: 1, name: "Discovery & Planning", desc: "We understand your business model, audience, workflows, and goals." },
            { step: 2, name: "UI/UX Design", desc: "We design intuitive interfaces for customers, restaurants, and delivery agents." },
            { step: 3, name: "Development", desc: "We build secure, scalable applications with real-time tracking and payments." },
            { step: 4, name: "Testing & QA", desc: "Every module is tested for performance, usability, and reliability." },
            { step: 5, name: "Launch & Support", desc: "We help you launch smoothly and continue with upgrades, maintenance, and optimization." }
        ],
        [
            { q: "What is food delivery app development?", a: "Food delivery app development is the process of building mobile or web applications that allow users to order food online, track deliveries in real time, and make secure payments. These apps connect customers, restaurants, and delivery partners on a single platform." },
            { q: "How much does it cost to develop a food delivery app?", a: "The cost depends on features, platforms, and business model. Basic apps are more affordable, while advanced multi-vendor platforms with real-time tracking, analytics, and integrations require a higher investment. We provide custom quotes based on your feature list and launch roadmap." },
            { q: "How long does it take to build a food delivery app?", a: "A food delivery app typically takes 4 to 12 weeks to develop, depending on features and complexity. Simple apps take less time, while custom multi-vendor or enterprise platforms require additional development and testing." },
            { q: "Can you build apps like Zomato or Uber Eats?", a: "Yes. We develop scalable food delivery apps similar to Zomato, Swiggy, and Uber Eats with custom features, real-time tracking, and a seamless user experience tailored to your business model." },
            { q: "What features are essential in a food delivery app?", a: "Key features include restaurant listings, menu browsing, real-time order tracking, secure payments, delivery management, and notifications. Advanced apps also include AI recommendations, analytics, and loyalty programs." },
            { q: "What business models are supported in food delivery apps?", a: "Food delivery apps support multiple business models such as single restaurant apps, multi-vendor marketplaces, cloud kitchens, and subscription-based delivery platforms, depending on your business goals." },
            { q: "Do you provide maintenance and support after launch?", a: "Yes. We provide ongoing support and maintenance, including updates, performance optimization, bug fixes, and feature enhancements to ensure smooth operation." },
            { q: "Can AI be integrated into food delivery apps?", a: "Yes. Food delivery apps can include AI-powered features such as personalized recommendations, demand forecasting, smart search, and chatbot support to improve user engagement and efficiency." }
        ]
    ),
    "courier-logistics": createProductContent(
        "courier-logistics",
        "Courier & Logistics App",
        "Same-day pickup and delivery",
        "A comprehensive courier and logistics management platform built for same-day pickup, intelligent route planning, fleet assignment, and end-to-end shipment tracking across multiple service zones. Dispatchers can balance workloads dynamically, monitor driver locations live, and handle urgent re-routing without manual calls or spreadsheets. Riders use an intuitive mobile app to scan parcels, capture digital signatures, upload photo proof of delivery, and record accurate timestamps at every stop. Customers and enterprise shippers receive automated SMS and push notifications with live tracking links, cutting support inquiries while keeping deliveries consistently on time.",
        [
            { title: "Route Optimization", desc: "Plan efficient routes and reduce fuel costs." },
            { title: "Live Tracking", desc: "Give customers and ops real-time visibility." },
            { title: "Proof of Delivery", desc: "Capture signatures, photos, and timestamps." },
            { title: "Fleet Management", desc: "Assign, monitor, and scale delivery partners." }
        ],
        ["Lower delivery costs", "On-time delivery", "Real-time visibility", "Scalable fleet operations"],
        "Logistics Features",
        "Control pickup, routing, and delivery in one place."
    ),

    /* Booking and Service Platforms */
    "tickets": createProductContent(
        "tickets",
        "Ticket Booking App",
        "Event and travel reservations",
        "A scalable ticket booking platform built for live events, concerts, transit operators, and entertainment venues to sell and manage reservations effortlessly. Real-time seat maps and tiered inventory controls prevent overselling across web and mobile channels, even during high-traffic ticket drops. Attendees receive instant QR-coded digital passes for fast, contactless gate validation, alongside clear self-service options for transfers, cancellations, and automated refunds. Organizers gain live sales dashboards, promo code campaigns, multi-currency payment support, and fraud protection tools that simplify event operations from pre-sale launch to final check-in.",
        [
            { title: "Seat & Inventory Management", desc: "Control availability across events and routes." },
            { title: "Secure Payments", desc: "Support multiple gateways and currencies." },
            { title: "QR Ticketing", desc: "Enable fast, contactless entry and validation." },
            { title: "Refunds & Cancellations", desc: "Automate policies and customer communication." }
        ],
        ["Higher conversions", "Fraud protection", "Faster check-ins", "Real-time sales insights"],
        "Booking Features",
        "Sell, validate, and manage tickets without spreadsheets."
    ),
    "party-rentals": createProductContent(
        "party-rentals",
        "Party Rentals App",
        "Manage inventory and bookings",
        "A complete rental management platform crafted for party equipment suppliers, event decorators, and furniture rental businesses to keep bookings and inventory synchronized. Interactive availability calendars automatically block reserved dates, eliminating costly double bookings across overlapping weekend events and multi-day hires. Customers can browse curated rental catalogs, select add-on packages, pay security deposits online, and schedule exact drop-off and pickup windows. Back-office teams manage warehouse prep checklists, driver routing, damage inspections, and final balance invoicing from one unified workspace that increases fleet utilization and keeps every event running smoothly.",
        [
            { title: "Rental Catalog", desc: "Showcase items with photos, pricing, and add-ons." },
            { title: "Availability Calendar", desc: "Prevent double bookings across dates." },
            { title: "Deposits & Payments", desc: "Collect deposits and final payments securely." },
            { title: "Delivery Scheduling", desc: "Plan drop-off, setup, and pickup windows." }
        ],
        ["Fewer double bookings", "Higher utilization", "Streamlined logistics", "Better customer experience"],
        "Rental Features",
        "Keep inventory, bookings, and deliveries in sync."
    ),
    "appointment-booking": createProductContent(
        "appointment-booking",
        "Appointment Booking Platform",
        "Smart scheduling for service teams",
        "A smart appointment scheduling platform designed for salons, wellness studios, clinics, consultants, and multi-staff service businesses seeking effortless booking workflows. Live calendars sync individual team member shifts, room capacities, and equipment availability so clients only see accurate, conflict-free time slots. Automated SMS, WhatsApp, and email reminders significantly reduce costly no-shows while offering one-tap rescheduling when plans change. Integrated online prepayments, cancellation policies, and recurring membership credits help businesses stabilize cash flow, eliminate front-desk phone bottlenecks, and deliver a polished client experience from first click to checkout.",
        [
            { title: "Smart Calendar", desc: "Show real-time availability across staff." },
            { title: "Automated Reminders", desc: "Reduce no-shows with SMS and email nudges." },
            { title: "Staff & Resource Scheduling", desc: "Assign rooms, equipment, and team members." },
            { title: "Online Payments", desc: "Collect prepayments or deposits at booking." }
        ],
        ["Fewer no-shows", "Higher utilization", "Less admin work", "Better customer reviews"],
        "Scheduling Features",
        "Make booking effortless for customers and staff."
    ),
    "home-services": createProductContent(
        "home-services",
        "Home Services App",
        "On-demand home service bookings",
        "An on-demand home services marketplace connecting homeowners with background-verified professionals for cleaning, plumbing, electrical repairs, appliance servicing, and beauty care. Customers browse transparent service packages, view upfront pricing, select preferred arrival windows, and track assigned technicians live on a map. Every service provider goes through structured onboarding, credential verification, and skill categorization before accepting jobs through their dedicated partner app. Built-in in-app chat, secure digital payments, tipping, and post-job review workflows foster customer trust while helping operators scale reliable local service coverage.",
        [
            { title: "Service Marketplace", desc: "List services, pricing, and service areas." },
            { title: "Verified Professionals", desc: "Onboard and verify providers before dispatch." },
            { title: "Live Job Tracking", desc: "Track arrival, progress, and completion." },
            { title: "In-App Payments", desc: "Handle payments, tips, and refunds securely." }
        ],
        ["More bookings", "Trusted providers", "Faster dispatch", "Transparent pricing"],
        "Service Features",
        "Connect customers with reliable local professionals."
    ),

    /* E-Commerce & Marketplace Solutions */
    "multi-vendor-marketplace": createProductContent(
        "multi-vendor-marketplace",
        "Multi-Vendor Marketplace",
        "Scalable marketplace platforms",
        "A comprehensive multi-vendor commerce platform engineered with streamlined seller onboarding, flexible commission management, unified checkout, and dedicated vendor dashboards. Marketplace operators can verify incoming merchants, set category-based fee rules, and automate split payouts without manual accounting overhead. Shoppers enjoy a seamless storefront experience where they can browse diverse brands, filter across thousands of SKUs, and complete a single unified cart checkout across multiple independent sellers. Each vendor receives real-time order alerts, inventory controls, shipping label workflows, and transparent earnings analytics to scale sales confidently.",
        [
            { title: "Vendor Onboarding", desc: "Approve sellers and manage store profiles." },
            { title: "Commission Engine", desc: "Configure category-wise commissions and payouts." },
            { title: "Unified Cart", desc: "Let customers buy from multiple sellers at once." },
            { title: "Vendor Dashboards", desc: "Give sellers orders, inventory, and earnings views." }
        ],
        ["New revenue streams", "Faster scaling", "Transparent payouts", "Better seller experience"],
        "Marketplace Features",
        "Run a marketplace without juggling disconnected tools."
    ),
    "online-store": createProductContent(
        "online-store",
        "Online Store",
        "Conversion-focused e-commerce",
        "A modern, conversion-focused online store platform built for direct-to-consumer brands and growing retail businesses seeking full control over their digital storefront. Powerful product management tools make it simple to organize multi-variant catalogs, update real-time stock levels, and launch seasonal collections in minutes. Fast-loading product pages, streamlined guest or member checkout, and trusted payment integrations help dramatically reduce cart abandonment on both desktop and mobile. Complete with automated order tracking, self-service returns, coupon campaigns, and customer loyalty perks, the platform turns casual browsers into repeat buyers.",
        [
            { title: "Product Management", desc: "Manage variants, pricing, and inventory." },
            { title: "Secure Checkout", desc: "Reduce friction with fast, trusted payments." },
            { title: "Order Management", desc: "Track fulfillment, returns, and refunds." },
            { title: "Discounts & Coupons", desc: "Run campaigns that drive repeat purchases." }
        ],
        ["Higher conversions", "Lower cart abandonment", "Easy catalog updates", "Repeat purchases"],
        "Store Features",
        "A storefront designed to turn browsers into buyers."
    ),
    "subscription-commerce": createProductContent(
        "subscription-commerce",
        "Subscription Commerce Platform",
        "Recurring revenue made simple",
        "A purpose-built subscription commerce platform designed to simplify recurring billing, flexible plan management, customer self-service portals, and automated churn reduction. Businesses can launch monthly boxes, annual memberships, tiered SaaS packages, or hybrid usage-based pricing without wrestling with brittle billing scripts. Automated invoicing, tax handling, and intelligent dunning retries recover failed card payments seamlessly before accounts lapse. Subscribers gain an intuitive portal to upgrade tiers, swap items, skip deliveries, or pause plans on demand—boosting long-term retention while keeping recurring revenue predictable.",
        [
            { title: "Flexible Plans", desc: "Offer monthly, annual, and usage-based plans." },
            { title: "Recurring Billing", desc: "Automate invoices, retries, and receipts." },
            { title: "Dunning Management", desc: "Recover failed payments with smart retries." },
            { title: "Customer Portal", desc: "Let customers upgrade, pause, or cancel." }
        ],
        ["Predictable revenue", "Lower churn", "Automated billing", "Better retention"],
        "Subscription Features",
        "Build recurring revenue without billing headaches."
    ),
    "b2b-marketplace": createProductContent(
        "b2b-marketplace",
        "B2B Marketplace",
        "Wholesale buying and selling",
        "An enterprise-ready B2B commerce platform built for wholesale catalogs, tiered bulk pricing, structured RFQ negotiations, and digital credit-term workflows. Manufacturers, distributors, and trade buyers collaborate through dedicated portals supporting custom price lists, minimum order quantities, and multi-approver purchasing rules. Buyers can request and compare formal quotes, reorder past shipments in seconds, and track multi-pallet fulfillment milestones online. Finance teams benefit from automated invoice generation, configurable credit limits, net-term tracking, and ERP-ready reporting that digitize complex wholesale procurement from quote to settlement.",
        [
            { title: "Bulk Pricing", desc: "Support tiered and customer-specific pricing." },
            { title: "RFQ & Quotes", desc: "Let buyers request and compare quotes." },
            { title: "Buyer & Seller Portals", desc: "Give each side the tools they need." },
            { title: "Credit Terms", desc: "Manage invoices, limits, and payment terms." }
        ],
        ["Faster procurement", "Larger order values", "Transparent negotiations", "Streamlined operations"],
        "B2B Features",
        "Digitize wholesale commerce from quote to payment."
    ),

    /* Education & Entertainment */
    "school": createProductContent(
        "school",
        "School Management App",
        "All-in-one educational platform",
        "A comprehensive digital school management platform connecting administrators, teachers, students, and parents across every academic and operational workflow. From online admissions, class timetables, and digital attendance to exam scheduling, report cards, and assignment tracking, daily campus tasks run from one unified system. Automated fee invoicing with online payment receipts simplifies accounting, while real-time school bus GPS tracking gives families peace of mind during daily commutes. Role-based portals keep sensitive student records secure while ensuring instant announcements, homework updates, and progress reports reach parents right on time.",
        [
            { title: "Academic Management", desc: "Timetables, exams, and grading." },
            { title: "Parent Portal", desc: "Real-time updates on student progress." },
            { title: "Fees & Payments", desc: "Collect fees online with clear records." },
            { title: "Transport Tracking", desc: "Keep parents informed about bus routes." }
        ],
        ["Streamlined operations", "Enhanced communication", "Data security", "Less administrative work"],
        "Platform Modules",
        "Connecting students, parents, and teachers."
    ),
    "child-care": createProductContent(
        "child-care",
        "Child Care System",
        "Streamline daycare operations",
        "An all-in-one child care and daycare management platform designed to simplify center administration, automated tuition billing, and daily family communication. Educators log contactless digital check-ins and check-outs for children and staff, track room ratios in real time, and record meals, naps, and developmental milestones in seconds. Parents receive reassuring photo updates, activity summaries, and instant announcements through a secure mobile portal without disrupting classroom routines. Meanwhile, center directors automate recurring invoices, late-pickup fees, subsidy tracking, and compliance logs so teams can spend more time caring for children.",
        [
            { title: "Attendance Tracking", desc: "Digital check-in/out for children and staff." },
            { title: "Automated Billing", desc: "Seamless invoicing and payment processing." },
            { title: "Parent Communication", desc: "Share updates, photos, and reminders." },
            { title: "Daily Reports", desc: "Keep families informed about activities and meals." }
        ],
        ["Reduced administrative work", "Improved parent engagement", "Accurate record keeping", "Safer daily operations"],
        "System Features",
        "Everything you need to run your center efficiently."
    ),
    "omr": createProductContent(
        "omr",
        "OMR Customization",
        "Automated grading solutions",
        "A high-precision optical mark recognition platform built for universities, coaching institutes, recruitment boards, and examination authorities handling large-scale testing. Administrators can design custom OMR answer sheet templates with flexible bubble layouts, barcode identifiers, and multi-set question keys tailored to any exam format. High-volume batch scanning processes thousands of sheets rapidly with intelligent skew correction, smudge detection, and configurable negative-marking rules. Every scanned sheet, manual override, and score report is preserved with complete digital audit trails so institutions publish accurate, verifiable results in hours instead of weeks.",
        [
            { title: "Custom Templates", desc: "Design answer sheets for any exam format." },
            { title: "High-Volume Scanning", desc: "Process hundreds to millions of sheets." },
            { title: "Auto Grading", desc: "Score objectively with configurable rules." },
            { title: "Audit Trails", desc: "Keep every scan and result traceable." }
        ],
        ["Faster results", "High accuracy", "Reduced manual effort", "Audit-ready records"],
        "OMR Features",
        "Accurate grading at institutional scale."
    ),
    "elearning": createProductContent(
        "elearning",
        "eLearning Platform",
        "Interactive online learning",
        "A feature-rich eLearning and LMS platform built for academies, corporate training teams, and edtech founders delivering interactive online education at scale. Instructors can structure multi-module courses combining HD video lessons, downloadable workbooks, live interactive webinars, and timed skill assessments. Learners track their completion milestones across web and mobile devices, participate in cohort discussions, and earn verifiable digital certificates upon passing final evaluations. Built-in enrollment checkout, subscription bundles, instructor analytics, and drip-content scheduling give organizations everything required to launch and monetize impactful learning programs.",
        [
            { title: "Course Builder", desc: "Create structured lessons and modules." },
            { title: "Live Classes", desc: "Host real-time sessions and recordings." },
            { title: "Progress Tracking", desc: "Track completion and learner outcomes." },
            { title: "Certifications", desc: "Issue verifiable certificates automatically." }
        ],
        ["Higher engagement", "Scalable delivery", "Better outcomes", "New revenue streams"],
        "Learning Features",
        "Deliver engaging learning experiences at scale."
    ),
    "interactive-media": createProductContent(
        "interactive-media",
        "Interactive Media Platform",
        "Engaging entertainment experiences",
        "An interactive media and entertainment platform engineered for adaptive video and audio streaming, real-time audience participation, and personalized content discovery. Viewers move beyond passive watching with live polls, interactive trivia quizzes, synchronized reactions, and branching storylines that turn every broadcast into a shared experience. Behavior-driven recommendation feeds surface relevant shows, shorts, and channels tailored to each user's interests, driving longer watch sessions and higher daily retention. Dedicated creator studios provide publishing workflows, audience analytics, and flexible monetization across subscriptions, ad placements, and virtual gifts.",
        [
            { title: "Content Streaming", desc: "Deliver video and audio reliably at scale." },
            { title: "Interactive Quizzes", desc: "Add participation layers to content." },
            { title: "Personalized Feeds", desc: "Recommend content based on behavior." },
            { title: "Creator Tools", desc: "Help creators publish and monetize." }
        ],
        ["Longer sessions", "Higher retention", "Monetization options", "Scalable content operations"],
        "Media Features",
        "Turn passive viewing into interactive experiences."
    ),

    /* Healthcare & Wellness */
    "patient-management": createProductContent(
        "patient-management",
        "Patient Management System",
        "Digital patient records and care",
        "A unified patient management system designed for clinics, specialty practices, and multi-department hospitals to streamline electronic health records, scheduling, and billing. Clinicians gain instant, searchable access to patient histories, lab reports, allergies, and visit notes with strict role-based security and audit logging. Front-desk coordinators manage doctor calendars, consultation rooms, and patient queues smoothly without paper charts or duplicate data entry. Integrated insurance claims tracking, automated invoicing, and a self-service patient portal help care teams reduce administrative bottlenecks and deliver more attentive, coordinated patient care.",
        [
            { title: "Electronic Health Records", desc: "Keep patient history secure and searchable." },
            { title: "Appointment Scheduling", desc: "Coordinate doctors, rooms, and visits." },
            { title: "Billing & Claims", desc: "Streamline invoices and insurance workflows." },
            { title: "Patient Portal", desc: "Give patients access to records and visits." }
        ],
        ["Better care coordination", "Less paperwork", "Faster billing", "Improved patient experience"],
        "Clinical Features",
        "One system for records, scheduling, and billing."
    ),
    "telemedicine": createProductContent(
        "telemedicine",
        "Telemedicine App",
        "Virtual consultations and care",
        "A secure telemedicine platform built for hospitals, clinics, and digital health startups to deliver high-definition virtual consultations and continuous remote care. Patients can browse practitioner specialties, book same-day video appointments, upload symptoms or prior lab reports, and join encrypted calls from any phone or browser. Doctors manage structured appointment queues, review patient intake summaries, issue digital e-prescriptions directly, and schedule automated follow-up reminders. Private, organized messaging threads keep post-visit questions structured while extending clinical reach well beyond physical waiting rooms.",
        [
            { title: "Video Consultations", desc: "Connect patients and providers securely." },
            { title: "E-Prescriptions", desc: "Issue and share prescriptions digitally." },
            { title: "Secure Messaging", desc: "Keep follow-ups private and organized." },
            { title: "Provider Scheduling", desc: "Manage availability across specialties." }
        ],
        ["Wider access", "Lower overhead", "Faster care", "Better follow-ups"],
        "Telehealth Features",
        "Deliver care beyond the clinic walls."
    ),
    "clinic-booking": createProductContent(
        "clinic-booking",
        "Clinic Booking Platform",
        "Appointments for clinics and practices",
        "A dedicated clinic booking platform tailored for solo practitioners, dental clinics, diagnostic centers, and multi-location medical practices. Real-time availability calendars display open slots across doctors, specialties, and branches so patients can book or reschedule online without calling the front desk. Automated SMS and email appointment reminders dramatically cut missed visits, while built-in waitlist backfills keep consultation schedules consistently full. With secure upfront consultation payments, digital intake forms, and post-visit feedback prompts, clinics save staff hours every day while elevating patient satisfaction.",
        [
            { title: "Doctor Availability", desc: "Show real-time slots by specialty." },
            { title: "Online Booking", desc: "Let patients book without calling." },
            { title: "Automated Reminders", desc: "Reduce no-shows with timely nudges." },
            { title: "Payments", desc: "Collect consultation fees securely." }
        ],
        ["Fewer no-shows", "Higher utilization", "Less front-desk work", "Better reviews"],
        "Clinic Features",
        "Simplify appointments for staff and patients."
    ),
    "fitness-wellness": createProductContent(
        "fitness-wellness",
        "Fitness & Wellness App",
        "Training, tracking, and memberships",
        "An engaging fitness and wellness platform engineered for gyms, yoga studios, personal trainers, and holistic health brands to manage classes, memberships, and member progress. Clients can reserve studio spots, join automated class waitlists, purchase recurring membership packs, and log daily workouts, nutrition, and body metrics from one mobile app. Trainers receive dedicated coaching tools to assign custom exercise programs, share video demonstrations, monitor adherence, and celebrate client milestones. Automated renewal billing and community challenges keep members motivated and boost long-term studio retention.",
        [
            { title: "Class Booking", desc: "Manage schedules, capacity, and waitlists." },
            { title: "Membership Plans", desc: "Sell recurring plans and packages." },
            { title: "Workout Tracking", desc: "Help members log activity and progress." },
            { title: "Trainer Tools", desc: "Give coaches plans and client visibility." }
        ],
        ["Higher retention", "Recurring revenue", "Better engagement", "Scalable coaching"],
        "Wellness Features",
        "Keep members motivated and coming back."
    ),

    /* Social & Media Apps */
    "influencers": createProductContent(
        "influencers",
        "Influencers App",
        "Manage campaigns and creators",
        "A full-cycle creator marketplace and influencer campaign management platform connecting brands and agencies with vetted content creators across social channels. Brands can filter talent by niche, audience demographics, engagement authenticity, and past campaign performance without juggling messy spreadsheets. Structured workflow tools handle campaign briefs, contract approvals, draft content reviews, and scheduled launch tracking in one transparent workspace. Real-time ROI dashboards measure impressions, clicks, and conversions while automated escrow and milestone payouts ensure creators are paid accurately and on time.",
        [
            { title: "Creator Discovery", desc: "Find creators by niche, audience, and fit." },
            { title: "Campaign Management", desc: "Brief, track, and approve deliverables." },
            { title: "Performance Analytics", desc: "Measure reach, engagement, and ROI." },
            { title: "Secure Payments", desc: "Pay creators and track campaign spend." }
        ],
        ["Better matches", "Faster campaigns", "Transparent ROI", "Scalable partnerships"],
        "Creator Features",
        "Run influencer campaigns without spreadsheets."
    ),
    "community-platform": createProductContent(
        "community-platform",
        "Community Platform",
        "Community building and engagement",
        "A customizable community platform built for brands, membership networks, alumni groups, and professional associations to spark meaningful member engagement. Rich member profiles, interest-based groups, threaded discussions, and resource libraries help members connect, share expertise, and collaborate organically. Built-in event calendars support virtual webinars, local meetups, RSVPs, and post-event recordings inside the same branded ecosystem. Comprehensive moderation queues, automated spam filters, role permissions, and engagement analytics keep every conversation welcoming, safe, and aligned with your community guidelines.",
        [
            { title: "Member Profiles", desc: "Help members connect and contribute." },
            { title: "Groups & Forums", desc: "Organize conversations by topic." },
            { title: "Events", desc: "Host meetups, webinars, and sessions." },
            { title: "Moderation Tools", desc: "Keep discussions safe and on-brand." }
        ],
        ["Stronger engagement", "Member growth", "Safer spaces", "Better insights"],
        "Community Features",
        "Build a space members want to return to."
    ),
    "content-sharing": createProductContent(
        "content-sharing",
        "Content Sharing App",
        "Publish, discover, and share media",
        "A high-performance content sharing app designed for creators, publishers, and niche media communities to publish, discover, and monetize digital media across web and mobile. Seamless upload pipelines support short-form videos, high-resolution photography, podcasts, and rich editorial posts with adaptive playback on any connection. Personalized discovery feeds, topic tags, reactions, and threaded comments keep audiences exploring new voices and returning daily. Integrated creator monetization tools—including paid subscriptions, tipping, gated posts, and transparent payout dashboards—empower independent storytellers to grow sustainable businesses.",
        [
            { title: "Media Uploads", desc: "Support images, video, and audio." },
            { title: "Feeds & Discovery", desc: "Surface relevant content by interest." },
            { title: "Reactions & Comments", desc: "Drive conversation and engagement." },
            { title: "Creator Monetization", desc: "Enable tips, subscriptions, and payouts." }
        ],
        ["Higher reach", "Longer sessions", "New revenue", "Scalable moderation"],
        "Content Features",
        "Give creators and audiences a place to connect."
    ),
    "messaging-app": createProductContent(
        "messaging-app",
        "Messaging App",
        "Real-time chat and collaboration",
        "A fast, reliable real-time messaging platform engineered for one-to-one chat, structured group channels, rich media sharing, and secure team or community collaboration. Built on low-latency delivery infrastructure, messages, typing indicators, read receipts, and push notifications sync effortlessly across mobile and desktop clients. Users can organize threaded discussions, share documents, photos, and voice notes, and search conversation histories instantaneously. Enterprise-grade encryption, role-based access controls, and scalable cloud architecture protect sensitive communications while supporting thousands of concurrent users reliably.",
        [
            { title: "Real-Time Chat", desc: "Deliver messages instantly at scale." },
            { title: "Group Conversations", desc: "Support teams, communities, and threads." },
            { title: "Media Sharing", desc: "Send files, images, and voice notes." },
            { title: "End-to-End Security", desc: "Protect conversations and user data." }
        ],
        ["Faster communication", "Stronger retention", "Secure collaboration", "Global reach"],
        "Messaging Features",
        "Keep conversations fast, secure, and reliable."
    ),

    /* AI-Powered Products */
    "ai-assistant": createProductContent(
        "ai-assistant",
        "AI Assistant",
        "Production AI built on LLMs and RAG",
        "A production-ready enterprise AI assistant engineered to answer domain-specific questions accurately, execute guided actions, and integrate directly into your existing business systems. Grounded in large language models and retrieval-augmented generation, it pulls verified context from approved company documentation, product catalogs, and policy playbooks rather than guessing. Deep API integrations connect the assistant to CRMs, helpdesk ticketing tools, scheduling systems, and internal databases to resolve customer and employee requests end to end. Comprehensive guardrails, citation checks, usage telemetry, and audit logs ensure dependable, compliant performance at scale.",
        [
            { title: "Domain-Trained Chat", desc: "Answer with your products and policies." },
            { title: "RAG Knowledge Search", desc: "Ground responses in approved documents." },
            { title: "Tool Integrations", desc: "Connect CRMs, ticketing, and internal APIs." },
            { title: "Guardrails & Logging", desc: "Monitor quality, safety, and usage." }
        ],
        ["Faster support", "Lower costs", "Accurate answers", "Enterprise-ready security"],
        "AI Features",
        "Move from AI demos to dependable production use."
    ),
    "rag-knowledge-base": createProductContent(
        "rag-knowledge-base",
        "RAG Knowledge Base",
        "Turn business documents into answers",
        "An enterprise retrieval-augmented knowledge base that transforms scattered PDFs, wikis, SOPs, and support tickets into instant, trustworthy answers for teams and customers. Automated ingestion pipelines chunk, index, and continuously refresh documents while semantic vector search uncovers relevant insights beyond exact keyword matches. Every generated response includes clickable inline source citations so users can verify facts immediately and organizations minimize AI hallucination risks. Granular role-based access controls ensure employees and clients only retrieve answers from documents they are authorized to view.",
        [
            { title: "Document Ingestion", desc: "Index PDFs, docs, tickets, and wikis." },
            { title: "Semantic Search", desc: "Find relevant passages beyond keywords." },
            { title: "Citation-Backed Answers", desc: "Show sources for every response." },
            { title: "Access Controls", desc: "Respect roles and sensitive content." }
        ],
        ["Instant answers", "Less hallucination", "Secure knowledge access", "Faster onboarding"],
        "Knowledge Features",
        "Make institutional knowledge searchable and trustworthy."
    ),
    "ai-automation": createProductContent(
        "ai-automation",
        "AI Workflow Automation",
        "Automate repetitive business processes",
        "An intelligent AI workflow automation platform combining visual process builders, LLM-powered decisioning, system integrations, and human-in-the-loop review gates. Operations teams can automate repetitive multi-step workflows such as document extraction, ticket triage, lead qualification, invoice routing, and compliance checks without brittle manual scripts. Native connectors bridge CRMs, ERPs, email inboxes, and cloud storage so data flows smoothly across departments in real time. Built-in confidence thresholds escalate edge cases to human reviewers with full audit trails, helping teams cut manual overhead while keeping high-stakes decisions reliable.",
        [
            { title: "Workflow Builder", desc: "Design multi-step automations visually." },
            { title: "AI Decisioning", desc: "Classify, extract, and route with LLMs." },
            { title: "System Integrations", desc: "Connect the tools your teams already use." },
            { title: "Human-in-the-Loop", desc: "Add review steps for high-risk actions." }
        ],
        ["Less manual work", "Faster operations", "Fewer errors", "Scalable processes"],
        "Automation Features",
        "Automate the work that slows your team down."
    ),
    "predictive-analytics": createProductContent(
        "predictive-analytics",
        "Predictive Analytics",
        "Forecast outcomes with your data",
        "A modern predictive analytics platform featuring automated data pipelines, custom forecasting models, executive dashboards, and proactive anomaly alerts. Businesses unify fragmented sales, operational, and customer interaction data into clean, reliable datasets ready for machine learning inference. Tailored predictive models forecast seasonal demand, inventory bottlenecks, customer churn risks, and revenue trends weeks before they impact the bottom line. Continuous model monitoring tracks accuracy and data drift over time, empowering leadership teams to replace reactive guesswork with confident, forward-looking decisions.",
        [
            { title: "Data Pipelines", desc: "Bring business data into one reliable flow." },
            { title: "Predictive Models", desc: "Forecast demand, churn, and revenue." },
            { title: "Dashboards & Alerts", desc: "Surface insights when they matter." },
            { title: "Model Monitoring", desc: "Track accuracy and drift over time." }
        ],
        ["Better decisions", "Early risk detection", "Revenue optimization", "Measurable ROI"],
        "Analytics Features",
        "Turn historical data into forward-looking decisions."
    )
};

export const hireContent: Record<string, PageContent> = {
    "mobile": {
        slug: "mobile",
        title: "Hire Mobile App Developers",
        subtitle: "Full-cycle iOS & Android app specialists",
        overview: "Augment your team with our top-tier mobile app developers. We provide experienced engineers skilled in Swift, Kotlin, React Native, and Flutter.",
        sections: {
            title: "Developer Expertise",
            description: "Vetted professionals ready to build your app.",
            features: [
                { title: "Native Experts", desc: "Deep knowledge of iOS and Android SDKs." },
                { title: "Cross-Platform", desc: "Efficient development with hybrid frameworks." },
            ],
            benefits: ["Cost-effective scaling", "Faster time to market", "No recruitment overhead"],
            process: [
                { step: 1, name: "Consultation", desc: "Discuss your resource requirements." },
                { step: 2, name: "Selection", desc: "Interview shortlisted candidates." },
                { step: 3, name: "Onboarding", desc: "Seamless integration into your team workflow." }
            ],
            faqs: defaultFaqs
        }
    },
    "react": {
        slug: "react",
        title: "Hire React Native Developers",
        subtitle: "JavaScript-powered mobile apps with native feel",
        overview: "Hire expert React Native developers to build highly performant, cross-platform mobile applications using a single JavaScript codebase.",
        sections: {
            title: "React Native Skills",
            description: "Bridging the gap between web and mobile.",
            features: [
                { title: "UI/UX Implementation", desc: "Pixel-perfect, fluid interfaces." },
                { title: "API Integration", desc: "Seamless server connectivity." },
            ],
            benefits: ["Code reusability", "Faster development cycle", "Native-like performance"],
            process: [
                { step: 1, name: "Consultation", desc: "Discuss your resource requirements." },
                { step: 2, name: "Selection", desc: "Interview shortlisted candidates." },
                { step: 3, name: "Onboarding", desc: "Seamless integration into your team workflow." }
            ],
            faqs: defaultFaqs
        }
    }
};

export const companyContent: Record<string, PageContent> = {
    "about": {
        slug: "about",
        title: "About Panacea",
        subtitle: "Company Overview",
        overview: "Panacea IT Services is a leading technology solutions provider specializing in digital transformation, software development, and enterprise IT consulting.",
        sections: {
            title: "Who We Are",
            description: "Empowering businesses through technology.",
            features: [
                { title: "Global Reach", desc: "Delivering solutions to clients worldwide." },
                { title: "Innovation Focused", desc: "Always adopting the latest technologies." },
            ],
            benefits: ["14+ Years Experience", "1500+ Projects Completed", "ISO Certified"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "vision": {
        slug: "vision",
        title: "Vision & Mission",
        subtitle: "Driving digital innovation with purpose",
        overview: "Our vision is to be the global partner of choice for digital transformation, while our mission is to empower businesses with innovative, scalable software that drives measurable results.",
        sections: {
            title: "Our Core Values",
            description: "The principles that guide our work.",
            features: [
                { title: "Excellence", desc: "Uncompromising quality in every deliverable." },
                { title: "Client Centricity", desc: "Your success is our priority." },
            ],
            benefits: ["Transparent processes", "Dedicated partnerships", "Commitment to innovation"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "leadership": {
        slug: "leadership",
        title: "Leadership Team",
        subtitle: "Experienced minds guiding Panacea",
        overview:
            "Panacea is led by founders and operators who blend product vision, engineering depth, and operational excellence — building reliable digital products for startups and enterprises.",
        sections: {
            title: "How Leadership Shows Up",
            description: "Hands-on guidance from strategy through delivery.",
            features: [
                { title: "Founder-led delivery", desc: "Direct involvement on architecture, UX, and go-to-market decisions." },
                { title: "Cross-functional teams", desc: "Design, engineering, QA, and growth collaborating as one unit." },
                { title: "Global mindset", desc: "Delivery culture shaped by Hyderabad and USA market experience." },
            ],
            benefits: [
                "Clear ownership and accountability",
                "Transparent communication",
                "Quality-first engineering standards",
            ],
            process: [
                { step: 1, name: "Align", desc: "Understand business goals and constraints with stakeholders." },
                { step: 2, name: "Staff", desc: "Assemble the right mix of product and engineering talent." },
                { step: 3, name: "Guide", desc: "Weekly reviews, risk management, and decision support." },
                { step: 4, name: "Scale", desc: "Grow teams and systems as product traction increases." },
            ],
            faqs: defaultFaqs,
        },
    },
    "journey": {
        slug: "journey",
        title: "Our Journey",
        subtitle: "14+ years of building digital products",
        overview:
            "From early mobile and web engagements to SaaS platforms and enterprise systems, Panacea has grown into an ISO-certified partner trusted across industries — refining how we design, build, and support software that lasts.",
        sections: {
            title: "Milestones That Shaped Us",
            description: "A practical path from craftsmanship to scale.",
            features: [
                { title: "Product craft", desc: "Strong UI/UX and engineering fundamentals on every engagement." },
                { title: "Industry breadth", desc: "Education, fintech, logistics, healthcare-adjacent, and marketplace domains." },
                { title: "Delivery maturity", desc: "Repeatable processes for discovery, sprints, QA, and release." },
            ],
            benefits: ["14+ years experience", "1500+ projects delivered", "Hyderabad + USA presence"],
            process: [
                { step: 1, name: "Foundations", desc: "Built core mobile and web delivery capabilities." },
                { step: 2, name: "Products", desc: "Launched vertical products and reusable platform modules." },
                { step: 3, name: "Scale", desc: "Expanded team, cloud practices, and enterprise engagements." },
                { step: 4, name: "Today", desc: "ISO-certified delivery with full-stack digital services." },
            ],
            faqs: defaultFaqs,
        },
    },
    "awards": {
        slug: "awards",
        title: "Awards & Recognition",
        subtitle: "Celebrating craft, quality, and impact",
        overview:
            "Recognition matters when it reflects real outcomes — design excellence, engineering reliability, and client trust. Panacea’s awards highlight a culture of quality across product and delivery.",
        sections: {
            title: "What Recognition Means Here",
            description: "Standards we continue to raise on every project.",
            features: [
                { title: "Design excellence", desc: "Interfaces that balance beauty with usability and conversion." },
                { title: "Engineering quality", desc: "Secure, maintainable systems built for production reality." },
                { title: "Client outcomes", desc: "Partners who return because delivery is dependable." },
            ],
            benefits: ["Quality-first culture", "Peer and industry recognition", "Continuous improvement"],
            process: defaultProcess,
            faqs: defaultFaqs,
        },
    },
    "nasscom": {
        slug: "nasscom",
        title: "NASSCOM Membership",
        subtitle: "Part of India’s premier IT industry network",
        overview:
            "Panacea is proud to be associated with NASSCOM’s ecosystem — staying connected to industry standards, talent practices, and the broader Indian technology community.",
        sections: {
            title: "Why Membership Matters",
            description: "Credibility, community, and continuous learning.",
            features: [
                { title: "Industry alignment", desc: "Practices informed by national IT and digital standards." },
                { title: "Talent & capability", desc: "Access to insights on skills, roles, and emerging tech." },
                { title: "Network effects", desc: "Connections across product companies, startups, and enterprises." },
            ],
            benefits: ["Trusted industry association", "Up-to-date market awareness", "Professional credibility"],
            process: defaultProcess,
            faqs: defaultFaqs,
        },
    }
};

// Helper function to resolve generic missing routes
export function getPageContent(category: string, slug: string): PageContent {
    let dictionary;
    if (category === "services") dictionary = servicesContent;
    else if (category === "products") dictionary = productsContent;
    else if (category === "hire") dictionary = hireContent;
    else if (category === "company") dictionary = companyContent;

    if (dictionary && dictionary[slug]) {
        return dictionary[slug];
    }

    // Generic Fallback generator for unmapped routes so we never hit a true 404 visually
    const formattedTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
        slug,
        title: `${formattedTitle} Solutions`,
        subtitle: `Expert ${formattedTitle} services tailored for you`,
        overview: `At Panacea IT Services, we provide comprehensive ${formattedTitle.toLowerCase()} solutions designed to streamline operations, enhance user engagement, and accelerate your digital transformation journey. Our product engineering teams combine intuitive UI/UX design, scalable cloud architectures, and battle-tested integrations to deliver platforms tailored around your exact business workflows. Whether launching a new digital venture or modernizing legacy systems, we build secure, high-performance applications with real-time visibility, automated operations, and seamless payment or third-party connectivity. Every solution is backed by structured QA, transparent milestone delivery, and ongoing post-launch support so your platform grows reliably alongside your users.`,
        sections: {
            title: `Our ${formattedTitle} Offerings`,
            description: "Industry-leading expertise to help you scale.",
            features: [
                { title: "End-to-End Delivery", desc: "From concept to deployment." },
                { title: "Scalable Architecture", desc: "Built for future growth." },
                { title: "Dedicated Support", desc: "24/7 monitoring and maintenance." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    };
}
