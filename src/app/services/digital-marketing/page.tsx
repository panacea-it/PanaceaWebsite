import type { Metadata } from "next";
import Link from "next/link";
import { marketingContactHref, marketingGroups, marketingServices } from "@/data/digitalMarketing";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "Search, advertising, brand and content, and marketing automation. Ten digital marketing services, each with a clear scope and a way to talk it through.",
};

export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-500/30">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#0B1536]">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-[0.2em] mb-4">Digital Marketing</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Marketing services <span className="text-[#FFD700]">that match the work</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            Search, ads, content, creative, and follow-up. Pick the service that fits, or start with a conversation and we will tell you where to begin.
          </p>
          <Link
            href={marketingContactHref("digital-marketing")}
            className="px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white font-bold inline-flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25"
          >
            Discuss digital marketing &rarr;
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-16">
          {marketingGroups.map((group) => {
            const services = marketingServices.filter((service) => service.group === group.id);
            return (
              <div key={group.id} id={group.id}>
                <div className="mb-8 max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-black text-[#0B1536] tracking-tight">{group.label}</h2>
                  <p className="text-slate-500 mt-3 leading-relaxed">{group.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <article
                      key={service.slug}
                      className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col"
                    >
                      <span className="text-sm font-black text-blue-500 tracking-widest">{service.number}</span>
                      <h3 className="text-2xl font-black text-slate-900 mt-3">{service.title}</h3>
                      <p className="text-slate-600 mt-2 font-medium">{service.promise}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {service.offerings.map((offering) => (
                          <li
                            key={offering}
                            className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold"
                          >
                            {offering}
                          </li>
                        ))}
                      </ul>
                      {service.note ? (
                        <p className="mt-5 text-sm text-slate-500 leading-relaxed">{service.note}</p>
                      ) : null}
                      <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
                        <Link href={`/services/${service.slug}`} className="text-[#0B1536] hover:text-blue-600">
                          {service.title} overview &rarr;
                        </Link>
                        <Link href={marketingContactHref(service.slug)} className="text-blue-600 hover:text-blue-700">
                          {service.discussLabel} &rarr;
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
