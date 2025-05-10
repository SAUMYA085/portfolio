document.addEventListener("DOMContentLoaded", function () {
    const themeButtons = document.querySelectorAll(".theme-option");
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;
    
    // Function to create a lighter shade of the selected color
    function lightenColor(color, percent) {
        let num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            r = (num >> 16) + amt,
            g = (num >> 8 & 0x00FF) + amt,
            b = (num & 0x0000FF) + amt;
        
        return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
    }

    // Function to change theme color
    function changeTheme(color) {
        let lighterShade = lightenColor(color, 25); // 5 shades lighter

        root.style.setProperty("--primary-color", color);
        root.style.setProperty("--background-color", lighterShade);
        root.style.setProperty("--text-color", color);

        localStorage.setItem("themeColor", color);

        // Apply correct mode when changing theme
        if (document.body.classList.contains("dark-mode")) {
            root.style.setProperty("--background-color", "#000000"); // Black background
            root.style.setProperty("--text-color", color); // Text in selected theme color
        }
    }

    // Load saved theme color on page load
    const savedTheme = localStorage.getItem("themeColor") || "#ff4b2b"; // Default color if none
    changeTheme(savedTheme);

    // Apply color change when clicking theme buttons
    themeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedColor = this.getAttribute("data-theme");
            changeTheme(selectedColor);
        });
    });

    // Dark Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            root.style.setProperty("--background-color", "#000000"); // Black background
            root.style.setProperty("--text-color", localStorage.getItem("themeColor")); // Text stays in theme color
            localStorage.setItem("darkMode", "enabled");
        } else {
            changeTheme(localStorage.getItem("themeColor")); // Restore light mode
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // Load Dark Mode setting
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        root.style.setProperty("--background-color", "#000000");
        root.style.setProperty("--text-color", savedTheme);
    }
});
