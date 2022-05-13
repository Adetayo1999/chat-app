module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        button: "0px 2px 12px rgba(74, 106, 149, 0.2)",
        active: "0px 2px 20px rgba(88, 133, 196, 0.1)",
      },
      backgroundImage: {
        auth_overlay: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
        auth_banner: 'url("./assets/img/bg-img.svg")',
        message: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
      },
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [],
};
