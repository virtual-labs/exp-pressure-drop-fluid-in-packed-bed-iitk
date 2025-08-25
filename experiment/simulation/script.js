// State variables
let heightt = 10;
let angle = 0;
let out = 0;
let iin = 0;
let ball = 0;
let left = 0;
let right = 0;
let discard = 0;
let packedwater = 0;
let tankk = 250;
let count = 0;
let shouldVibrate = false;
let isOn = false;

// Instructions array
const instructions = [
    "click on the motor button to switch the motor on",
    "click the bypass value to better control the flow of water",
    "the rate of flow in the tower can be controlled by a valve in the inlet pipe",
    "The inlet valve is maintained in such a way that level of water in manometric tubes are equal",
    "The water is allowed to flow through the packing in the tower. All the air pockets in the tower and in the manometer are removed",
    "The distance between the pressure taps is noted as height of the tower(L).",
    "The outlet valve is opened",
    "Time taken to collect the water is noted.",
    "The flow rate is calculated from the volume of water collected or rotameter connected to setup"
];

// Initialize display when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateInstruction();
    updateDisplay();
});

// Navigation functions
function previous() {
    if (count !== 0) {
        count--;
        updateInstruction();
    }
}

function next() {
    if (count !== 8) {
        count++;
        updateInstruction();
    }
}

function updateInstruction() {
    const instructionElement = document.getElementById('instruction-content');
    if (instructionElement) {
        instructionElement.textContent = instructions[count];
    }
}

// Toggle switch function
function toggle() {
    isOn = !isOn;
    shouldVibrate = !shouldVibrate;
    
    const toggleSwitch = document.getElementById('toggleSwitch');
    const tank = document.getElementById('tank');
    
    if (isOn) {
        toggleSwitch.classList.add('active');
        count++;
        if (shouldVibrate) {
            tank.classList.add('vibrate');
        }
    } else {
        toggleSwitch.classList.remove('active');
        count--;
        tank.classList.remove('vibrate');
    }
    
    updateInstruction();
}

// Inlet valve function
function inValue() {
    if (left < 50 && count === 2) {
        iin += 45;
        left += 25;
        right -= 25;
        packedwater += 150;
        updateDisplay();
    }
}

// Outlet valve function
function outValue() {
    if (discard < 260 && count === 6) {
        out += 45;
        
        setTimeout(() => {
            discard += 260;
            updateDisplay();
        }, 2000);
        
        setTimeout(() => {
            tankk += 50;
            updateDisplay();
        }, 3000);
        
        updateDisplay();
    }
}

// Bypass valve function
function bypass() {
    if (tankk > 150 && count === 1) {
        tankk -= 50;
    }
    if (heightt<195){
  heightt += 55;
    }
    if (ball > -200 && count === 1) {
        ball -= 20;
      
        angle += 20;
        updateDisplay();
    }
}

// Update display function
function updateDisplay() {
    // Update handle rotations
    const outletHandle = document.getElementById('outletHandle');
    if (outletHandle) {
        outletHandle.style.transform = `rotate(${out}deg)`;
    }
    
    const inletHandle = document.getElementById('inletHandle');
    if (inletHandle) {
        inletHandle.style.transform = `rotate(${iin}deg)`;
    }
    
    const bypassHandle = document.getElementById('bypassHandle');
    if (bypassHandle) {
        bypassHandle.style.transform = `rotate(${angle}deg)`;
    }
    
    // Update water levels
    const waterLevel = document.getElementById('waterLevel');
    if (waterLevel) {
        waterLevel.style.height = `${discard}px`;
    }
    
    const packedWaterFill = document.getElementById('packedWaterFill');
    if (packedWaterFill) {
        packedWaterFill.style.height = `${packedwater}px`;
    }
    
    const tankWaterFill = document.getElementById('tankWaterFill');
    if (tankWaterFill) {
        tankWaterFill.style.height = `${tankk}px`;
    }
    
    const rotameterWater = document.getElementById('rotameterWater');
    if (rotameterWater) {
        rotameterWater.style.height = `${heightt}px`;
    }
    
    // Update manometer levels
    const manometerLeft = document.getElementById('manometerLeft');
    if (manometerLeft) {
        manometerLeft.style.transform = `translateY(${left}px)`;
    }
    
    const manometerRight = document.getElementById('manometerRight');
    if (manometerRight) {
        manometerRight.style.transform = `translateY(${right}px)`;
    }
    
    // Update sphere position
    const sphere = document.getElementById('sphere');
    if (sphere) {
        sphere.style.transform = `translateY(${ball}px)`;
    }
}

// Utility functions for smooth animations
function animateValue(element, property, startValue, endValue, duration) {
    const start = performance.now();
    const change = endValue - startValue;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeProgress = progress * (2 - progress);
        const currentValue = startValue + (change * easeProgress);
        
        element.style[property] = `${currentValue}px`;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Error handling for missing elements
function safeElementUpdate(elementId, updateFunction) {
    const element = document.getElementById(elementId);
    if (element) {
        updateFunction(element);
    } else {
        console.warn(`Element with id '${elementId}' not found`);
    }
}

// Initialize the application
function init() {
    updateInstruction();
    updateDisplay();
    
    // Add event listeners for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            previous();
        } else if (event.key === 'ArrowRight') {
            next();
        }
    });
}

// Call init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}