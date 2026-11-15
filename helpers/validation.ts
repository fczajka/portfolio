import type {
  FormFieldErrors,
  FormValidationProps,
  FormValidationReturn,
} from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = {
  senderName: 120,
  email: 254,
  message: 4000,
} as const;

export function validateFormFields(
  values: FormValidationProps,
): FormFieldErrors {
  const name = values.name.trim();
  const message = values.message.trim();
  const mail = values.mail.trim();
  const errors: FormFieldErrors = {};

  if (!name) {
    errors.senderName = "Please enter your name.";
  } else if (name.length > CONTACT_LIMITS.senderName) {
    errors.senderName = `Name must be ${CONTACT_LIMITS.senderName} characters or fewer.`;
  }

  if (!mail) {
    errors.email = "Please enter your email address.";
  } else if (mail.length > CONTACT_LIMITS.email) {
    errors.email = `Email must be ${CONTACT_LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(mail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length > CONTACT_LIMITS.message) {
    errors.message = `Message must be ${CONTACT_LIMITS.message} characters or fewer.`;
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
