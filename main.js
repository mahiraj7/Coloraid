document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        generateColorPalette();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        event.preventDefault(); // Prevent the default action of spacebar
        generateColorPalette();
    }
});

const generateColorPalette = () => {
    const colorPalette = document.getElementById('color-palette');
    colorPalette.innerHTML = '';

    const colors = Array.from({ length: 5 }, () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    });
    let lockedColors = []; 
    colors.forEach((color) => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = color;
        colorDiv.innerHTML = `
            <div class="color-info">
                <div class="color-code">${color}</div>
                <div class="copy-icon"><img src="images/icons8-copy-24.png"</div>
                <div class="lock-icon">${lockedColors.includes(color) ? '🔒' : '🔓'}</div>
            </div>
        `;
        colorDiv.classList.add('color', 'w-full', 'h-24', 'md:h-96', 'text-center', 'font-semibold');
    
        const copyIcon = colorDiv.querySelector('.copy-icon');
        copyIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click event from bubbling to colorDiv
            copyToClipboard(color);
            alert(`Color code "${color}" copied to clipboard!`);
        });
    
        colorDiv.addEventListener('click', () => {
            // Handle colorDiv click event here if needed
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
