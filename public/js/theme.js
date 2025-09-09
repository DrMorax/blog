// Theme stuff 
// --- Start ---
const root = document.documentElement; 
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    root.classList.add(savedTheme);
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }
  }

  document.getElementById("themeToggler")?.addEventListener("click", () => {
    if (root.classList.contains("light")) {
      root.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
    }
  });
// --- End ---