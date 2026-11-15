"use client";

import { contact } from "@/data/content";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import Form from "./Form";
import Links from "./Links";

export default function Contact() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });
  const { h3, links, form, button } = contact;
  return (
    <section id="contact-me">
      <div className="mx-auto max-w-section">
        <div className="w-full lg:w-1/2">
          <h3
            ref={containerRef}
            className={`text-center font-headline opacity-0 ${
              isVisible ? "animate-show-down-up" : ""
            } motion-reduce:animate-none motion-reduce:opacity-100 top-0`}
          >
            {h3}
          </h3>
        </div>
        <div className="flex flex-col mt-8 lg:mt-20 lg:flex-row">
          <Form form={form} button={button} />
          <Links links={links} />
        </div>
      </div>
    </section>
  );
}
