"use client";

import { contact } from "@/public/content";
import { lilitaOne } from "@/public/fonts";
import useElementOnScreen from "@/public/hooks/useElementOnScreen";
import React from "react";
import SectionWrapper from "../UI/SectionWrapper";
import Form from "./Form";
import Links from "./Links";

export default function Contact() {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
    });
    const { h3, links, form, button } = contact;
    return (
        <SectionWrapper id="contact-me">
            <div ref={containerRef} className="mx-auto max-w-7xl">
                <div className="w-full lg:w-1/2">
                    <h3
                        className={`text-center text-2xl ${
                            lilitaOne.variable
                        } font-lilita-one opacity-0 ${
                            isVisible ? "animate-show-down-up" : ""
                        } motion-reduce:animate-none motion-reduce:opacity-100 top-0 sm:text-3xl lg:text-4xl`}
                    >
                        {h3}
                    </h3>
                </div>
                <div className="flex flex-col pt-20 lg:flex-row">
                    <Form form={form} button={button} isVisible={isVisible} />
                    <Links links={links} isVisible={isVisible} />
                </div>
            </div>
        </SectionWrapper>
    );
}
