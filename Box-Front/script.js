const boxes = document.querySelectorAll('.box');

boxes[0].addEventListener('click', () => {
    window.location.href = 'darjah.html';
});

for (let i = 1; i < boxes.length; i++) {
    boxes[i].addEventListener('click', () => {
    });
}
