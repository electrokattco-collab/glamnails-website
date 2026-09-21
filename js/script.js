// GlamNails by Naledi — small interactive behaviours (ES6, no framework).
// NQF4-readable: plain functions, commented steps.

// ========== 1. CONFIG — owner edits ONLY this block ==========
const CONFIG = {
  // WhatsApp number in international format WITHOUT "+" or spaces.
  // Example South Africa: "27821234567". Leave "" until the real number arrives.
  whatsappNumber: "27820000000", // MOCK number - replace with real one
  // Default greeting when visitor clicks a generic "Book" button.
  defaultMessage: "Hi GlamNails by Naledi! I would like to book a nail appointment.",
  // Real gallery images (auto-detected). Add files with these exact names:
  galleryImages: [
    "images/work-1.svg",
    "images/work-2.svg",
    "images/work-3.svg",
    "images/work-4.svg",
    "images/work-5.svg",
    "images/work-6.svg"
  ],
  heroImage: "images/hero.svg",
  portraitImage: "images/portrait.svg"
};

// ========== 2. WhatsApp links ==========
function waLink(message) {
  if (!CONFIG.whatsappNumber) return "#booking"; // fallback: scroll to form
  return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
}

function wireWhatsAppButtons() {
  document.querySelectorAll("[data-whatsapp-cta]").forEach((el) => {
    const service = el.getAttribute("data-service");
    const msg = service
      ? "Hi GlamNails by Naledi! I would like to book: " + service + "."
      : CONFIG.defaultMessage;
    el.setAttribute("href", waLink(msg));
    if (!CONFIG.whatsappNumber) {
      el.setAttribute("title", "Add WhatsApp number in js/script.js to activate");
    } else if (el.tagName === "A") {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
}

// ========== 3. Booking form -> WhatsApp ==========
function wireBookingForm() {
  const form = document.getElementById("bookForm");
  const note = document.getElementById("formNote");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Native-style validation (Bootstrap classes).
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      note.textContent = "Please fill in your name and choose a service.";
      return;
    }
    const name = document.getElementById("fName").value.trim();
    const service = document.getElementById("fService").value;
    const when = document.getElementById("fDate").value.trim();
    const extra = document.getElementById("fMsg").value.trim();
    let msg = "Hi GlamNails by Naledi! I'm " + name + ". I'd like to book: " + service + ".";
    if (when) msg += " Preferred time: " + when + ".";
    if (extra) msg += " Notes: " + extra;
    if (!CONFIG.whatsappNumber) {
      note.textContent = "Form ready ✓ — add the WhatsApp number in js/script.js and this will open WhatsApp automatically.";
      return;
    }
    window.open(waLink(msg), "_blank", "noopener");
    note.textContent = "Opening WhatsApp… just press send ✓";
  });
}

// ========== 4. Gallery: auto-load real images, lightbox ==========
function fileExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function loadGallery() {
  const tiles = document.querySelectorAll(".g-tile");
  const lb = document.getElementById("lightbox");
  const lbMsg = document.getElementById("lbMsg");
  const lbClose = document.getElementById("lbClose");

  // Swap placeholders for real files where they exist.
  for (let i = 0; i < tiles.length; i++) {
    const src = CONFIG.galleryImages[i];
    if (src && await fileExists(src)) {
      tiles[i].style.backgroundImage = "url('" + src + "')";
      tiles[i].classList.add("has-image");
      tiles[i].setAttribute("data-full", src);
      tiles[i].setAttribute("aria-label", "View nail work photo " + (i + 1));
    }
  }

  // Hero + portrait auto-swap.
  if (await fileExists(CONFIG.heroImage)) {
    const hero = document.querySelector(".hero-photo");
    hero.style.backgroundImage = "url('" + CONFIG.heroImage + "')";
    hero.classList.add("has-image");
    hero.innerHTML = "";
  }
  if (await fileExists(CONFIG.portraitImage)) {
    const p = document.querySelector(".about-photo");
    p.style.backgroundImage = "url('" + CONFIG.portraitImage + "')";
    p.style.backgroundSize = "cover";
    p.style.backgroundPosition = "center";
    p.innerHTML = "";
  }

  // Lightbox behaviour (keyboard friendly: Esc + close button).
  function openLightbox(tile) {
    const full = tile.getAttribute("data-full");
    lb.hidden = false;
    lb.querySelectorAll("img").forEach((n) => n.remove());
    if (full) {
      const img = document.createElement("img");
      img.src = full;
      img.alt = tile.getAttribute("aria-label") || "Nail work photo";
      lb.insertBefore(img, lbMsg);
      lbMsg.style.display = "none";
    } else {
      lbMsg.style.display = "block";
    }
    lbClose.focus();
  }
  function closeLightbox() { lb.hidden = true; }
  tiles.forEach((t) => t.addEventListener("click", () => openLightbox(t)));
  lbClose.addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });
}

// ========== 5. Navbar: close mobile menu after click ==========
function wireNav() {
  const nav = document.getElementById("mainNav");
  if (!nav || typeof bootstrap === "undefined") return;
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      if (nav.classList.contains("show")) bootstrap.Collapse.getInstance(nav).hide();
    })
  );
  document.getElementById("year").textContent = new Date().getFullYear();
}

// Start everything.
document.addEventListener("DOMContentLoaded", () => {
  wireWhatsAppButtons();
  wireBookingForm();
  wireNav();
  loadGallery();
});
