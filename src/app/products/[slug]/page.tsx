import React from "react";
import { getPageContent, productsContent } from "@/data/companyContent";
import { fallbackProductMedia, productMedia } from "@/data/productMedia";
import ProductHero from "@/components/sections/ProductHero";
import ProductFeatures from "@/components/sections/ProductFeatures";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import FAQSection from "@/components/sections/FAQSection";
import RelatedProducts from "@/components/sections/RelatedProducts";
import CTASection from "@/components/sections/CTASection";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("products", resolvedParams.slug);
    if (!content) return { title: 'Product Not Found' };
    return { title: `${content.title} | Panacea IT Services`, description: content.overview };
}

export async function generateStaticParams() {
    return Object.keys(productsContent).map((slug) => ({
        slug: String(slug),
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("products", resolvedParams.slug);
    if (!content) notFound();

    const media = productMedia[resolvedParams.slug] ?? fallbackProductMedia;
    const highlights = content.sections.features?.slice(0, 3).map((feature) => feature.title) ?? [];
    const relatedProducts = Object.entries(productMedia)
        .filter(([slug, item]) => item.category === media.category && slug !== resolvedParams.slug)
        .slice(0, 3)
        .map(([slug, item]) => {
            const relatedContent = productsContent[slug];
            return {
                slug,
                title: relatedContent?.title ?? item.shortName,
                subtitle: relatedContent?.subtitle ?? "A scalable digital product built for modern businesses.",
                image: item.image,
                alt: item.alt,
                category: item.category,
            };
        });

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30">
            <ProductHero
                title={content.title}
                subtitle={content.subtitle}
                overview={content.overview}
                category={media.category}
                image={media.image}
                imageAlt={media.alt}
                highlights={highlights}
            />
            <div id="product-features">
                <ProductFeatures section={content.sections} />
            </div>
            <BenefitsSection
                benefits={content.sections.benefits}
                title={`Why Choose Us for ${media.shortName} Development`}
                intro={`We combine product strategy, design, and engineering to deliver a ${media.shortName.toLowerCase()} that is secure, scalable, and built around your users.`}
                image={media.benefitImage ?? media.image}
                imageAlt={media.benefitAlt ?? media.alt}
            />
            <ProcessTimeline process={content.sections.process} />
            <FAQSection faqs={content.sections.faqs} />
            <RelatedProducts products={relatedProducts} category={media.category} />
            <CTASection
                title={`Ready to Build Your ${media.shortName}?`}
                description="Share your product idea and we will help you define the right features, architecture, and launch roadmap."
                primaryLabel="Request a Product Demo"
            />
        </div>
    );
}
