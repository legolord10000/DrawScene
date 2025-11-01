// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Get references to the control buttons
const sunBtn = document.getElementById('sunBtn');
const grassBtn = document.getElementById('grassBtn');
const boulderBtn = document.getElementById('boulderBtn');
const nightBtn = document.getElementById('nightBtn');
const houseBtn = document.getElementById('houseBtn'); 
const signBtn = document.getElementById('signBtn'); 

// Flags to control visibility of different scene elements
let showSun = false;
let showMoon = false;
let showGrass = false;
let showBoulder = false;
let showHouse = false; 
let showSign = false; 
let isNight = false; // Flag to determine if it's night or day
let currentSkyColor = 'skyblue'; // Default sky color

// Function to draw the background sky
function drawSky() {
  ctx.fillStyle = currentSkyColor;
  ctx.fillRect(0, 0, 500, 400);
}

// Function to draw the sun
function drawSun() {
  ctx.beginPath();
  ctx.arc(100, 100, 50, 0, Math.PI * 2);
  ctx.fillStyle = 'yellow';
  ctx.fill();
}

// Function to draw the moon with craters
function drawMoon() {
  // Fill background with dark blue to simulate night sky
  ctx.fillStyle = 'darkblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw the bright moon circle
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, Math.PI * 2);
  ctx.fillStyle = 'lightgray';
  ctx.fill();

  // Overlay a dark blue circle to create crescent effect
  ctx.globalCompositeOperation = 'source-over'; 
  ctx.beginPath();
  ctx.arc(130, 100, 40, 0, Math.PI * 2); 
  ctx.fillStyle = 'darkblue'; 
  ctx.fill();

  // Reset composite mode
  ctx.globalCompositeOperation = 'source-over';
}

// Function to draw grass
function drawGrass() {
  ctx.fillStyle = 'limegreen';
  ctx.fillRect(0, 300, 500, 100);
}

// Function to draw a boulder with bezier curves and circles for texture
function drawBoulder() {
  ctx.fillStyle = 'gray';

  ctx.beginPath();
  ctx.moveTo(250, 350);
  
  // Draw the irregular shape of the boulder
  ctx.bezierCurveTo(280, 330, 330, 370, 300, 390);
  ctx.bezierCurveTo(250, 410, 200, 370, 250, 350);
  
  // Draw some circles on the boulder for texture
  ctx.moveTo(280, 360);
  ctx.arc(280, 360, 15, 0, Math.PI * 2);
  
  ctx.moveTo(220, 370);
  ctx.arc(240, 370, 10, 0, Math.PI * 2);
  
  ctx.moveTo(260, 340);
  ctx.arc(260, 355, 15, 0, Math.PI * 2);
  
  ctx.fill();
}

// Function to draw a house with a roof, door, and windows
function drawHouse() {
  const houseX = 300;
  const houseY = 250;
  const houseSize = 100;

  // Draw house body
  ctx.fillStyle = 'yellow';
  ctx.fillRect(houseX, houseY, houseSize, houseSize);

  // Draw roof
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(houseX, houseY);
  ctx.lineTo(houseX + houseSize / 2, houseY - houseSize / 2);
  ctx.lineTo(houseX + houseSize, houseY);
  ctx.closePath();
  ctx.fill();

  // Draw door
  const doorWidth = houseSize / 4;
  const doorHeight = doorWidth * 1.5; 
  ctx.fillStyle = 'purple';
  ctx.fillRect(houseX + houseSize / 2 - doorWidth / 2, houseY + houseSize - doorHeight, doorWidth, doorHeight);

  // Draw windows
  const windowSize = houseSize / 5;
  ctx.fillStyle = 'purple';
  ctx.fillRect(houseX + houseSize / 4 - windowSize / 2, houseY + houseSize / 3, windowSize, windowSize);
  ctx.fillRect(houseX + (3 * houseSize) / 4 - windowSize / 2, houseY + houseSize / 3, windowSize, windowSize);
}

// Function to redraw the entire scene based on current flags
function redrawScene() {
  ctx.clearRect(0, 0, 500, 400); // Clear previous frame
  drawSky(); // Draw sky background

  // Draw sun or moon based on time of day
  if (showSun && !isNight) {
    drawSun();
  }
  if (showMoon && isNight) {
    drawMoon();
  }

  // Draw other elements if their flags are set
  if (showGrass) {
    drawGrass();
  }
  if (showBoulder) {
    drawBoulder();
  }
  if (showHouse) {
    drawHouse();
  }
  if (showSign) {
    drawSign();
  }
}

// Function to toggle between day and night
function toggleNight() {
  if (!isNight) {
    // Switch to night
    isNight = true;
    currentSkyColor = 'darkblue';

    // Switch sun and moon visibility
    if (showSun) {
      showSun = false;
      showMoon = true;
    } else {
      showMoon = false;
    }

    // Update button labels
    nightBtn.textContent = 'Day';
    sunBtn.textContent = 'Moon';

  } else {
    // Switch to day
    isNight = false;
    currentSkyColor = 'skyblue';

    // Switch moon and sun visibility
    if (showMoon) {
      showMoon = false;
      showSun = true;
    } else {
      showSun = false;
    }

    // Update button labels
    nightBtn.textContent = 'Night';
    sunBtn.textContent = 'Sun';
  }
  redrawScene(); // Refresh the scene
}

// Function to draw a sign
function drawSign() {
  ctx.fillStyle = 'gray';
  ctx.fillRect(360 + 90, 280 + 50, 10, 60);
  ctx.fillStyle = 'green';
  ctx.fillRect(350 + 80, 280 + 50, 50, 15); 
  ctx.fillStyle = 'gray';
  ctx.fillRect(240 + 100, 300 + 50, 20, 60);
}

// Event handler for sun button
sunBtn.onclick = () => {
  if (!isNight) {
    showSun = !showSun; // Toggle sun visibility during day
  } else {
    showMoon = !showMoon; // Toggle moon during night
  }
  redrawScene();
};

// Event handler for night button
nightBtn.onclick = () => {
  toggleNight();
};

// Event handler for grass button
grassBtn.onclick = () => {
  showGrass = !showGrass;
  redrawScene();
};

// Event handler for boulder button
boulderBtn.onclick = () => {
  showBoulder = !showBoulder;
  redrawScene();
};

// Event handler for house button
houseBtn.onclick = () => {
  showHouse = !showHouse;
  redrawScene();
};

// Event handler for sign button
signBtn.onclick = () => {
  showSign = !showSign;
  redrawScene();
};

// Initialize the scene when window loads
window.onload = () => {
  drawSky();
};