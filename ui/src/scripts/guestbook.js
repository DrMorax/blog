import DOMPurify from "dompurify";

export function initGuestbook(container) {
  const form = container.querySelector("#guestbook-form");
  if (!form) return;

  const status = form.querySelector("#form-status");
  form.onsubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      });
      const result = await response.json();
      status.textContent = result.message;
      status.style.color = result.success ? "var(--primary-color)" : "red";
      if (result.success) form.reset();
    } catch {
      status.textContent = "Server connection failed.";
      status.style.color = "red";
    }
    status.style.display = "block";
  };

  loadNotes(form.action, container.querySelector("#messages-list"));
}

async function loadNotes(url, list) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok || !result.success || !Array.isArray(result.data)) {
      throw new Error("Guestbook unavailable");
    }

    list.replaceChildren(...result.data.map((note) => {
      const card = document.createElement("div");
      card.className = "message card";
      const name = document.createElement("h3");
      name.textContent = note.name || "Anon";
      const message = document.createElement("div");
      message.append(DOMPurify.sanitize(note.message, {
        USE_PROFILES: { html: true },
        RETURN_DOM_FRAGMENT: true,
      }));
      card.append(name, message);
      return card;
    }));
  } catch {
    list.innerHTML =
      '<div class="card"><h2>Guestbook currently offline</h2></div>';
  }
}
