"use client";

import { contact } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import React from "react";
import Form from "./Form";
import Links from "./Links";

export default function Contact() {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    });
    const { h3, links, form, button } = contact;
    return (
        <section id="contact-me">
            <div className="mx-auto max-w-section">
                <div className="w-full lg:w-1/2">
                    <h3
                        ref={containerRef}
                        className={`text-center ${
                            lilitaOne.variable
                        } font-lilita-one opacity-0 ${
                            isVisible ? "animate-show-down-up" : ""
                        } motion-reduce:animate-none motion-reduce:opacity-100 top-0`}
                    >
                        {h3}
                    </h3>
                </div>
                <div className="flex flex-col pt-20 lg:flex-row">
                    <Form form={form} button={button} />
                    <Links links={links} />
                </div>
            </div>
        </section>
    );
}
