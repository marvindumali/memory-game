// Define the images for the cards (12 tiles, 6 pairs)
const images = [
  "🍎",
  "🍎",
  "🍌",
  "🍌",
  "🍇",
  "🍇",
  "🍉",
  "🍉",
  "🍓",
  "🍓",
  "🍍",
  "🍍",
];

// Get audio elements
const flipSound = document.getElementById("flip-sound")
const matchSound = document.getElementById("match-sound")
const successSound = document.getElementById("success-sound")

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create the game board
function createBoard() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Clear existing cards
  shuffle(images);

  images.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;
    card.dataset.index = index;
    card.innerHTML = `<span>${image}</span>`;
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

// Flip card logic
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("flipped"))
    return;

  flipSound.play(); // Play flip sound
  card.classList.add("flipped");
  card.querySelector("span").style.visibility = "visible";

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    matchSound.play(); // Play match sound
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCount += 2;
    if (matchedCount === images.length) {
      showSuccessMessage();
    }
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      firstCard.querySelector("span").style.visibility = "hidden";
      secondCard.classList.remove("flipped");
      secondCard.querySelector("span").style.visibility = "hidden";
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showSuccessMessage() {
  const successMessage = document.getElementById("success-message");
  successSound.play(); // Play success sound

  successMessage.classList.remove("hidden");
  document.getElementById("again-button").classList.remove("hidden");
}

document.getElementById("again-button").addEventListener("click", () => {
  const successMessage = document.getElementById("success-message");
  successMessage.classList.add("hidden");
  document.getElementById("again-button").classList.add("hidden");
  matchedCount = 0; // Reset matched count
  createBoard(); // Recreate and shuffle the board
});

// Initialize the game
createBoard();
