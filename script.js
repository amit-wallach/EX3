// ========== Jungle Animal Sound Script ==========

// [Extra feature not taught in class]
// This adds a welcome message dynamically using createElement and insertBefore
const userName = prompt("What's your name?");
if (userName) {
  const welcome = document.createElement("p");
  welcome.textContent = `WELCOME TO YOUR JUNGLE, ${userName.toUpperCase()}!`;
  welcome.id = "welcome-msg";

  const header = document.querySelector(".header");
  const subtitle = header.querySelector("h2");
  header.insertBefore(welcome, subtitle.nextSibling);
}

// Background music setup with fallback on user interaction
const bgMusic = document.getElementById("bg-music");
if (bgMusic) {
  bgMusic.volume = 0.4;
  const playMusic = () => {
    bgMusic.play().catch(() => {});
    document.removeEventListener("click", playMusic);
  };
  document.addEventListener("click", playMusic);
}

// Map each keyboard key to its corresponding sound file and image class
const animalMap = {
  b: "bear.mp3",
  e: "elephant.mp3",
  s: "snake.mp3",
  t: "tigris.wav",
  m: "monkey.wav",
  o: "owl.mp3",
  w: "wolf.wav"
};

// Play sound and highlight image by key
function playAnimalSound(letter) {
  const file = animalMap[letter];
  const animalImg = document.querySelector(`.animal.${letter}`);
  if (!file || !animalImg) return;

  if (bgMusic && !bgMusic.paused) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }

  const sound = new Audio(`sounds/${file}`);
  sound.play();

  animalImg.classList.add("active");
  setTimeout(() => animalImg.classList.remove("active"), 300);
}

// Handle key presses
window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  switch (key) {
    case "b":
    case "e":
    case "s":
    case "t":
    case "m":
    case "o":
    case "w":
      playAnimalSound(key);
      break;
  }
});

// Also play sound on click on image
const images = document.querySelectorAll(".animal");
images.forEach(img => {
  const file = img.getAttribute("data-sound");
  const letterClass = [...img.classList].find(cls => animalMap[cls]);

  if (letterClass && file) {
    img.setAttribute("tabindex", "0");
    img.addEventListener("click", () => playAnimalSound(letterClass));
    img.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        playAnimalSound(letterClass);
      }
    });
  }
});

// Music toggle button
const musicBtn = document.getElementById("toggle-music");

if (bgMusic && musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicBtn.textContent = "🔊";
    } else {
      bgMusic.pause();
      musicBtn.textContent = "🔇";
    }
  });
}
