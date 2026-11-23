"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Contact from "@/components/Contact";

const DETAILS = [
  {
    label: "Call us",
    value: "+91 9347959536",
    href: "tel:+919347959536",
    Icon: Phone,
  },
  {
    label: "Email",
    value: "contact@panaceaitservices.com",
    href: "mailto:contact@panaceaitservices.com",
    Icon: Mail,
  },
  {
    label: "Studio",
    value: "Madhapur, Hyderabad, India and USA",
    href: "https://maps.google.com/?q=Panacea+IT+Services+Pvt+Ltd+Madhapur",
    Icon: MapPin,
  },
] as const;

const SOCIALS = [
  {
    label: "Follow Panacea on Facebook",
    href: "https://www.facebook.com/people/Panacea-Itservices/pfbid02xyrubFZ9aJzH3pyxSHRhyMoUXDVmGXJWnU3uKffcqQT7Vk5gGH8t99QrE1NqobY2l/",
    Icon: Facebook,
  },
  {
    label: "Follow Panacea on Instagram",
    href: "https://www.instagram.com/panaceaitservices/?hl=en",
    Icon: Instagram,
  },
  {
    label: "Connect with Panacea on LinkedIn",
    href: "https://www.linkedin.com/company/107517525/",
    Icon: Linkedin,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-[#f4f9ff]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 12% 0%, rgba(184,220,245,0.7), transparent 70%), radial-gradient(ellipse 40% 50% at 90% 10%, rgba(220,238,255,0.9), transparent 68%)",
        }}
      />

      <section className="relative mx-auto w-full max-w-6xl px-5 pb-8 pt-32 sm:px-6">
        <motion.header
          className="mx-auto mb-10 max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#367db5]">
            Contact
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0c2033] sm:text-5xl md:text-6xl">
            Let&apos;s build something
            <span className="block text-[#367db5]">extraordinary together</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#58738a] sm:text-lg">
            Tell us what you want to launch. We design, build, and market digital products from Hyderabad and the USA.
          </p>
        </motion.header>

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <motion.article
            className="flex h-full flex-col rounded-[28px] border border-white/80 bg-white/80 p-7 shadow-[0_18px_40px_rgba(54,125,181,0.12)] backdrop-blur-md sm:p-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h2 className="text-2xl font-bold tracking-tight text-[#0c2033]">Talk to the studio</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#58738a]">
              Call, email, or send the form. We reply within one business day.
            </p>

            <ul className="mt-7 space-y-4">
              {DETAILS.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-4 rounded-2xl border border-[#d7e8f6] bg-[#f7fbff] px-4 py-3.5 transition hover:border-[#8fc4e8] hover:bg-white"
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e7f3fc] text-[#367db5]">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#7b93a8]">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-[15px] font-semibold text-[#0c2033]">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex gap-3 pt-7">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#d7e8f6] bg-white text-[#367db5] transition hover:border-[#4a8fc4] hover:bg-[#e7f3fc]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.article>

          <motion.div
            className="min-h-[420px] overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_18px_40px_rgba(54,125,181,0.12)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            <iframe
              title="Panacea IT Services on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8272226612346!2d78.38157547516346!3d17.42008808347494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f5ada2ad11%3A0x89047701198f1f5!2sPanacea%20IT%20Services%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="h-full min-h-[420px] w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
