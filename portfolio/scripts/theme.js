document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const styleSwitcher = document.getElementById("style-switcher");

    // Apply saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Toggle Dark/Light Mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // Color Theme Switching
    styleSwitcher.addEventListener("click", () => {
        const themes = ["default", "blue", "green", "purple", "yellow"];
        let currentTheme = localStorage.getItem("color-theme") || "default";
        let nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("color-theme", nextTheme);
    });

    // Apply saved color theme
    if (localStorage.getItem("color-theme")) {
        document.documentElement.setAttribute("data-theme", localStorage.getItem("color-theme"));
    }
});
