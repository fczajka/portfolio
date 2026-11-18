import type {
  FormFieldErrors,
  FormValidationProps,
  FormValidationReturn,
  Locale,
} from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = {
  senderName: 120,
  email: 254,
  message: 4000,
} as const;

const VALIDATION_MESSAGES: Record<
  Locale,
  {
    nameRequired: string;
    nameMax: (limit: number) => string;
    emailRequired: string;
    emailMax: (limit: number) => string;
    emailInvalid: string;
    messageRequired: string;
    messageMax: (limit: number) => string;
    formSuccess: string;
    formMissing: string;
    formInvalidEmail: string;
  }
> = {
  en: {
    nameRequired: "Please enter your name.",
    nameMax: (limit) => `Name must be ${limit} characters or fewer.`,
    emailRequired: "Please enter your email address.",
    emailMax: (limit) => `Email must be ${limit} characters or fewer.`,
    emailInvalid: "Please enter a valid email address.",
    messageRequired: "Please enter a message.",
    messageMax: (limit) => `Message must be ${limit} characters or fewer.`,
    formSuccess: "Everything went well!",
    formMissing: "Missing form data!",
    formInvalidEmail: "The email address is incorrect.",
  },
  pl: {
    nameRequired: "Proszę podać swoje imię.",
    nameMax: (limit) => `Imię może mieć maksymalnie ${limit} znaków.`,
    emailRequired: "Proszę podać adres e-mail.",
    emailMax: (limit) => `Adres e-mail może mieć maksymalnie ${limit} znaków.`,
    emailInvalid: "Proszę podać poprawny adres e-mail.",
    messageRequired: "Proszę wpisać wiadomość.",
    messageMax: (limit) => `Wiadomość może mieć maksymalnie ${limit} znaków.`,
    formSuccess: "Wszystko się udało!",
    formMissing: "Brakuje danych w formularzu!",
    formInvalidEmail: "Adres e-mail jest nieprawidłowy.",
  },
};

export function validateFormFields(
  values: FormValidationProps,
  locale: Locale = "en",
): FormFieldErrors {
  const messages = VALIDATION_MESSAGES[locale];
  const name = values.name.trim();
  const message = values.message.trim();
  const mail = values.mail.trim();
  const errors: FormFieldErrors = {};

  if (!name) {
    errors.senderName = messages.nameRequired;
  } else if (name.length > CONTACT_LIMITS.senderName) {
    errors.senderName = messages.nameMax(CONTACT_LIMITS.senderName);
  }

  if (!mail) {
    errors.email = messages.emailRequired;
  } else if (mail.length > CONTACT_LIMITS.email) {
    errors.email = messages.emailMax(CONTACT_LIMITS.email);
  } else if (!EMAIL_PATTERN.test(mail)) {
    errors.email = messages.emailInvalid;
  }

  if (!message) {
    errors.message = messages.messageRequired;
  } else if (message.length > CONTACT_LIMITS.message) {
    errors.message = messages.messageMax(CONTACT_LIMITS.message);
  }

  return errors;
}

export function validateForm(
  values: FormValidationProps,
  locale: Locale = "en",
): FormValidationReturn {
  const messages = VALIDATION_MESSAGES[locale];
  const errors = validateFormFields(values, locale);
  if (Object.keys(errors).length === 0) {
    return {
      status: "success",
      message: messages.formSuccess,
    };
  }

  if (!values.name.trim() || !values.message.trim() || !values.mail.trim()) {
    return {
      status: "error",
      message: messages.formMissing,
    };
  }

  return {
    status: "error",
    message: messages.formInvalidEmail,
  };
}
