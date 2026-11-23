"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Target, Coffee } from "lucide-react";

const jobOpenings = [
    {
        title: "Senior Full Stack Engineer",
        type: "Full-Time",
        location: "Hyderabad, India / Remote",
        experience: "5+ Years",
        department: "Engineering"
    },
    {
        title: "UI/UX Designer",
        type: "Full-Time",
        location: "Bangalore, India",
        experience: "3+ Years",
        department: "Design"
    },
    {
        title: "AWS Cloud Architect",
        type: "Contract",
        location: "Remote (USA/India)",
        experience: "7+ Years",
        department: "Cloud & DevOps"
    },
    {
        title: "Product Marketing Manager",
        type: "Full-Time",
        location: "Remote",
        experience: "4+ Years",
        department: "Marketing"
    }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white pt-24 font-sans selection:bg-blue-500/30">
            {/* Hero Section (Black) */}
            <section className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center mb-10">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}
                />
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full inline-block"
                >
                    Join Our Team
                </motion.div>
                <motion.h1
                    className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                    Build the <span className="text-blue-500">Future</span> With Us
                </motion.h1>
                <motion.p
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    We are looking for passionate builders, designers, and thinkers to help us create innovative digital experiences for the world.
                </motion.p>
            </section>

            {/* Content Sections (White) */}
            <section className="w-full bg-white text-black py-24 rounded-t-[3rem] border-t border-gray-200">
                {/* Culture Section */}
                <div className="max-w-7xl mx-auto px-6 mb-32">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Life at Panacea</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">We foster an environment of continuous learning, autonomy, and impactful work.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Zap size={24} />, title: "Innovation First", desc: "Work with cutting-edge tech stacks and shape industry standards." },
                            { icon: <Coffee size={24} />, title: "Work-Life Harmony", desc: "Flexible hours, remote options, and generous time off policies." },
                            { icon: <Target size={24} />, title: "Impact Driven", desc: "Build products that solve real-world problems for global enterprises." }
                        ].map((perk, i) => (
                            <motion.div
                                key={i}
                                className="bg-[#f8f9fa] p-10 rounded-[2rem] border border-gray-200 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
                                initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                                    {perk.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-3 tracking-tight">{perk.title}</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">{perk.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Open Positions List */}
                <div className="max-w-5xl mx-auto px-6">
                    <motion.h2
                        className="text-4xl md:text-5xl font-black mb-12 text-center tracking-tighter"
                        initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                    >
                        Open Positions
                    </motion.h2>

                    <div className="space-y-6">
                        {jobOpenings.map((job, idx) => (
                            <motion.a
                                key={idx}
                                href={`mailto:contact@panaceaitservices.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                                className="group block bg-[#f8f9fa] border border-gray-200 hover:border-blue-500/50 p-6 md:p-8 rounded-[2rem] transition-all hover:shadow-2xl hover:shadow-blue-500/10"
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <div className="text-xs text-blue-600 font-bold mb-3 uppercase tracking-widest bg-blue-50 inline-block px-3 py-1 rounded-full">{job.department}</div>
                                        <h3 className="text-3xl font-black text-black mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{job.title}</h3>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium">
                                            <span className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm"><Briefcase size={16} className="text-gray-400" /> {job.type}</span>
                                            <span className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm"><MapPin size={16} className="text-gray-400" /> {job.location}</span>
                                            <span className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm"><Clock size={16} className="text-gray-400" /> {job.experience}</span>
                                        </div>
                                    </div>

                                    <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-black group-hover:bg-blue-600 transition-colors shadow-lg shadow-black/20 group-hover:shadow-blue-600/30">
                                        <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
