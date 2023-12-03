const activeAlarms = document.getElementById("active-alarms");

function startNewTimer() {
    const hours = document.getElementById("hours").value || 0;
    const minutes = document.getElementById("minutes").value || 0;
    const seconds = document.getElementById("seconds").value || 0;
    //console.log(hours, minutes, seconds);
    if (!hours && !minutes && !seconds) {
        alert("Enter valid time");
        return;
    }
    // remove no-timer div
    const noTimersDiv = document.getElementById("no-timers");
    noTimersDiv.style.display = "none";

    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    createTimer(totalSeconds);
}

function createTimer(timeInSeconds) {
    const timerDiv = document.createElement("div");

    const timeLeftText = document.createElement("div");
    timeLeftText.className = "time-text";
    timeLeftText.textContent = "Time Left :";
    timerDiv.appendChild(timeLeftText);

    const timerDisplay = document.createElement("span");
    timerDisplay.className = "timer-display";
    timerDiv.appendChild(timerDisplay);

    const hoursDisplay = document.createElement("span");
const minutesDisplay = document.createElement("span");
const secondsDisplay = document.createElement("span");

timerDisplay.appendChild(hoursDisplay);
timerDisplay.appendChild(document.createTextNode(':'));
timerDisplay.appendChild(minutesDisplay);
timerDisplay.appendChild(document.createTextNode(':'));
timerDisplay.appendChild(secondsDisplay);
    //set time interval
    const timeInterval = setInterval(() => {
        timeInSeconds--; //to count time 59,58....
        const displayHours = Math.floor(timeInSeconds / 3600);
        const displayMinutes = Math.floor((timeInSeconds % 3600) / 60);
        const displaySeconds = Math.floor(timeInSeconds % 60);
        // timerDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;

        hoursDisplay.textContent = displayHours;
        minutesDisplay.textContent = displayMinutes;
        secondsDisplay.textContent = displaySeconds;

        // after zero set timeup
        if (timeInSeconds <= 0) {
            let audio = new Audio('./ping-82822.mp3')
            audio.play();
            clearInterval(timeInterval);
            
            const endMsg = document.createElement("div");
            endMsg.className = "time-up";
            endMsg.innerText = "Timer is Up!";

            //delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => {
                activeAlarms.removeChild(timerDiv);
            };
            // background color to yellow
            timerDiv.style.backgroundColor = "yellow";
            endMsg.style.backgroundColor = "yellow";
            endMsg.style.color = "black";
            // button color to black
            deleteButton.style.backgroundColor = "black";
            deleteButton.style.color = "white";

            timerDiv.innerHTML = "";
            timerDiv.appendChild(endMsg);
            timerDiv.appendChild(deleteButton);

        }
    }, 1000);

    // stop button
    const stopButton = document.createElement("button");
    stopButton.textContent = "Stop";
    stopButton.onclick = () => {
        clearInterval(timeInterval);
    }

    activeAlarms.appendChild(timerDiv);
    timerDiv.appendChild(stopButton);
    
}