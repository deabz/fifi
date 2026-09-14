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
let pinkMode = false;

setTimeout(() => loader.classList.add("done"), 2500);

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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
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
  $("#pinkStage").animate([{ transform: "scale(.98)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }], { duration: 650, easing: "ease-out" });
  sprinkle(45, ["🎀", "✦", "♡", "✿"]);
  showToast("pink levels increased dramatically 🎀");
});
$("#lessPink").addEventListener("click", () => {
  pinkMode = false;
  document.body.classList.remove("extra-pink");
  showToast("returning to normal pink levels");
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
$("#secretBow").addEventListener("click", () => {
  secretModal.hidden = false;
  $("#secretReveal").hidden = true;
});
$("#closeSecret").addEventListener("click", () => { secretModal.hidden = true; });
secretModal.addEventListener("click", (event) => { if (event.target === secretModal) secretModal.hidden = true; });
$("#oneMoreSecret").addEventListener("click", () => {
  $("#secretReveal").hidden = false;
  sprinkle(70, ["✦", "🎀", "♡"]);
});

$("#againButton").addEventListener("click", () => {
  loader.classList.remove("done");
  setTimeout(() => loader.classList.add("done"), 1900);
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

const audio = $("#audio");
const player = $("#musicPlayer");
const playButton = $("#playButton");
const muteButton = $("#muteButton");
audio.volume = .45;
audio.addEventListener("error", () => {
  playButton.disabled = true;
  playButton.setAttribute("title", "Add a licensed copy of On the Square to the assets folder");
});
playButton.addEventListener("click", async () => {
  if (audio.paused) {
    await audio.play();
    playButton.textContent = "Ⅱ";
    playButton.setAttribute("aria-label", "Pause music");
    player.classList.add("playing");
  } else {
    audio.pause();
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play music");
    player.classList.remove("playing");
  }
});
muteButton.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? "×" : "⌁";
  muteButton.setAttribute("aria-label", audio.muted ? "Unmute music" : "Mute music");
});
$("#volumeSlider").addEventListener("input", (event) => { audio.volume = event.target.value; });
