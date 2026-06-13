const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const typedText = document.querySelector("#typed-text");

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const phrases = [
  "Loading profile...",
  "Quest accepted: build a better personal site.",
  "Ready for mobile and desktop."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedText) return;
  const current = phrases[phraseIndex];
  typedText.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    window.setTimeout(typeLoop, 58);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    window.setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(typeLoop, 28);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  window.setTimeout(typeLoop, 220);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
typeLoop();
