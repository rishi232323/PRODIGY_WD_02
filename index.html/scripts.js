// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    startPauseBtn.textContent = 'Start';
    laps.innerHTML = '';
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);

    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);

    display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
        laps.appendChild(li);
    }
}
