// Theme stuff 
// --- Start ---
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark");
}

document.getElementById("themeToggler")?.addEventListener("click", () => {
const isDark = document.body.classList.toggle("dark");
localStorage.setItem("theme", isDark ? "dark" : "light");
});
// --- End ---