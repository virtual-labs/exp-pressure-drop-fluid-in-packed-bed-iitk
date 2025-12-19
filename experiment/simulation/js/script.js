const steps = [
  "Step 1: Open the valve by clicking on it.",];

let currentStep = 0;
let isMuted = false;

const stepText = document.getElementById("step-text");
const nextBtn = document.getElementById("next-btn");
const speakerBtn = document.getElementById("speaker-btn");

function speak(text) {
  if (!isMuted && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  stepText.textContent = steps[0];
  speak(steps[0]);
});

nextBtn.addEventListener("click", () => {
  currentStep++;
  if (currentStep < steps.length - 1) {
    stepText.textContent = steps[currentStep];
    speak(steps[currentStep]);
  } else if (currentStep === steps.length - 1) {
    // Last step
    stepText.textContent = steps[currentStep];
    speak(steps[currentStep]);
    nextBtn.style.display = "none";
    document.getElementById("submit-btn").style.display = "inline-block";
  }

});

speakerBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  speakerBtn.textContent = isMuted ? "🔇" : "🔊";
  if (!isMuted) {
    speak(steps[currentStep]);
  } else {
    speechSynthesis.cancel();
  }
});



function rotateValve() {
  const valveButton = document.getElementById("openValveBtn");
  const valveImage = document.getElementById("valveCircularPart").querySelector(".circular-valve-image");

  valveImage.style.transform = "rotate(90deg)";


  valveButton.innerText = "Valve Opened";
  valveButton.disabled = true;
}
document.addEventListener('DOMContentLoaded', function () {
  const valve = document.querySelector('.valve2');
  const valveSound = document.getElementById('valveSound');

  if (valve && valveSound) {
    valve.addEventListener('click', () => {

      valve.classList.toggle('rotated');


      valveSound.currentTime = 0;
      valveSound.play();
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const ballClasses = ['ball1', 'ball2', 'ball3'];

  ballClasses.forEach(cls => {
    const ball = document.querySelector(`.${cls}`);


    const isOpen = localStorage.getItem(cls) === 'open';
    if (isOpen) {
      ball.classList.add('ball-open');
    }

    // Toggle on click
    ball.addEventListener('click', () => {
      const currentlyOpen = ball.classList.contains('ball-open');
      if (currentlyOpen) {
        ball.classList.remove('ball-open');
        localStorage.setItem(cls, 'closed');
      } else {
        ball.classList.add('ball-open');
        localStorage.setItem(cls, 'open');
      }
    });
  });
});



const toggleBtn = document.getElementById("toggleBtn");
const water = document.getElementById("waterlevel");
const waterSound = document.getElementById("waterSound"); //  sound element

let isRunning = false;
let currentHeight = parseFloat(localStorage.getItem("waterlevel")) || 10;
let interval;

water.style.height = `${currentHeight}%`;

toggleBtn.addEventListener("click", () => {
  isRunning = !isRunning;

  if (isRunning) {
    toggleBtn.classList.remove("red");
    toggleBtn.classList.add("green");

    // Play sound
    waterSound.play();

    interval = setInterval(() => {
      if (currentHeight < 100) {
        currentHeight += 0.2;
        water.style.height = `${currentHeight}%`;
        localStorage.setItem("waterlevel", currentHeight.toFixed(1));
      } else {
        clearInterval(interval);
        waterSound.pause(); // ← sound stop if water is full
        waterSound.currentTime = 0;
      }
    }, 100);
  } else {
    toggleBtn.classList.remove("green");
    toggleBtn.classList.add("red");

    clearInterval(interval);

    // Pause sound
    waterSound.pause();
    waterSound.currentTime = 0; // reset to start
  }
});



const motorBtn = document.getElementById("motorBtn");
const utubeWater = document.getElementById("utubeWater");
const measurementTank = document.getElementById("waterlevel");

let motorRunning = false;
let waterTransferInterval = null;

let measurementTankHeight = parseFloat(localStorage.getItem("waterlevel")) || 10;
let utubeTubeHeight = parseFloat(localStorage.getItem("utubeWaterLevel")) || 10;

window.addEventListener("DOMContentLoaded", () => {
  measurementTank.style.height = `${measurementTankHeight}%`;
  utubeWater.style.height = `${utubeTubeHeight}%`;
});

motorBtn.addEventListener("click", () => {
  motorRunning = !motorRunning;

  const isAnyBallOpen = ['ball1', 'ball2', 'ball3'].some(cls =>
    document.querySelector(`.${cls}`).classList.contains("ball-open")
  );

  if (motorRunning && isAnyBallOpen) {
    motorBtn.classList.add("running");

    waterTransferInterval = setInterval(() => {
      if (measurementTankHeight > 0) {
        measurementTankHeight -= 0.2;
        utubeTubeHeight += 0.2;

        measurementTank.style.height = `${measurementTankHeight}%`;
        utubeWater.style.height = `${utubeTubeHeight}%`;

        localStorage.setItem("waterlevel", measurementTankHeight.toFixed(1));
        localStorage.setItem("utubeWaterLevel", utubeTubeHeight.toFixed(1));
      } else {
        clearInterval(waterTransferInterval);
      }
    }, 100);
  } else {
    clearInterval(waterTransferInterval);
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {

  localStorage.removeItem("waterlevel");
  localStorage.removeItem("utubeWaterLevel");
  ['ball1', 'ball2', 'ball3'].forEach(key => localStorage.removeItem(key));


  document.getElementById("waterlevel").style.height = "0%";
  document.getElementById("utubeWater").style.height = "0%";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "inline-block";
  document.getElementById("submit-btn").disabled = false;
  document.getElementById("left-result-table").style.display = "none";
  currentStep = 0;
  stepText.textContent = steps[0];


  ['ball1', 'ball2', 'ball3'].forEach(cls => {
    const ball = document.querySelector(`.${cls}`);
    ball?.classList.remove("ball-open");
  });

  alert("Experiment reset successfully!");
});



document.getElementById("submit-btn").addEventListener("click", () => {

  const D1 = 2.5;
  const D2 = 1.5;
  const A = 100;
  const h = 20;
  const timeTaken = 25;

  const Q = (A * 10) / timeTaken;
  const a1 = (Math.PI * D1 * D1) / 4;
  const a0 = (Math.PI * D2 * D2) / 4;
  const g = 981;
  const Qt = a0 * Math.sqrt((2 * g * h) / (1 - Math.pow(a0 / a1, 2)));
  const Cd = Q / Qt;

  document.getElementById("timeTakenLeft").textContent = timeTaken.toFixed(2) + " sec";
  document.getElementById("qValueLeft").textContent = Q.toFixed(2) + " cm³/s";
  document.getElementById("qtValueLeft").textContent = Qt.toFixed(2) + " cm³/s";
  document.getElementById("cdValueLeft").textContent = Cd.toFixed(4);
  document.getElementById("left-result-table").style.display = "block";


  document.getElementById("submit-btn").disabled = true;
});






