// Define selected color and dragging state
let selectedColor = 'black';
let isDragging = false;

// Event listener when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const gridsize = 32;
    const colors = ['#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00',
                    '#ADFF2F', '#00FF00', '#32CD32', '#00FA9A', '#00FFFF',
                    '#1E90FF', '#0000FF', '#00008B', '#8A2BE2', '#FF00FF',
                    '#FF69B4', '#FF1493', '#C71585', '#A0522D', '#8B4513']
                    
    // Initialize the canvas, color pallete, and reset button
    createPixelCanvas(gridsize);
    createColorPalette(colors);
    initColorPicker();
    setupResetButton();
    setupGridSizeButton();
});

// Function to create the pixel canvas grid
function createPixelCanvas(size) {
    const canvas =  document.getElementById('pixelCanvas');
    canvas.innerHTML = '';
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    // Create pixels and add event listeners for painting and drag painting
    for (let i =0; i < size * size; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        canvas.appendChild(pixel);
        pixel.addEventListener('click', colorPixel);
        pixel.addEventListener('mouseover', colorPixelOnDrag);
    }

    // Event listeners to handle the start and end of dragging
    canvas.addEventListener('mousedown', () => isDragging = true);
    canvas.addEventListener('mouseup', () => isDragging = false);
    canvas.addEventListener('mouseleave', () => isDragging = false);
}

// Function to handle the coloring of a pixel
function colorPixel() {
    this.style.backgroundColor = selectedColor;
}

// Function to handle coloring while dragging
function colorPixelOnDrag() {
    if (isDragging) {
        colorPixel.call(this);
    }
}
// Function to create the color selection palette
function createColorPalette(colors) {
    const palette = document.getElementById('colorPalette');
    // Create and append choices to the palette
    colors.forEach(color => {
        let colorChoice = document.createElement('div');
        colorChoice.classList.add('colorChoice');
        colorChoice.style.backgroundColor = color;
        palette.appendChild(colorChoice);
        // Event listener for changing the selected color
        colorChoice.addEventListener('click', () => setSelectedColor(color));
    });
}

// Function to initialize color picker 
function initColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('change', function() {
        setSelectedColor(this.value);
    });
}
// Function to set the currently selected color
function setSelectedColor(color) {
    selectedColor =  color;
}

// Function to setup the reset button functionality
function setupResetButton() {
    const resetButton = document.getElementById('resetButton');
    // Event listener to clear the canvas when the reset button is clicked
    resetButton.addEventListener('click', resetCanvas);
}

// Function to setup the grid size input button functionality
function setupGridSizeButton() {
    const gridSizeButton = document.getElementById('gridSizeButton');
    gridSizeButton.addEventListener('click', function() {
        const newSize = parseInt(document.getElementById('gridSizeInput').value);
        if (newSize && newSize >= 2 && newSize <= 100) {
            createPixelCanvas(newSize);
        } else {
            alert('Please enter a valid grid size (between 2 and 100).');
        }
    });
}

// Function to reset the canvas to its initial state
function resetCanvas() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = '#eee';
    });
}