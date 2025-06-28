let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

startBtn.onclick = () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
        startBtn.textContent = "Resume";
    }
};

pauseBtn.onclick = () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        elapsedTime = Date.now() - startTime;
        startBtn.textContent = "Start";
    }
};

resetBtn.onclick = () => {
    clearInterval(interval);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    lapCount = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = "";
    startBtn.textContent = "Start";
};

lapBtn.onclick = () => {
    if (isRunning) {
        lapCount++;
        const li = document.createElement("li");
        li.textContent = `Lap ${lapCount}: ${display.textContent}`;
        laps.insertBefore(li, laps.firstChild);

        // Add animation effect
        li.style.opacity = "0";
        li.style.transform = "translateY(-10px)";
        setTimeout(() => {
            li.style.transition = "all 0.3s ease";
            li.style.opacity = "1";
            li.style.transform = "translateY(0)";
        }, 10);
    }
};

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let totalSeconds = Math.floor(elapsedTime / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(unit) {
    return unit.toString().padStart(2, "0");
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "Space":
            e.preventDefault();
            if (isRunning) {
                pauseBtn.click();
            } else {
                startBtn.click();
            }
            break;
        case "KeyR":
            resetBtn.click();
            break;
        case "KeyL":
            lapBtn.click();
            break;
    }
});

// Add some visual feedback for button clicks
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function() {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
            this.style.transform = "";
        }, 150);
    });
});