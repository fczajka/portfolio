import { toast } from "react-toastify";
import type {
  ContactPayload,
  FormFieldErrors,
  FormValidationProps,
  FormValidationReturn,
} from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFormFields(
  values: FormValidationProps,
): FormFieldErrors {
  const name = values.name.trim();
  const message = values.message.trim();
  const mail = values.mail.trim();
  const errors: FormFieldErrors = {};

  if (!name) {
    errors.senderName = "Please enter your name.";
  }
  if (!mail) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(mail)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!message) {
    errors.message = "Please enter a message.";
  }

  return errors;
}

export function validateForm(
  values: FormValidationProps,
): FormValidationReturn {
  const errors = validateFormFields(values);
  if (Object.keys(errors).length === 0) {
    return {
      status: "success",
      message: "Everything went well!",
    };
  }

  if (!values.name.trim() || !values.message.trim() || !values.mail.trim()) {
    return {
      status: "error",
      message: "Missing form data!",
    };
  }

  return {
    status: "error",
    message: "The email address is incorrect.",
  };
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

export async function sendMail(form: HTMLFormElement | null): Promise<boolean> {
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

  const validatedForm = validateForm({
    name: senderName,
    mail: email,
    message,
  });

  if (validatedForm.status !== "success") {
    toast.error(validatedForm.message);
    return false;
  }

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
      pending: "Sending message!",
      success: "Message sent successfully!",
      error: "Message was not sent!",
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
