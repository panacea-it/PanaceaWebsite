"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, MonitorSmartphone, Users, CheckCircle, ArrowRight } from "lucide-react";

const resourcesData = [
    {
        category: "Mobile App Developers",
        desc: "Hire dedicated mobile app developers to build native or cross-platform applications.",
        icon: <Smartphone size={32} className="text-blue-500" />,
        skills: ["iOS (Swift/Objective-C)", "Android (Kotlin/Java)", "React Native", "Flutter"]
    },
    {
        category: "Web App Developers",
        desc: "Full-stack developers for scalable, secure, and high-performance web applications.",
        icon: <MonitorSmartphone size={32} className="text-blue-500" />,
        skills: ["React & Next.js", "Node.js & Express", "Python & Django", "Angular & Vue"]
    }
];

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white pt-24 font-sans selection:bg-teal-500/30">
            {/* Hero Section (Black) */}
            <section className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center mb-10">
                <motion.div
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full">
                        Engineering Experts
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">
                        Hire Top <span className="text-teal-500">Talent</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Scale your engineering teams rapidly with our pre-vetted, highly skilled IT professionals. Flexible hiring models tailored to your project.
                    </p>
                </motion.div>
            </section>

            {/* Resources Grid (White Section) */}
            <section className="w-full bg-white text-black py-24 rounded-t-[3rem] border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resourcesData.map((resource, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative bg-[#f8f9fa] border border-gray-200 rounded-[2.5rem] p-10 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-500"
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 group-hover:scale-110 transition-transform duration-500 shrink-0">
                                    {resource.icon}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-black mb-4 tracking-tight">{resource.category}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed mb-8">
                                        {resource.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-10 bg-white p-6 rounded-2xl border border-gray-100">
                                {resource.skills.map((skill, sIdx) => (
                                    <div key={sIdx} className="flex items-center gap-3 text-gray-700 font-medium">
                                        <CheckCircle size={18} className="text-teal-500 shrink-0" />
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>

                            <a href="/contact" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-teal-500 transition-colors shadow-xl">
                                Hire Now <ArrowRight size={18} />
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Feature Strip (Inside White) */}
                <div className="max-w-7xl mx-auto px-6 mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <motion.div className="p-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <h4 className="text-5xl font-black text-teal-600 mb-2">24h</h4>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Onboarding Time</p>
                        </motion.div>
                        <motion.div className="p-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <h4 className="text-5xl font-black text-teal-600 mb-2">Top 1%</h4>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Pre-vetted Developers</p>
                        </motion.div>
                        <motion.div className="p-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <h4 className="text-5xl font-black text-teal-600 mb-2">0</h4>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Hidden Recruitment Costs</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
