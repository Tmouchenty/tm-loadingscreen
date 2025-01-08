let progress = 0;
const progressElement = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
var music = document.getElementById("music");
var isPlaying = true; 
music.volume = 0.1; 

function toggleMusic() {
    if (isPlaying) {
        music.pause();
    } else {
        music.play();
    }
    isPlaying = !isPlaying;
}

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 32) { 
        toggleMusic();
    }
});

const tips = [
    "Always be respectful of fellow roleplayers.",
    "Be creative and think outside the box.",
    "Collaborate and communicate with your fellow players.",
    "Stay in character to enhance the experience.",
    "Be patient when others need time to respond.",
    "Respect the game's rules and guidelines."
];

function getNextTip() {
    const currentTime = new Date().getTime();
    const lastTipTime = localStorage.getItem('lastTipTime');
    let tipIndex = localStorage.getItem('tipIndex');

    const newTipIndex = Math.floor(Math.random() * tips.length);
    localStorage.setItem('tipIndex', newTipIndex);
    localStorage.setItem('lastTipTime', currentTime);

    return tips[newTipIndex];
}

function loadProgress(percentage) {
    progress = percentage;
    progressElement.style.width = `${progress}%`;
    if (progress < 20) {
        progressText.textContent = "3D MODELS...";
    } else if (progress < 40) {
        progressText.textContent = "GETTING READY...";
    } else if (progress < 80) {
        progressText.textContent = "SESSION...";
    } else if (progress < 95) {
        progressText.textContent = "PREPARING...";
    } else {
        progressText.textContent = "LOADING COMPLETED";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const dailyTipElement = document.querySelector('.thetip');

    setInterval(() => {
        dailyTipElement.textContent = getNextTip();
    }, 5000); 
});

window.addEventListener('message', function(e) {
    if (e.data.eventName === 'loadProgress') {
        loadProgress(parseInt(e.data.loadFraction * 100));
    }
});
