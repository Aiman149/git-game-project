const words = document.querySelectorAll('.word');
const targetImages = document.querySelectorAll('.target-image');
const scoreDisplay = document.getElementById('score');
let score = 0;
let level = 1;

words.forEach(word => {
    word.addEventListener('mousedown', mouseDown);
    word.addEventListener('mouseup', mouseUp);
    word.addEventListener('dragstart', dragStart);
    word.addEventListener('touchstart', touchStart);
    word.addEventListener('touchend', touchEnd);
    word.addEventListener('dragstart', dragStart);
    word.addEventListener('touchmove', allowDrop);
    word.addEventListener('touchend', handleDrop); // Use the consolidated function
    word.addEventListener('drop', handleDrop); // Use the consolidated function
});

targetImages.forEach(image => {
    image.addEventListener('dragover', allowDrop);
    image.addEventListener('drop', handleDrop); // Use the consolidated function
});

function mouseDown(event) {
    const word = event.target;
    word.classList.add('flying');
    word.style.transition = 'none';
}

function mouseUp(event) {
    const word = event.target;
    word.classList.remove('flying');
    word.style.transition = '';
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
}

function touchStart(event) {
    const word = event.target;
    word.classList.add('flying');
    word.style.transition = 'none';
}

function touchEnd(event) {
    const word = event.target;
    word.classList.remove('flying');
    word.style.transition = '';
}

function allowDrop(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();

    const draggedItem = event.dataTransfer.getData('text/plain');
    const target = event.target;

    if (target.classList.contains('target-image')) {
        // Handle image drops
        const targetWord = target.getAttribute('data-word');

        if (draggedItem === targetWord) {
            // Correct match, hide the image
            target.style.display = 'none';

            score += 10; // Add 10 points for a correct match
            scoreDisplay.textContent = score;
            event.dataTransfer.clearData();

            // Check if all images are hidden
            if (areAllImagesHidden()) {
                if (level === 1) {
                    // Redirect to level2.html when all images are hidden in level 1
                    window.location.href = 'darjah3-2.html';
                }
                // Add similar checks for other levels here if needed
            }
        } else {
            showWrongPopup();
            score -= 5; // Deduct 5 points for a wrong match
            scoreDisplay.textContent = score;
        }
    } else if (target.classList.contains('word')) {
        // Handle word drops
        const targetWord = target.textContent;
        const targetImage = document.querySelector(`[data-word="${targetWord}"]`);

        if (draggedItem === targetWord) {
            // Correct match, hide the image
            targetImage.style.display = 'none';

            score += 10; // Add 10 points for a correct match
            scoreDisplay.textContent = score;
            event.dataTransfer.clearData();
        } else {
            showWrongPopup();
            score -= 5; // Deduct 5 points for a wrong match
            scoreDisplay.textContent = score;
        }
    }
}

// Function to check if all images are hidden
function areAllImagesHidden() {
    const hiddenImages = document.querySelectorAll('.target-image[style*="display: none"]');
    return hiddenImages.length === targetImages.length;
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

function showNextLevelPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup', 'next-level-popup');
    popup.textContent = `Congratulations! Level ${level} unlocked!`;

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