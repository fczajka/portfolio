"use client";

import { Scroll } from "@react-three/drei";
import { landing, myWork, aboutMe, contact } from "@/public/content";
import React from "react";

const Section = (props: {
  children: React.ReactNode;
  right?: boolean;
  opacity?: number;
}) => {
  return (
    <section
      className={`h-screen w-screen p-8 md:p-20 flex flex-col justify-center ${
        props.right ? "items-end text-right" : "items-start"
      }`}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        {props.children}
      </div>
    </section>
  );
};

export default function Overlay() {
  return (
    <Scroll html style={{ width: "100%", height: "100%" }}>
      {/* Intro Section */}
      <Section>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white">
          Hello
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-slate-700 dark:text-slate-200">
          {landing.paragraph}
        </p>
      </Section>

      {/* About Section */}
      <Section right>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          {aboutMe.h2}
        </h2>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-200">
          {aboutMe.firstParagraph}
        </p>
        <p className="mt-4 text-sm text-slate-500 italic">
          (Scroll to see what I cook!)
        </p>
      </Section>

      {/* Work Section */}
      <Section>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          {myWork.h2}
        </h2>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-200">
          {myWork.desc}
        </p>
        <ul className="mt-4 space-y-2">
          {myWork.projects.map((p) => (
            <li key={p.name} className="font-semibold text-slate-800 dark:text-slate-100">
              • {p.name}
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact Section */}
      <Section right>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          {contact.h3}
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          <a
            href={`mailto:${contact.links[0].href}`}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-colors text-center"
          >
            Send Email
          </a>
          <div className="flex gap-4 justify-end">
             {/* Icons could go here, but kept simple for now */}
             <a href="https://github.com/fczajka" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">GitHub</a>
             <a href="https://www.linkedin.com/in/franciszek-czajka/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">LinkedIn</a>
          </div>
        </div>
      </Section>
    </Scroll>
  );
}
