import barba from "/js/barba.mjs";
import { initGuestbook } from "./guestbook.js";

// View transition stuff
// --- Start ---
barba.hooks.afterEnter(({ next }) => {
  initGuestbook(next.container);
  const path = next.url.path.replace(/\/$/, "");
  document.querySelectorAll("nav a.link").forEach((link) => {
    link.classList.toggle("active", link.pathname.replace(/\/$/, "") === path);
  });
});

barba.hooks.before(() => {
  window.scrollTo(0, 0);
});

barba.hooks.after(() => {
  // const img = document.querySelector("article img");
  // if (img) {
  //   const offset = 300;
  //   const top = window.scrollY + img.getBoundingClientRect().top - offset;
  //   window.scrollTo({ top, behavior: "smooth" });
  // }

  document.querySelectorAll(".onload-animation").forEach((section, index) => {
    section.style.animationDelay = `calc(${index + 1} * var(--onload-animation-interval))`;
  });
});

barba.init({
  preventRunning: true,
  timeout: 0, // Let slow page requests finish instead of forcing a reload.
  transitions: [{ name: "self" }],
  // Leave same-document fragment navigation to the browser.
  prevent: ({ href }) => href.includes("#") && href.split("#")[0] === location.href.split("#")[0],
});
// --- End ---
