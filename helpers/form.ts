import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FormValidationProps, FormValidationReturn } from "../public/types";

export function validateForm(values: FormValidationProps) {
    let { name, message, mail } = values;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name && message && mail) {
        name = name.trim();
        message = message.trim();
        mail = mail.trim();
        if (name && message && mail) {
            if (emailPattern.test(mail)) {
                return [
                    "success",
                    { message: "Everything went well!" },
                ] as FormValidationReturn;
            } else {
                return [
                    "error",
                    { message: "The email address is incorrect." },
                ] as FormValidationReturn;
            }
        } else {
            return [
                "error",
                { message: "The form is missing required data." },
            ] as FormValidationReturn;
        }
    } else {
        return [
            "error",
            { message: "The form is missing required data." },
        ] as FormValidationReturn;
    }
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
            if (validatedForm[0] === "success") {
                sender(e, form);
            } else if (validatedForm[0] === "error") {
                toast.error(validatedForm[1].message);
            }
        }
    }
}

export function sender(
    e: React.FormEvent<HTMLFormElement>,
    form: HTMLFormElement | null
) {
    if (form) {
        if (
            process.env.SERVICE_ID &&
            process.env.TEMPLATE_ID &&
            process.env.TEMPLATE_ID
        ) {
            const sendMail = emailjs
                .sendForm(
                    process.env.SERVICE_ID,
                    process.env.TEMPLATE_ID,
                    form,
                    process.env.PUBLIC_KEY
                )
                .then(
                    () => {
                        (e.target as HTMLFormElement).reset();
                    },
                    () => {}
                );
            toast.promise(sendMail, {
                pending: "Sending message!",
                success: "Message sent successfully!",
                error: "Message was not sent!",
            });
        }
    }
}