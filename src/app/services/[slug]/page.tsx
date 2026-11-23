import React from "react";
import Image from "next/image";
import { getPageContent, servicesContent } from "@/data/companyContent";
import HeroSection from "@/components/sections/HeroSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import { notFound } from "next/navigation";

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("services", resolvedParams.slug);
    if (!content) return { title: 'Service Not Found' };

    return {
        title: content.title,
        description: content.overview,
    };
}

export async function generateStaticParams() {
    return Object.keys(servicesContent).map((slug) => ({
        slug: String(slug),
    }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("services", resolvedParams.slug);

    if (!content) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30">
            <HeroSection
                title={content.title}
                subtitle={content.subtitle}
                overview={content.overview}
                ctaLabel={content.cta?.label}
                ctaHref={content.cta?.href}
            />

            <FeatureGrid section={content.sections} />

            <BenefitsSection benefits={content.sections.benefits} intro={content.sections.benefitsIntro} />

            <ProcessTimeline process={content.sections.process} intro={content.sections.processIntro} />

            <FAQSection faqs={content.sections.faqs} />

            <CTASection
                title={content.cta?.title ?? "Let's Build Your Software Solution"}
                description={content.cta?.description}
                primaryLabel={content.cta?.label ?? "Start Your Project"}
                primaryHref={content.cta?.href ?? "/contact"}
            />
        </div>
    );
}
