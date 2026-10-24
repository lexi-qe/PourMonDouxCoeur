
/* ========================================
   1. PERSONALIZA TU REGALO
======================================== */

// Cambia esta fecha por la de su aniversario,
// cumpleaños o próximo día especial.
const specialDate = new Date("2026-11-23T00:00:00");

const specialDateLabel = "nuestro próximo día especial";

// Personaliza estos cuatro mensajes secretos.
const secrets = [
  "Una de las cosas que más me gustan de ti es la forma en que haces especiales hasta los momentos más sencillos.",

  "Si alguna vez dudas de lo importante que eres para mí, recuerda que hay un rincón de mi mundo donde siempre tendrás un lugar especial.",

  "Quiero seguir descubriendo cosas de ti, escuchando tus historias y creando recuerdos a nuestro propio ritmo.",

  "Mi deseo para nosotros es que nunca nos falten la honestidad, la paciencia, las risas y las ganas de cuidarnos."
];


/* ========================================
   2. ELEMENTOS DE LA PÁGINA
======================================== */

const $ = function (selector) {
  return document.querySelector(selector);
};

const sky = $("#sky");
const welcome = $("#welcome");
const beginButton = $("#beginButton");

const letterSection = $("#letterSection");
const envelope = $("#envelope");
const envelopeHint = $("#envelopeHint");
const letter = $("#letter");
const secretsButton = $("#secretsButton");

const secretsSection = $("#secretsSection");
const starsGrid = $("#starsGrid");
const secretsProgress = $("#secretsProgress");
const secretMessage = $("#secretMessage");
const secretText = $("#secretText");
const closeSecret = $("#closeSecret");

const musicButton = $("#musicButton");
const musicIcon = $("#musicIcon");
const musicLabel = $("#musicLabel");
const backgroundMusic = $("#backgroundMusic");

const countdownCaption = $("#countdownCaption");
const dayElement = $("#days");
const hourElement = $("#hours");
const minuteElement = $("#minutes");
const secondElement = $("#seconds");

const finalButton = $("#finalButton");
const finalSurprise = $("#finalSurprise");


/* ========================================
   3. ESTRELLAS DEL CIELO
======================================== */

function createStars() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");

    const size = Math.random() * 2.2 + 0.7;
    const duration = Math.random() * 4 + 2;

    star.className = "star-particle";

    star.style.left = (Math.random() * 100) + "%";
    star.style.top = (Math.random() * 100) + "%";
    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.setProperty(
      "--duration",
      duration + "s"
    );

    star.style.animationDelay =
      (Math.random() * 5) + "s";

    fragment.appendChild(star);
  }

  sky.appendChild(fragment);
}

createStars();


/* ========================================
   4. ENTRADA Y APERTURA DEL SOBRE
======================================== */

beginButton.addEventListener("click", function () {
  welcome.classList.add("hidden");
  letterSection.classList.remove("hidden");

  letterSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

let envelopeOpened = false;

envelope.addEventListener("click", function () {
  if (envelopeOpened) {
    return;
  }

  envelopeOpened = true;

  envelope.classList.add("open");

  envelope.setAttribute(
    "aria-expanded",
    "true"
  );

  envelopeHint.textContent =
    "Una carta escrita especialmente para ti...";

  window.setTimeout(function () {
    letter.classList.remove("hidden");

    envelopeHint.textContent =
      "La carta ya está abierta.";

    letter.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 650);
});


/* ========================================
   5. MENSAJES SECRETOS
======================================== */

const discoveredSecrets = new Set();

starsGrid.addEventListener("click", function (event) {
  const button = event.target.closest(".secret-star");

  if (!button) {
    return;
  }

  const index = Number(button.dataset.secret);

  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= secrets.length
  ) {
    return;
  }

  discoveredSecrets.add(index);

  button.classList.add("discovered");

  button.setAttribute(
    "aria-label",
    "Secreto " + (index + 1) + ", descubierto"
  );

  secretText.textContent = secrets[index];

  secretMessage.classList.remove("hidden");

  secretsProgress.textContent =
    discoveredSecrets.size + " de " +
    secrets.length + " secretos descubiertos";

  if (discoveredSecrets.size === secrets.length) {
    secretsProgress.textContent =
      "Has descubierto todas las pequeñas estrellas ✦";
  }

  secretMessage.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});

closeSecret.addEventListener("click", function () {
  secretMessage.classList.add("hidden");
});


/* ========================================
   6. MOSTRAR LA SECCIÓN DE SECRETOS
======================================== */

secretsButton.addEventListener("click", function () {
  secretsSection.classList.remove("hidden");

  secretsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


/* ========================================
   7. MÚSICA DE FONDO
======================================== */




/* ========================================
   8. CUENTA REGRESIVA
======================================== */

function pad(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const difference = specialDate.getTime() - now;

  if (Number.isNaN(specialDate.getTime())) {
    countdownCaption.textContent =
      "Configura una fecha válida en script.js.";

    dayElement.textContent = "---";
    hourElement.textContent = "--";
    minuteElement.textContent = "--";
    secondElement.textContent = "--";

    return;
  }

  if (difference <= 0) {
    dayElement.textContent = "000";
    hourElement.textContent = "00";
    minuteElement.textContent = "00";
    secondElement.textContent = "00";

    countdownCaption.textContent =
      "¡Ha llegado " + specialDateLabel +
      "! Que sea un día bonito. ✦";

    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  dayElement.textContent =
    String(days).padStart(3, "0");

  hourElement.textContent = pad(hours);
  minuteElement.textContent = pad(minutes);
  secondElement.textContent = pad(seconds);

  countdownCaption.textContent =
    "Faltan " + days + " días para " +
    specialDateLabel + ".";
}

updateCountdown();

window.setInterval(updateCountdown, 1000);


/* ========================================
   9. SORPRESA FINAL
======================================== */

finalButton.addEventListener("click", function () {
  finalSurprise.classList.remove("hidden");

  finalButton.textContent =
    "Sorpresa descubierta ✦";

  finalButton.disabled = true;

  finalSurprise.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});