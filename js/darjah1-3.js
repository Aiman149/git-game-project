// JavaScript (level2.js)

const words = document.querySelectorAll('.word');
const targetImages = document.querySelectorAll('.target-image');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.querySelector('.game-container');

let score = 0;
let totalWords = words.length;
let correctWords = 0;

words.forEach(word => {
    word.addEventListener('dragstart', dragStart);
});

targetImages.forEach(image => {
    image.addEventListener('dragover', allowDrop);
    image.addEventListener('drop', drop);
});

function dragStart(event) {
    const word = event.target;
    word.classList.add('flying');
    event.dataTransfer.setData('text/plain', word.textContent);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const targetImage = event.target;
    const word = event.dataTransfer.getData('text/plain');
    const targetWord = targetImage.getAttribute('data-word');

    if (word === targetWord) {
        score += 10;
        correctWords++;

        // Hide the word after it's been successfully dropped
        targetImage.style.visibility = 'hidden';
    } else {
        score -= 5; // Deduct 5 points for a wrong match
        showWrongPopup(); // Show the wrong pop-up for wrong matches
    }

    scoreDisplay.textContent = score;

    if (correctWords === totalWords) {
        // Calculate and display the score percentage
        const percentage = (score / (totalWords * 10)) * 100;
        showScorePopup(percentage);
    }
}

function showWrongPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup', 'wrong-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <p>Wrong! -5</p>
        </div>
    `;
    document.body.appendChild(popup);

    // Remove the wrong pop-up after a delay
    setTimeout(() => {
        popup.remove();
    }, 2000); // Remove after 2 seconds (adjust as needed)
}



function showScorePopup(percentage) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <p>Congratulations! You scored ${percentage.toFixed(2)}%</p>
        </div>
    `;
    document.body.appendChild(popup);
}

// Function to reset the game (if needed)
function resetGame() {
    words.forEach(word => {
        word.classList.remove('flying');
        word.style.visibility = 'visible';
    });
    score = 0;
    correctWords = 0;
    scoreDisplay.textContent = 0;
}