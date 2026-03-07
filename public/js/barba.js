import barba from "/js/barba.mjs";

// View transition stuff
// --- Start ---
barba.init();

let transitioning = false;

barba.hooks.before(() => {
  if (transitioning) return;
  window.scrollTo(0, 0);
  transitioning = true;
});

barba.hooks.after(() => {
  transitioning = false;

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
