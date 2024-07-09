// Step 1. Import all relevant elements into the JS DOM by defining JS variables.
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
let seconds = 0;
let score = 0;
let selected_insect = {};

// Step 2. Add an event listener to the start game button.
start_btn.addEventListener('click', () => screens[0].classList.add('up'));

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

// Define a function for the start game button.
function startGame() {
    setInterval(increaseTime, 1000);
}

// Function to increase the time and update the time element.
function increaseTime() {
    let m = Math.floor(seconds / 60); // Calculate minutes
    let s = seconds % 60; // Calculate seconds
    // Format minutes and seconds to always be two digits.
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    // Update the time element's inner HTML with the formatted time.
    timeEl.innerHTML = `Time: ${m}:${s}`;
    // Increment the seconds variable.
    seconds++;
}

// Function to get a random location within the game container.
function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

// Function to create a new insect element and add it to the game container.
function createInsect() {
    const insect = document.createElement('div'); // Create a new div element.
    insect.classList.add('insect'); // Add the 'insect' class to the div.
    const { x, y } = getRandomLocation(); // Get random X and Y coordinates.
    insect.style.top = `${y}px`; // Set the top position of the insect.
    insect.style.left = `${x}px`; // Set the left position of the insect.
    // Set the innerHTML of the insect div with an image element, including a random rotation.
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)"/>`;

    // Add an event listener to the insect for the click event to catch the insect.
    insect.addEventListener('click', catchInsect);

    // Append the insect to the game container.
    game_container.appendChild(insect);
}

// Function to handle the insect being caught.
function catchInsect() {
    increaseScore(); // Increase the score.
    this.classList.add('caught'); // Add the 'caught' class to the insect.
    setTimeout(() => this.remove(), 2000); // Remove the insect after 2 seconds.
    addInsects(); // Add more insects.
}

// Function to add more insects.
function addInsects() {
    setTimeout(createInsect, 1000); // Create a new insect after 1 second.
    setTimeout(createInsect, 1500); // Create another new insect after 1.5 seconds.
}

// Function to increase the score and update the score element.
function increaseScore() {
    score++; // Increment the score.
    if (score > 19) { // If the score is greater than 19, show the message.
        message.classList.add('visible');
    }
    // Update the score element's inner HTML with the current score.
    scoreEl.innerHTML = `Score: ${score}`;
}
