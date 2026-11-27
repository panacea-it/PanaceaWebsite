"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type RelatedProduct = {
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    alt: string;
    category: string;
};

interface RelatedProductsProps {
    products: RelatedProduct[];
    category: string;
}

export default function RelatedProducts({ products, category }: RelatedProductsProps) {
    if (products.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-white py-24 px-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)]" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="mb-4 inline-block rounded bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
                            More Products
                        </span>
                        <h2 className="text-3xl font-black tracking-tight text-[#0B1536] md:text-5xl">
                            Explore More <span className="text-blue-600">Products</span>
                        </h2>
                        <p className="mt-3 max-w-2xl text-base font-medium text-slate-500">
                            Related platforms from our {category.toLowerCase()} portfolio.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-600 md:self-auto"
                    >
                        View all products
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.slug}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                        >
                            <Link
                                href={`/products/${product.slug}`}
                                className="group block h-full overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
                                        {product.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500">
                                        {product.subtitle}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                                        Explore product
                                        <ArrowUpRight
                                            size={16}
                                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
