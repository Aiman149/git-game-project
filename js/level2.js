const words = document.querySelectorAll('.word');
const targetImages = document.querySelectorAll('.target-image');
const scoreDisplay = document.getElementById('score');
let score = 0;

words.forEach(word => {
    word.addEventListener('mousedown', mouseDown);
    word.addEventListener('mouseup', mouseUp);
    word.addEventListener('dragstart', dragStart);
});

targetImages.forEach(image => {
    image.addEventListener('dragover', allowDrop);
    image.addEventListener('drop', drop);
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

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const word = event.dataTransfer.getData('text/plain');
    const targetWord = event.target.getAttribute('data-word');

    if (word === targetWord) {
        score += 10;
        scoreDisplay.textContent = score;
        event.target.appendChild(document.createTextNode(word));
        event.dataTransfer.clearData();
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
    document.body.appendChild(popup);

    // Remove the popup after a delay
    setTimeout(() => {
        popup.remove();
    }, 2000); // Remove after 2 seconds (adjust as needed)
}

words.forEach(word => {
    word.addEventListener('touchstart', touchStart);
    word.addEventListener('touchend', touchEnd);
    word.addEventListener('dragstart', dragStart);
});

targetImages.forEach(image => {
    image.addEventListener('touchmove', allowDrop);
    image.addEventListener('touchend', drop);
});

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

