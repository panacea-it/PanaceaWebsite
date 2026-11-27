"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ContentSection } from "@/data/companyContent";

const palettes = [
    { circle: "bg-blue-50", bar: "from-blue-500 to-cyan-400" },
    { circle: "bg-emerald-50", bar: "from-emerald-500 to-teal-400" },
    { circle: "bg-amber-50", bar: "from-amber-500 to-orange-400" },
    { circle: "bg-rose-50", bar: "from-rose-500 to-pink-400" },
    { circle: "bg-cyan-50", bar: "from-cyan-500 to-sky-400" },
    { circle: "bg-violet-50", bar: "from-violet-500 to-purple-400" },
    { circle: "bg-indigo-50", bar: "from-indigo-500 to-blue-400" },
    { circle: "bg-teal-50", bar: "from-teal-500 to-emerald-400" },
];

const fallbackEmojis = ["🍽️", "🌐", "☁️", "⚡", "📅", "🔍", "🏷️", "💳", "📱", "⚙️", "⭐", "🔔"];

function featureEmoji(title: string, index: number) {
    const text = title.toLowerCase();

    if (text.includes("sign") || text.includes("login") || text.includes("onboard")) return "🔐";
    if (text.includes("search") || text.includes("filter") || text.includes("discover")) return "🔍";
    if (text.includes("menu") || text.includes("listing") || text.includes("catalog")) return "📋";
    if (text.includes("cart") || text.includes("checkout") || text.includes("order")) return "🛒";
    if (text.includes("payment") || text.includes("billing") || text.includes("commission") || text.includes("payout")) return "💳";
    if (text.includes("track") || text.includes("route") || text.includes("live")) return "📍";
    if (text.includes("rating") || text.includes("review") || text.includes("feedback")) return "⭐";
    if (text.includes("notification") || text.includes("offer") || text.includes("push")) return "🔔";
    if (text.includes("admin") || text.includes("panel") || text.includes("dashboard") || text.includes("manage")) return "⚙️";
    if (text.includes("ai") || text.includes("rag") || text.includes("assistant") || text.includes("automation") || text.includes("predict")) return "✨";
    if (text.includes("analytics") || text.includes("report") || text.includes("insight")) return "📊";
    if (text.includes("booking") || text.includes("schedule") || text.includes("appointment") || text.includes("calendar")) return "📅";
    if (text.includes("security") || text.includes("secure") || text.includes("compliance")) return "🛡️";
    if (text.includes("delivery") || text.includes("fleet") || text.includes("logistics")) return "🚚";
    if (text.includes("school") || text.includes("learning") || text.includes("course")) return "🎓";
    if (text.includes("health") || text.includes("patient") || text.includes("clinic") || text.includes("telemedicine")) return "❤️";
    if (text.includes("social") || text.includes("community") || text.includes("messaging") || text.includes("chat")) return "💬";

    return fallbackEmojis[index % fallbackEmojis.length];
}

export default function ProductFeatures({ section }: { section: ContentSection }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    if (!section.features || section.features.length === 0) return null;

    const titleWords = section.title.trim().split(" ");
    const titleLast = titleWords.length > 1 ? titleWords.pop() : "";
    const titleLead = titleWords.join(" ");

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 110, damping: 16 },
        },
    };

    return (
        <section className="relative overflow-hidden bg-[#eef4ff] py-24 px-6">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.45]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                    maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 55%, transparent 100%)",
                }}
            />
            <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="mb-14 text-center md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 inline-block rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm"
                    >
                        Product Features
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-black tracking-tight text-[#0B1536] md:text-5xl"
                    >
                        {titleLead} {titleLast && <span className="text-blue-600">{titleLast}</span>}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto mt-4 max-w-3xl text-base font-medium text-slate-500 md:text-lg"
                    >
                        {section.description}
                    </motion.p>
                </div>

                <motion.div
                    ref={containerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {section.features.map((feature, index) => {
                        const palette = palettes[index % palettes.length];

                        return (
                            <motion.article
                                key={`${feature.title}-${index}`}
                                variants={itemVariants}
                                className="group relative flex h-full flex-col items-center overflow-hidden rounded-[2rem] border border-slate-100 bg-gradient-to-b from-white to-slate-50/60 px-6 py-10 text-center shadow-[0_14px_45px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-[0_26px_75px_rgba(37,99,235,0.14)]"
                            >
                                <span
                                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${palette.bar} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                    aria-hidden
                                />
                                <div
                                    className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${palette.circle} shadow-inner transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <span className="text-[2rem] leading-none" aria-hidden>
                                        {featureEmoji(feature.title, index)}
                                    </span>
                                </div>
                                <h3 className="text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                                    {feature.desc}
                                </p>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
