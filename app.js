document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        generateColorPalette();
    }
});

const generateColorPalette = () => {
    const colorPalette = document.getElementById('color-palette');
    colorPalette.innerHTML = '';

    const colors = Array.from({ length: 5 }, () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    });

    colors.forEach((color) => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = color;
        colorDiv.innerHTML = color;
        colorDiv.classList.add('color', 'w-60', 'h-60', 'text-center', 'font-semibold');

        colorDiv.addEventListener('click', () => {
            copyToClipboard(color);
            alert(`Color code "${color}" copied to clipboard!`);
        });

        colorPalette.appendChild(colorDiv);
    });

    // Create and append the download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Palette';
    downloadButton.addEventListener('click', downloadImage);
    downloadButton.classList.add('download-button')
    colorPalette.appendChild(downloadButton);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

const downloadImage = () => {
    const colorPalette = document.getElementById('color-palette');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = colorPalette.offsetWidth;
    canvas.height = colorPalette.offsetHeight;

    // Draw the color palette onto the canvas
    ctx.fillStyle = '#ffffff'; // Set canvas background color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas with white
    colorPalette.querySelectorAll('.color').forEach((colorDiv, index) => {
        const x = index * (colorDiv.offsetWidth); 
        ctx.fillStyle = colorDiv.style.backgroundColor ;
        ctx.fillRect(x, 0, colorDiv.offsetWidth, colorDiv.offsetHeight, colorPalette.color);
    });

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL('image/png');

    // Create a download link and trigger the download
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'color-palette.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

generateColorPalette(); // Call this function to generate the initial color palette
