"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Home,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

interface ProductHeroProps {
    title: string;
    subtitle: string;
    overview: string;
    category: string;
    image: string;
    imageAlt: string;
    highlights?: string[];
}

const stats = [
    { value: "1500+", label: "Apps Delivered" },
    { value: "14+", label: "Years Experience" },
    { value: "20+", label: "Industries Served" },
];

export default function ProductHero({
    title,
    subtitle,
    overview,
    category,
    image,
    imageAlt,
    highlights = [],
}: ProductHeroProps) {
    const words = title.split(" ");
    const lastWord = words.length > 1 ? words.pop() : "";
    const leadWords = words.join(" ");

    return (
        <section className="relative overflow-hidden bg-[#07133a] pt-28 pb-16 md:pt-36 md:pb-20">
            {/* Full-bleed background image starting at the very top */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
                {/* Left-to-right darkening, right side kept dark too */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#07133a] via-[#07133a]/90 to-[#07133a]/70" />
                {/* Vertical darkening for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07133a] via-[#07133a]/45 to-[#07133a]/70" />
                <div className="absolute inset-0 bg-[#07133a]/25" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-wide text-slate-300"
                >
                    <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-white">
                        <Home size={12} /> Home
                    </Link>
                    <ChevronRight size={12} className="text-slate-500" />
                    <Link href="/products" className="transition-colors hover:text-white">
                        Products
                    </Link>
                    <ChevronRight size={12} className="text-slate-500" />
                    <span className="text-cyan-300">{category}</span>
                </nav>

                {/* Centered heading on top of the image */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mx-auto max-w-5xl text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        {category}
                    </span>

                    <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-7xl">
                        {leadWords}{" "}
                        {lastWord && (
                            <span className="bg-gradient-to-r from-[#00E676] via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                {lastWord}
                            </span>
                        )}
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-relaxed text-slate-100 md:text-lg">
                        {subtitle}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                            <Sparkles size={12} className="text-cyan-300" />
                            Product Spotlight
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-200 backdrop-blur-md">
                            <ShieldCheck size={12} />
                            ISO-Certified
                        </span>
                    </div>
                </motion.div>

                {/* Overview + highlights over the image */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
                    className="mt-14 grid gap-10 border-t border-white/15 pt-10 md:mt-16 md:pt-12 lg:grid-cols-2 lg:gap-16"
                >
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                            Overview
                        </p>
                        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-100 md:text-base">
                            {overview}
                        </p>
                    </div>

                    {highlights.length > 0 && (
                        <ul className="space-y-4 lg:pt-1">
                            {highlights.slice(0, 3).map((highlight) => (
                                <li key={highlight} className="flex items-start gap-3">
                                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#00E676]" />
                                    <span className="text-sm font-semibold leading-relaxed text-slate-100">
                                        {highlight}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.div>

                {/* CTA + stats over the image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="mt-12 text-center md:mt-14"
                >
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-blue-700 hover:to-cyan-600"
                        >
                            Request a Quote
                            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#product-features"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            Explore Features
                        </Link>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-white/15 rounded-2xl border border-white/15 bg-black/25 px-4 py-6 backdrop-blur-md md:mt-12 md:px-6">
                        {stats.map((stat) => (
                            <div key={stat.label} className="px-2 text-center">
                                <p className="bg-gradient-to-r from-[#00E676] via-cyan-300 to-blue-400 bg-clip-text text-2xl font-black tracking-tight text-transparent md:text-3xl">
                                    {stat.value}
                                </p>
                                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300 md:text-[11px]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
