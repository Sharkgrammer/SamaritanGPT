module.exports = {
    content: ["./index.html', './src/**/*.{vue,js,ts,jsx,tsx}"],
    purge: false,
    theme: {
        extend: {
            colors: {
                background: '#ffffff',
                accent: '#ff0023',
                accentFaded: '#ff002333',
            },
            animation: {
                'fade': 'fade 700ms ease-in-out infinite',
                'gentle-fade': 'fade 2100ms ease-in-out infinite',
                'fade-in': 'fadeIn 1s',
                'fade-out': 'fadeOut 1s'
            },
            keyframes: {
                fade: {
                    '0%, 100%': {opacity: '0.5'},
                    '50%': {opacity: '1'},
                },
                fadeIn: {
                    '0%': {opacity: '0'},
                    '100%': {opacity: '1'},
                },
                fadeOut: {
                    '1000%': {opacity: '0'},
                    '0%': {opacity: '1'},
                },
            },
        },
    },
    plugins: [],
};
