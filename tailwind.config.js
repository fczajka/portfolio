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
            boxShadow: {
                "mobile-navbar": "0 -5px 6px 0px rgb(228, 228, 231, 1)",
            },
            fontFamily: {
                "lilita-one": ["var(--font-lilita-one)", ...fontFamily.sans],
                "source-sans-pro": [
                    "var(--font-source-sans-pro)",
                    ...fontFamily.sans,
                ],
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
