const aboutFacts = [
  ["♡", "pink is the answer", "Your favourite colour is pink, so this website was never going to be subtle about it."],
  ["✦", "playful energy", "You can be joking, silly and completely yourself — which makes ordinary moments more fun."],
  ["✿", "very expressive", "You have your own way of showing what you think and how you care. It is distinctly you."],
  ["↗", "a little dramatic", "Sometimes dramatic in the funniest possible way. Honestly, it adds to the lore."],
];
const messages = [
  "just a reminder that you're genuinely a pretty cool person",
  "hope you're having a good day :)",
  "yes i actually spent time making this",
  "you somehow made it onto an entire website",
  "this is your official reminder to smile",
];
const compliments = [
  "you are effortlessly entertaining, even when you are not trying to be.",
  "you have the kind of personality that makes a normal day less normal (in a good way).",
  "you are very easy to root for. this is an official announcement.",
  "you bring excellent main-character energy to the most random situations.",
  "you are more memorable than you probably realise.",
];
const lore = [
  "fifi has never met a pink detail she could not improve.",
  "fifi's dramatic reactions deserve their own tiny documentary.",
  "fifi can turn a normal conversation into a full episode.",
  "fifi lore is expanding faster than this website can document.",
  "scientists remain unable to measure the full power of fifi's personality.",
];
const arianSays = [
  "i hope you know you're appreciated, even when i forget to say it properly.",
  "you are objectively one of the most fifi people to ever fifi.",
  "thank you for being funny, expressive and wonderfully yourself.",
  "i made you a website. please respect the level of unnecessary effort here.",
];

const $ = (selector) => document.querySelector(selector);
const loader = $("#loader");
const fallingLayer = $("#fallingLayer");
const toast = $("#toast");
const themeToggle = $("#themeToggle");
let pinkMode = false;

setTimeout(() => loader.classList.add("done"), 1100);

function renderAbout() {
  $("#aboutGrid").innerHTML = aboutFacts.map(([icon, title, text]) => `
    <article class="about-card reveal">
      <div class="card-icon" aria-hidden="true">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join("");
}

function renderMessages() {
  $("#envelopeGrid").innerHTML = messages.map((message, index) => `
    <button class="envelope reveal" data-message="${message}">
      <span class="envelope-top"><span>no. 0${index + 1}</span><span>♡</span></span>
      <span class="envelope-mark" aria-hidden="true">✉</span>
      <p>tap to open</p>
    </button>
  `).join("");
}

function randomFrom(list) { return list[Math.floor(Math.random() * list.length)]; }
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2700);
}
function sprinkle(count = 18, symbols = ["✦", "♡", "🎀", "✿"]) {
  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.className = "falling-item";
    item.textContent = randomFrom(symbols);
    item.style.left = `${Math.random() * 100}%`;
    item.style.animationDelay = `${Math.random() * .9}s`;
    item.style.fontSize = `${.8 + Math.random() * 1.15}rem`;
    fallingLayer.appendChild(item);
    setTimeout(() => item.remove(), 5000);
  }
}

renderAbout();
renderMessages();

function setTheme(nightMode) {
  document.body.classList.toggle("night-kitty", nightMode);
  document.documentElement.dataset.theme = nightMode ? "night" : "soft";
  themeToggle.setAttribute("aria-pressed", String(nightMode));
  themeToggle.setAttribute("aria-label", nightMode ? "Switch to soft pink theme" : "Switch to night kitty theme");
  themeToggle.textContent = nightMode ? "☀" : "☾";
  showToast(nightMode ? "night kitty mode activated ☾" : "soft pink mode restored ♡");
  localStorage.setItem("fifi-theme", nightMode ? "night" : "soft");
}
setTheme(localStorage.getItem("fifi-theme") === "night");
themeToggle.addEventListener("click", () => setTheme(!document.body.classList.contains("night-kitty")));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("kitty-card")) sprinkle(3, ["♡", "✦", "🎀"]);
    }
  });
}, { threshold: .13 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

$("#openButton").addEventListener("click", () => {
  sprinkle(28);
  document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
});

$("#morePink").addEventListener("click", () => {
  pinkMode = true;
  document.body.classList.add("extra-pink");
  $("#morePink").setAttribute("aria-pressed", "true");
  $("#pinkStage").animate([{ transform: "scale(.98)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }], { duration: 650, easing: "ease-out" });
  sprinkle(45, ["🎀", "✦", "♡", "✿"]);
  showToast("hello kitty mode activated 🎀");
});
$("#lessPink").addEventListener("click", () => {
  pinkMode = false;
  document.body.classList.remove("extra-pink");
  $("#morePink").setAttribute("aria-pressed", "false");
  showToast("kitty mode tucked away for now ♡");
});

document.querySelectorAll(".envelope").forEach((envelope) => {
  envelope.addEventListener("click", () => {
    const wasOpen = envelope.classList.contains("open");
    document.querySelectorAll(".envelope.open").forEach((item) => item.classList.remove("open"));
    if (!wasOpen) {
      envelope.classList.add("open");
      envelope.querySelector("p").textContent = envelope.dataset.message;
      sprinkle(5, ["✦", "♡"]);
    }
  });
});

const sillyText = $("#sillyText");
document.querySelectorAll(".silly-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".silly-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const panel = button.dataset.panel;
    sillyText.textContent = panel === "compliment" ? randomFrom(compliments) : panel === "lore" ? randomFrom(lore) : randomFrom(arianSays);
    sillyText.animate([{ opacity: .2, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 330, easing: "ease-out" });
  });
});

$("#chaosButton").addEventListener("click", () => {
  sillyText.textContent = "WHY DID YOU PRESS IT 😭";
  sprinkle(120, ["✦", "♡", "🎀", "✿"]);
  document.body.animate([{ filter: "saturate(1)" }, { filter: "saturate(1.65)" }, { filter: "saturate(1)" }], { duration: 2600, easing: "ease-in-out" });
  showToast("chaos deployed successfully");
  setTimeout(() => { sillyText.textContent = randomFrom(compliments); }, 3600);
});

const secretModal = $("#secretModal");
const secretBow = $("#secretBow");
const closeSecret = $("#closeSecret");
function closeSecretModal() {
  secretModal.hidden = true;
  secretBow.focus();
}
secretBow.addEventListener("click", () => {
  secretModal.hidden = false;
  $("#secretReveal").hidden = true;
  closeSecret.focus();
});
closeSecret.addEventListener("click", closeSecretModal);
secretModal.addEventListener("click", (event) => { if (event.target === secretModal) closeSecretModal(); });
document.addEventListener("keydown", (event) => {
  if (secretModal.hidden) return;
  if (event.key === "Escape") closeSecretModal();
  if (event.key === "Tab") {
    const focusable = secretModal.querySelectorAll("button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
$("#oneMoreSecret").addEventListener("click", () => {
  $("#secretReveal").hidden = false;
  $("#oneMoreSecret").textContent = "keep this forever ♡";
  sprinkle(70, ["✦", "🎀", "♡"]);
});

$("#againButton").addEventListener("click", () => {
  loader.classList.remove("done");
  setTimeout(() => loader.classList.add("done"), 1100);
  window.scrollTo({ top: 0, behavior: "smooth" });
  sprinkle(22);
});

document.addEventListener("pointermove", (event) => {
  const sparkle = $("#cursorSparkle");
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  sparkle.style.opacity = "1";
  clearTimeout(window.sparkleTimer);
  window.sparkleTimer = setTimeout(() => { sparkle.style.opacity = "0"; }, 160);
});
