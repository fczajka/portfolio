import emailjs from "@emailjs/browser";
import { MutableRefObject } from "react";
import { toast } from "react-toastify";
import {
    FormValidationProps,
    FormValidationReturn,
    SetStateActionBoolean,
} from "@/public/types";

export function validateForm(
    values: FormValidationProps
): FormValidationReturn {
    let { name, message, mail } = values;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    name = name.trim();
    message = message.trim();
    mail = mail.trim();

    if (!name) {
        return {
            status: "error",
            message: "Missing form data!",
        };
    }
    if (!message) {
        return {
            status: "error",
            message: "Missing form data!",
        };
    }
    if (!mail) {
        return {
            status: "error",
            message: "Missing form data!",
        };
    }
    if (!emailPattern.test(mail)) {
        return {
            status: "error",
            message: "The email address is incorrect.",
        };
    }

    return {
        status: "success",
        message: "Everything went well!",
    };
}

export function sendMail(
    e: React.FormEvent<HTMLFormElement>,
    form: HTMLFormElement | null
) {
    if (form) {
        const validatedForm = validateForm({
            name: form.senderName.value,
            mail: form.email.value,
            message: form.message.value,
        });
        if (validatedForm) {
            if (validatedForm.status === "success") {
                sender(e, form);
            } else if (validatedForm.status === "error") {
                toast.error(validatedForm.message);
            }
        }
    }
}

export function sender(
    e: React.FormEvent<HTMLFormElement>,
    form: HTMLFormElement | null
) {
    if (form) {
        if (!process.env.SERVICE_ID) {
            toast.error("Something went wrong!");
            return;
        }
        if (!process.env.TEMPLATE_ID) {
            toast.error("Something went wrong!");
            return;
        }
        if (!process.env.PUBLIC_KEY) {
            toast.error("Something went wrong!");
            return;
        }
        const sendMail = emailjs
            .sendForm(
                process.env.SERVICE_ID,
                process.env.TEMPLATE_ID,
                form,
                process.env.PUBLIC_KEY
            )
            .then(() => {
                (e.target as HTMLFormElement).reset();
            });
        toast.promise(sendMail, {
            pending: "Sending message!",
            success: "Message sent successfully!",
            error: "Message was not sent!",
        });
    }
}

export function closeDetailsOnESC(
    event: KeyboardEvent,
    setIsOpen: SetStateActionBoolean,
    isOpen: boolean
) {
    if (event.key === "Escape") {
        setIsOpen(!isOpen);
    }
}

export function closeDetailsOnClick(
    event: MouseEvent,
    setIsOpen: SetStateActionBoolean,
    isOpen: boolean,
    elRef: MutableRefObject<HTMLDivElement | null>
) {
    if (elRef.current && !elRef.current.contains(event.target as Node)) {
        setIsOpen(!isOpen);
    }
}
