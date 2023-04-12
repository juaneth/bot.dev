/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {}
    },
    daisyui: {
        themes: [{
            dark: {
                "primary": "#343232",
                "secondary": "#292727",
                "accent": "#343232",
                "neutral": "#272626",
                "base-100": "#151515",
                "info": "#4338ca",
                "success": "#16a34a",
                "warning": "#facc15",
                "error": "#dc2626",
            },
        }, ],
    },
    plugins: [require("daisyui")],
}