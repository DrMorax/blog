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

const savedPalette = localStorage.getItem("palette");
const banner = document.getElementById("heroBanner");
if (savedPalette) {
  root.classList.add(savedPalette);
  banner.src = `/banners/${savedPalette}.jpg`;
} else {
  // Default anemo theme
  root.classList.add("anemo");
  banner.src = "/banners/anemo.jpg";
}

const paletteItems = document.querySelectorAll(".palettes li");
const paletteClasses = [
  "anemo",
  "geo",
  "electro",
  "dendro",
  "hydro",
  "pyro",
  "cryo",
];

paletteItems.forEach((item) => {
  item.addEventListener("click", () => {
    const paletteValue = item.textContent.toLowerCase().trim();
    paletteClasses.forEach((paletteClass) => {
      root.classList.remove(paletteClass);
    });
    root.classList.add(paletteValue);
    banner.src = `/banners/${paletteValue}.jpg`;
    localStorage.setItem("palette", paletteValue);
  });
});
// --- End ---
