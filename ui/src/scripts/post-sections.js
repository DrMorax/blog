export function initPostSections(container) {
  const prose = container.querySelector(".post-prose");
  if (!prose) return;

  const headings = new Map();
  for (const heading of prose.querySelectorAll(":is(h1,h2,h3,h4,h5,h6)[id]")) {
    headings.set(heading.id, heading);
    const anchor = document.createElement("a");
    anchor.className = "heading-permalink";
    anchor.href = `#${encodeURIComponent(heading.id)}`;
    if (heading.querySelector("a")) {
      // Preserve links the author put inside the heading.
      anchor.setAttribute("aria-label", `Link to ${heading.textContent}`);
      anchor.textContent = " #";
    } else {
      anchor.append(...heading.childNodes);
    }
    heading.append(anchor);
  }

  const sections = Array.from(container.querySelectorAll(".post-sections a"), link => ({
    link,
    heading: headings.get(decodeURIComponent(link.hash.slice(1))),
  })).filter(section => section.heading);
  if (!sections.length) return;

  let current;
  let frame = 0;
  function update() {
    frame = 0;
    // Use the last heading past the reading line, including in long sections.
    const line = Math.min(100, window.innerHeight * 0.2);
    let next;
    for (const { heading, link } of sections) {
      if (heading.getBoundingClientRect().top > line) break;
      next = link;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
      next = sections.at(-1).link;
    }
    if (next === current) return;
    current?.removeAttribute("aria-current");
    next?.setAttribute("aria-current", "location");
    current = next;
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  window.addEventListener("scroll", schedule, { passive: true });
  const resize = new ResizeObserver(schedule);
  resize.observe(prose);
  update();
  return () => {
    window.removeEventListener("scroll", schedule);
    resize.disconnect();
    cancelAnimationFrame(frame);
  };
}
