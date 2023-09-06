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
    const word = event.dataTransfer.getData('text/plain');
    const targetWord = event.target.getAttribute('data-word');

    if (word === targetWord) {
        score += 10;
        scoreDisplay.textContent = score;
        event.target.appendChild(document.createTextNode(word));
        event.dataTransfer.clearData();

        if (score >= 40 && level === 1) {
            // Redirect to level2.html when score reaches 40 for the first time
            window.location.href = 'level2.html';
        } else if (score >= level * 40) {
            level++;
            showNextLevelPopup();
        }
    } else {
        showWrongPopup(); // Show wrong pop-up when a wrong match occurs
        score -= 5;
        scoreDisplay.textContent = score;
    }
}

function showWrongPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup', 'wrong-popup');
    popup.textContent = 'Wrong! -5';
    
    // Add CSS styles to make the text white and bigger
    popup.style.color = 'white';
    popup.style.fontSize = '24px'; // You can adjust the size as needed
    
    document.body.appendChild(popup);

    // Remove the popup after a delay
    setTimeout(() => {
        popup.remove();
    }, 2000); // Remove after 2 seconds (adjust as needed)
}

// function showNextLevelPopup() {
//     const popup = document.createElement('div');
//     popup.classList.add('popup');
//     popup.innerHTML = `
//         <div class="popup-content">
//             <p>Congratulations! Level ${level} unlocked!</p>
//         </div>
//     `;
//     document.body.appendChild(popup);

//     // Remove the popup after a delay
//     setTimeout(() => {
//         popup.remove();
//     }, 2000); // Remove after 2 seconds (adjust as needed)
// }


