"use client";

import { Scroll } from "@react-three/drei";
import { landing, myWork, aboutMe, contact } from "@/public/content";
import { motion } from "framer-motion";
import React from "react";

const Section = (props: {
  children: React.ReactNode;
  right?: boolean;
}) => {
  return (
    <section
      className={`h-screen w-screen p-8 md:p-20 flex flex-col justify-center ${
        props.right ? "items-end text-right" : "items-start"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 lg:w-1/3 bg-white/30 dark:bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl"
      >
        {props.children}
      </motion.div>
    </section>
  );
};

export default function Overlay() {
  return (
    <Scroll html>
      <div style={{ width: "100%", height: "100%" }}>
      {/* Intro Section */}
      <section className="h-screen w-screen p-8 md:p-20 flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/10 backdrop-blur-sm p-10 rounded-3xl border-l-4 border-blue-500"
        >
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter">
            HELLO
          </h1>
          <p className="mt-4 text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-200">
            {landing.paragraph}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
           animate={{ y: [0, 10, 0] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 font-bold tracking-widest uppercase text-sm"
        >
           Scroll to Explore
        </motion.div>
      </section>

      {/* About Section */}
      <Section right>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
          {aboutMe.h2}
        </h2>
        <p className="text-lg text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
          {aboutMe.firstParagraph}
        </p>
        <div className="mt-6 flex gap-4 justify-end opacity-80">
            {/* Simple decoration or icons could go here */}
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
        </div>
      </Section>

      {/* Work Section */}
      <Section>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          {myWork.h2}
        </h2>
        <div className="space-y-4">
          {myWork.projects.map((p, i) => (
            <div key={p.name} className="group cursor-pointer">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                    {p.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {p.shortDesc}
                </p>
                {i < myWork.projects.length - 1 && <hr className="border-slate-300/50 mt-2" />}
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section right>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
          {contact.h3}
        </h2>
        <div className="flex flex-col gap-6">
          <a
            href={`mailto:${contact.links[0].href}`}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-center hover:scale-105 transition-transform shadow-lg hover:shadow-blue-500/50"
          >
            Say Hello
          </a>
          <div className="flex gap-6 justify-end text-slate-700 dark:text-slate-200">
             <a href="https://github.com/fczajka" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a>
             <a href="https://www.linkedin.com/in/franciszek-czajka/" className="hover:text-blue-700 transition-colors">LinkedIn</a>
          </div>
        </div>
      </Section>
      </div>
    </Scroll>
  );
}
