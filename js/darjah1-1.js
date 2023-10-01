const words = document.querySelectorAll('.word');
const targetImages = document.querySelectorAll('.target-image');
const scoreDisplay = document.getElementById('score');
let score = 0;
let level = 1;

words.forEach(word => {
    word.addEventListener('click', handleWordClick);
});

targetImages.forEach(image => {
    image.addEventListener('click', handleImageClick);
});

function handleWordClick(event) {
    const word = event.target;
    const wordText = word.textContent;

    const matchingImage = document.querySelector(`[data-word="${wordText}"]`);

    if (matchingImage) {
        // Correct match, hide the image
        matchingImage.style.display = 'none';

        score += 10; // Add 10 points for a correct match
        scoreDisplay.textContent = score;

        // Check if all images are hidden
        if (areAllImagesHidden()) {
            if (level === 1) {
                // Redirect to level2.html when all images are hidden in level 1
                window.location.href = 'darjah1-2.html';
            }
            // Add similar checks for other levels here if needed
        }
    } else {
        showWrongPopup();
        score -= 5; // Deduct 5 points for a wrong match
        scoreDisplay.textContent = score;
    }
}

function handleImageClick(event) {
    const image = event.target;
    const wordText = image.getAttribute('data-word');

    const matchingWord = document.querySelector(`.word:contains('${wordText}')`);

    if (matchingWord) {
        // Correct match, hide the image
        image.style.display = 'none';

        score += 10; // Add 10 points for a correct match
        scoreDisplay.textContent = score;
    } else {
        showWrongPopup();
        score -= 5; // Deduct 5 points for a wrong match
        scoreDisplay.textContent = score;
    }
}

// Function to check if all images are hidden
function areAllImagesHidden() {
    const hiddenImages = document.querySelectorAll('.target-image[style*="display: none"]');
    return hiddenImages.length === targetImages.length;
}

function showWrongPopup() {
    const popup = createPopup('Wrong! -5');
    document.body.appendChild(popup);

    // Remove the wrong pop-up after a delay
    setTimeout(() => {
        popup.remove();
    }, 2000); // Remove after 2 seconds (adjust as needed)
}

function createPopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup', 'wrong-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
        </div>
    `;
    return popup;
}

function showNextLevelPopup() {
    const popup = createPopup(`Congratulations! Level ${level} unlocked!`);

    // Add CSS styles to make the text white and bigger
    popup.style.color = 'white';
    popup.style.fontSize = '24px'; // You can adjust the size as needed

    document.body.appendChild(popup);

    // Redirect to the next level after a delay
    setTimeout(() => {
        popup.remove();

        if (level === 2) {
            window.location.href = 'darjah1-3.html'; // Redirect to level 2 page
        } else if (level === 3) {
            // Add more level transitions here
            window.location.href = 'level3.html'; // Redirect to level 3 page, etc.
        } else {
            showFinalLevelPopup(); // Show final level pop-up when all levels are completed
        }
    }, 3000); // Redirect after 3 seconds (adjust as needed)
}
