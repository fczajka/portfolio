const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                "fade-in": "0.3s ease-in-out 1 both fade-in",
                jump: "15s ease-in-out infinite jump",
                line: "0.8s ease-in-out 1 both line",
                photo: "1s ease-out 1 both photo",
                "show-menu-mobile": "0.7s ease-in-out 1 show-menu-mobile",
                "show-menu-desktop": "0.7s ease-in-out 1 show-menu-desktop",
                "show-up-down": "0.3s ease-out 1 both show-up-down",
                "show-down-up": "0.3s ease-out 1 both show-down-up",
                "show-project-details":
                    "0.3s ease-in-out 0.3s 1 both show-up-project-details",
                "slide-in-left": "0.3s ease-in-out 1 both slide-in-left",
                "slide-in-right": "0.3s ease-in-out 1 both slide-in-right",
                "slide-in-bar": "0.3s ease-in-out 1 both slide-in-bar",
            },
            borderRadius: {
                primary: "1.5rem",
            },
            boxShadow: {
                "mobile-navbar": "0 -5px 6px 0px rgb(228, 228, 231, 1)",
                custom: "0px 2px 6px 0px rgba(148, 163, 184, 1);",
            },
            colors: {
                "primary-50": "#eff6ff",
                "primary-75": "#e5f0ff",
                "primary-100": "#dbeafe",
                "primary-200": "#bfdbfe",
                "primary-300": "#93c5fd",
                "primary-400": "#60a5fa",
                "primary-500": "#3b82f6",
                "primary-600": "#2563eb",
                "primary-700": "#1d4ed8",
                "primary-800": "#1e40af",
                "primary-900": "#1e3a8a",
                "primary-950": "#172554",
            },
            fontFamily: {
                headline: ["var(--font-headline)", ...fontFamily.sans],
                default: ["var(--font-default)", ...fontFamily.sans],
            },
            height: {
                88: "22rem",
            },
            keyframes: {
                "fade-in": {
                    "0%": {
                        opacity: 0,
                    },
                    "100%": {
                        opacity: 1,
                    },
                },
                jump: {
                    "0%": {
                        translate: "0px 0px",
                        color: "black",
                    },
                    "2.5%": {
                        translate: "0px -10px",
                        color: "#94a3b8",
                    },
                    "5%": {
                        translate: "0px 0px",
                        color: "black",
                    },
                    "7.5%": {
                        translate: "0px -10px",
                        color: "#94a3b8",
                    },
                    "10%": {
                        translate: "0px 0px",
                        color: "black",
                    },
                    "100%": {
                        translate: "0px 0px",
                    },
                },
                line: {
                    "0%": {
                        opacity: 1,
                        transform: "scale(1, 0)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "scale(1, 1)",
                    },
                },
                photo: {
                    "0%": {
                        opacity: 0,
                        translate: "0px -100%",
                        transform: "scale(0.9, 1.1)",
                    },
                    "20%": {
                        transform: "scale(1, 1)",
                    },
                    "25%": {
                        translate: "0px 100px",
                        transform: "scale(1.2, 0.8)",
                    },
                    "50%": {
                        opacity: 1,
                        translate: "0px -50px",
                        transform: "scale(0.95, 1.15)",
                    },
                    "75%": {
                        translate: "0px 10px",
                        transform: "scale(1.02, 0.98)",
                    },
                    "100%": {
                        opacity: 1,
                        translate: "0px 0px",
                        transform: "scale(1, 1)",
                    },
                },
                "show-menu-desktop": {
                    from: {
                        clipPath: "circle(50px at 76px 10px);",
                    },
                    to: {
                        clipPath: "circle(2560px at 50% 50%);",
                    },
                },
                "show-menu-mobile": {
                    from: {
                        clipPath: "circle(50px at 95% 100%);",
                    },
                    to: {
                        clipPath: "circle(1000px at 50% 50%);",
                    },
                },
                "show-down-up": {
                    "0%": {
                        opacity: 0,
                        translate: "0px 4px",
                    },
                    "100%": {
                        opacity: 1,
                        translate: "0px 0px",
                    },
                },
                "show-up-down": {
                    "0%": {
                        opacity: 0,
                        translate: "0px -4px",
                    },
                    "100%": {
                        opacity: 1,
                        translate: "0px 0px",
                    },
                },
                "show-up-project-details": {
                    "0%": {
                        opacity: 0,
                    },
                    "100%": {
                        opacity: 1,
                    },
                },
                "slide-in-right": {
                    "0%": {
                        opacity: 0,
                        translate: "100px 0px",
                    },
                    "60%": {
                        opacity: 0.6,
                        translate: "-10px 0px",
                    },
                    "100%": {
                        opacity: 1,
                        translate: "0px 0px",
                    },
                },
                "slide-in-left": {
                    "0%": {
                        opacity: 0,
                        translate: "-100px 0px",
                    },
                    "60%": {
                        opacity: 0.6,
                        translate: "10px 0px",
                    },
                    "100%": {
                        opacity: 1,
                        translate: "0px 0px",
                    },
                },
                "slide-in-bar": {
                    "0%": {
                        opacity: 0,
                        transform: "scale(3)",
                        translate: "300px 0px",
                    },
                    "60%": {
                        opacity: 0.6,
                        transform: "scale(1)",
                        translate: "-30px 0px",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "scale(1)",
                        translate: "0px 0px",
                    },
                },
                text: {
                    "0%": {
                        opacity: 0,
                        translate: "0px 10px",
                    },
                    "100%": {
                        opacity: 1,
                        translate: "0px 0px",
                    },
                },
            },
            maxHeight: {
                112: "28rem",
                128: "32rem",
                "1.5xl": "39rem",
                "3xl": "48rem",
            },
            maxWidth: {
                section: "80rem",
                1920: "1920px",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
