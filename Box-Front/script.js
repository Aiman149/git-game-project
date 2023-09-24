const boxes = document.querySelectorAll('.box');

boxes[0].addEventListener('click', () => {
    window.location.href = 'darjah.html';
});

// Add click event listeners for the remaining boxes (boxes 2 to 6) if needed
for (let i = 1; i < boxes.length; i++) {
    boxes[i].addEventListener('click', () => {
        // Handle other box clicks here
    });
}
