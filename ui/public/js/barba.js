import barba from "/js/barba.mjs";

// View transition stuff
// --- Start ---
barba.init({
  prevent: ({ el }) => el.href && el.href.includes("/guest"),
});

barba.hooks.before(() => {
  window.scrollTo(0, 0);
});

barba.hooks.after(() => {
  const img = document.querySelector("article img");
  if (img) {
    const offset = 300;
    const top = window.scrollY + img.getBoundingClientRect().top - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  document.querySelectorAll(".onload-animation").forEach((section, index) => {
    section.style.animationDelay = `calc(${index + 1} * var(--onload-animation-interval))`;
  });
});
// --- End ---
