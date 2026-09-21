const intro =
  document.getElementById(
    "intro"
  );

const gameScreen =
  document.getElementById(
    "gameScreen"
  );

const winScreen =
  document.getElementById(
    "winScreen"
  );

const startButton =
  document.getElementById(
    "startButton"
  );

const playAgainButton =
  document.getElementById(
    "playAgainButton"
  );

const buttonZone =
  document.getElementById(
    "buttonZone"
  );

const wrongCountDisplay =
  document.getElementById(
    "wrongCount"
  );

const chaosLevelDisplay =
  document.getElementById(
    "chaosLevel"
  );

const chaosBarFill =
  document.getElementById(
    "chaosBarFill"
  );

const fakePopup =
  document.getElementById(
    "fakePopup"
  );

const fakePopupTitle =
  document.getElementById(
    "fakePopupTitle"
  );

const fakePopupText =
  document.getElementById(
    "fakePopupText"
  );

const fakePopupButton =
  document.getElementById(
    "fakePopupButton"
  );

const toast =
  document.getElementById(
    "toast"
  );

const BUTTON_COUNT = 20;

let wrongClicks = 0;
let correctButton = null;
let allButtons = [];

let chaos = 0;

const buttonTexts = [
  "CLICK ME",
  "THIS ONE",
  "DEFINITELY ME",
  "WIN BUTTON",
  "FREE WIN",
  "PRESS HERE",
  "NOT THIS",
  "TRUST ME",
  "100% SAFE",
  "DO IT",
  "GO ON",
  "CLICK",
  "REAL BUTTON",
  "YES",
  "NO",
  "MAYBE",
  "OBVIOUSLY THIS",
  "TOTALLY LEGIT",
  "PLEASE",
  "GERALD APPROVED"
];

const wrongMessages = [
  "That wasn't it.",
  "Excellent choice. Completely wrong.",
  "Why did you click that?",
  "The button lied.",
  "Absolutely incredible failure.",
  "Not even close.",
  "That one looked suspicious.",
  "Gerald would not approve.",
  "You trusted a button.",
  "Bold move."
];

const fakeWinMessages = [
  {
    title:
      "YOU WIN!",
    text:
      "No you don't."
  },

  {
    title:
      "CONGRATULATIONS!",
    text:
      "You have won absolutely nothing."
  },

  {
    title:
      "CORRECT!",
    text:
      "This message is lying."
  }
];

startButton.addEventListener(
  "click",
  startGame
);

playAgainButton.addEventListener(
  "click",
  startGame
);

fakePopupButton.addEventListener(
  "click",
  () => {
    fakePopup.classList.add(
      "hidden"
    );
  }
);

function startGame() {
  resetPageEffects();

  wrongClicks = 0;
  chaos = 0;

  wrongCountDisplay.textContent =
    "Wrong clicks: 0";

  updateChaos();

  intro.classList.add(
    "hidden"
  );

  winScreen.classList.add(
    "hidden"
  );

  gameScreen.classList.remove(
    "hidden"
  );

  createButtons();
}

function createButtons() {
  buttonZone.innerHTML = "";

  allButtons = [];

  const correctIndex =
    Math.floor(
      Math.random() *
      BUTTON_COUNT
    );

  for (
    let i = 0;
    i < BUTTON_COUNT;
    i++
  ) {
    createButton(
      i === correctIndex
    );
  }
}

function createButton(isCorrect = false) {
  const button =
    document.createElement(
      "button"
    );

  button.className =
    "gameButton";

  button.textContent =
    randomItem(
      buttonTexts
    );

  button.dataset.correct =
    isCorrect
      ? "true"
      : "false";

  placeButtonRandomly(
    button
  );

  button.addEventListener(
    "click",
    () => {
      if (
        button.dataset.correct ===
        "true"
      ) {
        winGame();
      } else {
        wrongButton(
          button
        );
      }
    }
  );

  buttonZone.appendChild(
    button
  );

  allButtons.push(
    button
  );

  if (isCorrect) {
    correctButton =
      button;
  }
}

function placeButtonRandomly(button) {
  const zoneWidth =
    window.innerWidth;

  const zoneHeight =
    window.innerHeight -
    110;

  const x =
    20 +
    Math.random() *
    Math.max(
      80,
      zoneWidth - 160
    );

  const y =
    80 +
    Math.random() *
    Math.max(
      80,
      zoneHeight - 150
    );

  button.style.left =
    `${x}px`;

  button.style.top =
    `${y}px`;
}

function wrongButton(button) {
  wrongClicks++;

  wrongCountDisplay.textContent =
    `Wrong clicks: ${wrongClicks}`;

  chaos =
    Math.min(
      100,
      wrongClicks * 8
    );

  updateChaos();

  showToast(
    randomItem(
      wrongMessages
    )
  );

  const effect =
    Math.floor(
      Math.random() *
      9
    );

  if (effect === 0) {
    moveButton(
      button
    );
  }

  if (effect === 1) {
    button.classList.add(
      "tiny"
    );
  }

  if (effect === 2) {
    button.classList.add(
      "spin"
    );
  }

  if (effect === 3) {
    screenShake();
  }

  if (effect === 4) {
    fakeWin();
  }

  if (effect === 5) {
    duplicateButtons();
  }

  if (effect === 6) {
    moveCorrectButton();
  }

  if (effect === 7) {
    button.textContent =
      "WHY";
  }

  if (effect === 8) {
    button.classList.add(
      "wobble"
    );
  }

  increaseChaosEffects();
}

function updateChaos() {
  chaosLevelDisplay.textContent =
    `Chaos: ${chaos}%`;

  chaosBarFill.style.width =
    `${chaos}%`;
}

function moveButton(button) {
  placeButtonRandomly(
    button
  );
}

function moveCorrectButton() {
  if (!correctButton) {
    return;
  }

  placeButtonRandomly(
    correctButton
  );

  correctButton.textContent =
    randomItem(
      buttonTexts
    );
}

function duplicateButtons() {
  const numberToAdd =
    wrongClicks > 8
      ? 4
      : 2;

  for (
    let i = 0;
    i < numberToAdd;
    i++
  ) {
    createButton(
      false
    );
  }

  showToast(
    "Great. There are more buttons now."
  );
}

function screenShake() {
  document.body.classList.remove(
    "shake"
  );

  void document.body.offsetWidth;

  document.body.classList.add(
    "shake"
  );

  setTimeout(
    () => {
      document.body.classList.remove(
        "shake"
      );
    },
    380
  );
}

function fakeWin() {
  const message =
    randomItem(
      fakeWinMessages
    );

  fakePopupTitle.textContent =
    message.title;

  fakePopupText.textContent =
    message.text;

  fakePopup.classList.remove(
    "hidden"
  );
}

function increaseChaosEffects() {
  if (
    wrongClicks === 5
  ) {
    showToast(
      "CHAOS LEVEL INCREASED"
    );

    allButtons.forEach(
      button => {
        if (
          Math.random() <
          0.35
        ) {
          button.classList.add(
            "wobble"
          );
        }
      }
    );
  }

  if (
    wrongClicks === 8
  ) {
    moveCorrectButton();

    duplicateButtons();
  }

  if (
    wrongClicks === 10
  ) {
    screenShake();

    document.body.classList.add(
      "invert"
    );

    setTimeout(
      () => {
        document.body.classList.remove(
          "invert"
        );
      },
      1800
    );
  }

  if (
    wrongClicks === 12
  ) {
    allButtons.forEach(
      button => {
        placeButtonRandomly(
          button
        );
      }
    );
  }

  if (
    wrongClicks === 15
  ) {
    showToast(
      "WHY ARE YOU STILL CLICKING"
    );

    duplicateButtons();
    duplicateButtons();
  }
}

function winGame() {
  gameScreen.classList.add(
    "hidden"
  );

  winScreen.classList.remove(
    "hidden"
  );

  resetPageEffects();

  const extra =
    wrongClicks === 0
      ? "FIRST TRY?! Suspicious."
      : `You only pressed ${wrongClicks} wrong button${wrongClicks === 1 ? "" : "s"}.`;

  document.getElementById(
    "winText"
  ).textContent =
    `You actually found it. ${extra}`;
}

function resetPageEffects() {
  document.body.classList.remove(
    "shake",
    "flip",
    "invert"
  );

  fakePopup.classList.add(
    "hidden"
  );
}

function showToast(message) {
  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(
      () => {
        toast.classList.remove(
          "show"
        );
      },
      1400
    );
}

function randomItem(array) {
  return array[
    Math.floor(
      Math.random() *
      array.length
    )
  ];
}

document.addEventListener("keydown", event => {
  if (event.key.toLowerCase() === "t" && correctButton) {
    correctButton.style.outline = "6px solid lime";
    correctButton.style.boxShadow = "0 0 30px lime";
  }
});
