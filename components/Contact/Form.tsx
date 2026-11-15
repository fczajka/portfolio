"use client";

import useElementOnScreen from "@/hooks/useElementOnScreen";
import type { FormFieldErrors, FormFieldName, FormProps } from "@/types";
import React, { type MutableRefObject, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendMail, validateFormFields } from "@/helpers/helpers";
import Fields from "./Fields";

const FIELD_ORDER: FormFieldName[] = ["senderName", "email", "message"];

export default function Form({ form, button }: FormProps) {
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  });

  const handleClearError = (field: FormFieldName) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formEl = formRef.current;
    if (!formEl) return;

    const getValue = (fieldName: FormFieldName): string => {
      const element = formEl.elements.namedItem(fieldName) as
        HTMLInputElement | HTMLTextAreaElement | null;
      return element?.value ?? "";
    };

    const nextErrors = validateFormFields({
      name: getValue("senderName"),
      mail: getValue("email"),
      message: getValue("message"),
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidField = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalidField) {
        const message = nextErrors[firstInvalidField];
        if (message) toast.error(message);
        const element = formEl.elements.namedItem(
          firstInvalidField,
        ) as HTMLElement | null;
        element?.focus();
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await sendMail(formEl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="basis-full sm:px-32 md:px-44 lg:px-24">
      <form
        noValidate
        onSubmit={handleForm}
        ref={formRef}
        className="flex flex-col relative"
      >
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0 pointer-events-none"
        />
        <Fields
          form={form}
          isVisible={isVisible}
          errors={errors}
          onClearError={handleClearError}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          aria-label={isSubmitting ? "Sending message" : "Submit form"}
          className={`bg-primary-200 rounded-xl my-6 p-4 font-headline opacity-0 tracking-wider text-lg transition-all duration-300 ${
            isVisible ? "animate-show-down-up" : ""
          } [animation-delay:0.8s] dark:bg-dark-secondary-bg dark:hover:bg-dark-tertiary-bg dark:focus:bg-dark-tertiary-bg dark:focus:ring-2 dark:focus:ring-zinc-500 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none hover:bg-primary-300 focus:bg-primary-300 disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? "Sending..." : button.text}
        </button>
      </form>
      <ToastContainer
        autoClose={1800}
        hideProgressBar
        newestOnTop
        closeButton={false}
        position="bottom-center"
        toastClassName={() =>
          "relative flex items-center bg-primary-200 text-xs leading-relaxed sm:text-base min-[400px]:text-sm text-zinc-900 p-4 mb-4 cursor-pointer dark:bg-dark-secondary-bg dark:border-b-[1px] dark:border-zinc-500 dark:text-zinc-200 min-[481px]:dark:shadow-none min-[481px]:rounded-xl min-[481px]:shadow-custom min-[481px]:shadow-zinc-400 min-[481px]:dark:border-2 min-[481px]:dark:border-zinc-500 last:mb-12 last:min-[400px]:mb-16 lg:last:mb-4"
        }
      />
    </div>
  );
}
