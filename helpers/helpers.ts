import type { StaticImageData } from "next/image";
import { toast } from "react-toastify";
import type { ContactPayload, Locale } from "@/types";
import { getUiCopy } from "@/data/content";
import { toProjectSlug } from "./projects";
import { CONTACT_LIMITS, validateForm, validateFormFields } from "./validation";

export { CONTACT_LIMITS, toProjectSlug, validateForm, validateFormFields };

/** Returns a stable React key for static image imports in both Next.js and Vitest. */
export function getStaticImageKey(
  image: StaticImageData | string,
  fallback: string,
): string {
  return typeof image === "string" ? image : image.src || fallback;
}

export async function submitContactRequest(
  payload: ContactPayload,
): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error ?? "Message was not sent!");
  }
}

export async function sendMail(
  form: HTMLFormElement | null,
  locale: Locale = "en",
): Promise<boolean> {
  if (!form) return false;

  const senderName =
    (form.elements.namedItem("senderName") as HTMLInputElement | null)?.value ??
    "";
  const email =
    (form.elements.namedItem("email") as HTMLInputElement | null)?.value ?? "";
  const message =
    (form.elements.namedItem("message") as HTMLTextAreaElement | null)?.value ??
    "";
  const company =
    (form.elements.namedItem("company") as HTMLInputElement | null)?.value ??
    "";

  const validatedForm = validateForm(
    {
      name: senderName,
      mail: email,
      message,
    },
    locale,
  );

  if (validatedForm.status !== "success") {
    toast.error(validatedForm.message);
    return false;
  }

  const toastCopy = getUiCopy(locale).contactForm;

  const sendPromise = submitContactRequest({
    senderName,
    email,
    message,
    company,
  }).then(() => {
    form.reset();
  });

  try {
    await toast.promise(sendPromise, {
      pending: toastCopy.toastPending,
      success: toastCopy.toastSuccess,
      error: {
        render({ data }) {
          return data instanceof Error && data.message
            ? data.message
            : toastCopy.toastErrorFallback;
        },
      },
    });
    return true;
  } catch {
    return false;
  }
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback to execCommand when clipboard permissions fail in insecure contexts.
    }
  }

  if (typeof document === "undefined") return false;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
  return copied;
}
