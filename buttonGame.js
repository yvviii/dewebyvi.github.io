const Buttoncatch = document.getElementById('Buttoncatch');
const OFFSET = 100;
const SAFE_ZONE = 20;
let isCatchable = false;
let isWon = false;

Buttoncatch.addEventListener('click', function() {
    if (isWon) return;
    isWon = true;
    isCatchable = true;

    const buttonBox = Buttoncatch.getBoundingClientRect();
    const centerX = buttonBox.left + buttonBox.width / 2;
    const centerY = buttonBox.top + buttonBox.height / 2;

    document.body.style.transition = "transform 1.5s ease-in-out";
    document.body.style.transform = `scale(3) translate(${window.innerWidth / 2 - centerX}px, ${window.innerHeight / 2 - centerY}px)`;

    setTimeout(() => {
        resetGame();
    }, 1500);
});

document.addEventListener("mousemove", (e) => {
    if(isCatchable || isWon) return;

    const x = e.pageX;
    const y = e.pageY;
    const buttonBox = Buttoncatch.getBoundingClientRect();
    const horizontalDistanceFrom = distanceFromCenter(buttonBox.x, x, buttonBox.width)
    const verticalDistanceFrom = distanceFromCenter(buttonBox.y, y, buttonBox.height)
    const horizontalOffset = buttonBox.width / 2 + OFFSET
    const verticalOffset = buttonBox.height / 2 + OFFSET

    if (Math.abs(horizontalDistanceFrom) < SAFE_ZONE && Math.abs(verticalDistanceFrom) < SAFE_ZONE) {
        isCatchable = true;
        return;
    }

    if (!isCatchable && Math.abs(horizontalDistanceFrom) < horizontalOffset && Math.abs(verticalDistanceFrom) < verticalOffset) {
        setButtonPosition(
            buttonBox.x + (horizontalOffset / horizontalDistanceFrom) * 5,
            buttonBox.y + (verticalOffset / verticalDistanceFrom) * 5
        );
    }
});

function setButtonPosition(left, top) {
    const windowBox = document.body.getBoundingClientRect()
    const buttonBox = Buttoncatch.getBoundingClientRect()

    if(distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
        left = windowBox.right - buttonBox.width - OFFSET
    }

    if(distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
        left = windowBox.left + OFFSET
    }

    if(distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
        top = windowBox.bottom - buttonBox.height - OFFSET
    }
    if(distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
        top = windowBox.top + OFFSET
    }

    Buttoncatch.style.left = `${left}px`
    Buttoncatch.style.top = `${top}px`;
  
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
    return boxPosition - mousePosition + boxSize / 2
}

function resetGame(){
document.body.style.transition = "none";
document.body.style.transform = "scale(1) translate(0, 0)";

isCatchable = false;
isWon = false;

const randomX = Math.random() * (window.innerWidth - Buttoncatch.clientWidth);
    const randomY = Math.random() * (window.innerHeight - Buttoncatch.clientHeight);
    Buttoncatch.style.left = `${randomX}px`;
    Buttoncatch.style.top = `${randomY}px`;
}
