import barba from "./barba.mjs";
import { initGuestbook } from "./guestbook.js";

barba.hooks.beforeLeave(({ current }) => {
  current.container.setAttribute("data-leaving", "");
});

barba.hooks.beforeEnter(({ current, next }) => {
  if (!current.container) return; // Keep the browser's scroll position on initial load.
  current.container.hidden = true;
  next.container.focus({ preventScroll: true });
  window.scrollTo(0, 0);
});

barba.hooks.afterEnter(({ next }) => {
  initGuestbook(next.container);
  const path = next.url.path.replace(/\/$/, "");
  document.querySelectorAll("nav a.link").forEach((link) => {
    link.classList.toggle("active", link.pathname.replace(/\/$/, "") === path);
  });
});

barba.init({
  preventRunning: true,
  timeout: 0, // Let slow page requests finish instead of forcing a reload.
  transitions: [{ name: "self" }],
  // Leave same-document fragment navigation to the browser.
  prevent: ({ href }) => href.includes("#") && href.split("#")[0] === location.href.split("#")[0],
});
