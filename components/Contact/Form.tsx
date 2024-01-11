"use client";

import { headlineFont } from "@/public/fonts";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import { FormProps } from "@/public/types";
import React, { MutableRefObject, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendMail } from "@/helpers/helpers";
import Fields from "./Fields";

export default function Form({ form, button }: FormProps) {
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  });

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMail(e, formRef.current);
  };

  return (
    <div ref={containerRef} className="basis-full sm:px-32 md:px-44 lg:px-24">
      <form
        action="post"
        onSubmit={handleForm}
        ref={formRef}
        className="flex flex-col"
      >
        <Fields form={form} isVisible={isVisible} />
        <button
          type="submit"
          aria-label="Submit form"
          className={`bg-primary-200 rounded-xl my-6 p-4 ${
            headlineFont.variable
          } font-headline opacity-0 tracking-wider text-lg transition-all duration-300 shadow-zinc-400 shadow-custom ${
            isVisible && "animate-show-down-up"
          } [animation-delay:0.8s] dark:bg-dark-secondary-bg dark:hover:bg-dark-tertiary-bg dark:focus:bg-dark-tertiary-bg dark:shadow-none dark:focus:ring-2 dark:focus:ring-zinc-500 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none hover:bg-primary-300 focus:bg-primary-300`}
        >
          {button.text}
        </button>
      </form>
      <ToastContainer
        autoClose={1800}
        hideProgressBar
        newestOnTop
        closeButton={false}
        position="bottom-center"
        toastClassName={() =>
          "bg-primary-200 text-xs leading-relaxed sm:text-base min-[400px]:text-sm text-zinc-900 p-4 mb-4 cursor-pointer dark:bg-dark-secondary-bg dark:border-b-[1px] dark:border-zinc-500 dark:text-zinc-200 min-[481px]:dark:shadow-none min-[481px]:rounded-xl min-[481px]:shadow-custom min-[481px]:shadow-zinc-400 min-[481px]:dark:border-2 min-[481px]:dark:border-zinc-500 last:mb-12 last:min-[400px]:mb-16 lg:last:mb-4"
        }
        bodyClassName={() => "flex"}
      />
    </div>
  );
}
