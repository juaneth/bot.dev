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
                "secondary": "#171515",
                "accent": "#343232",
                "neutral": "#272626",
                "base-100": "#0d0c0c",
                "info": "#4338ca",
                "success": "#1f8e48",
                "warning": "#facc15",
                "error": "#dc2626",
            },
        }, ],
    },
    plugins: [require("daisyui")],
}