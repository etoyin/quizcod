import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#ffffff',
            'bsn-black': '#0f172a',
            'purple': '#3f3cbb',
            'midnight': '#121063',
            'metal': '#565584',
            'tahiti': '#3ab7bf',
            'silver': '#ecebff',
            'bubble-gum': '#ff77e9',
            'bermuda': '#78dcca',
            // 'blue': '#3b82f6',
            'ruby': '#E0115F',
            'blue': '#0198dd',
            'dark-blue': '#02052b',
            'success-bg': '#4ade80',
            'success-txt': '#14532d',
            'danger-bg': '#fb7185',
            'danger-txt': '#881337',
            'orange': '#f57018',
            'green': "#00ff00"
        },
    },

    plugins: [forms],
};
