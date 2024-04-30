document.addEventListener('DOMContentLoaded', function() {
    const downloadContainer = document.getElementById('downloadContainer');
    const colorPalette = document.getElementById('color-palette');

    function generateColorPalette() {
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
                    <div class="copy-icon mt-2 flex justify-center"><img src="images/icons8-copy-24.png"></div>
                    <div class="lock-icon mt-2 flex justify-center">${lockedColors.includes(color) ? '🔒' : '🔓'}</div>
                </div>

            `;
            colorDiv.classList.add('color', 'w-full', 'flex', 'py-80','h-100', 'text-lg', 'justify-center', 'font-semibold');
        
            const copyIcon = colorDiv.querySelector('.copy-icon');
            copyIcon.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click event from bubbling to colorDiv
                copyToClipboard(color);
                alert(`Color code "${color}" copied to clipboard!`);
            });
        
            colorPalette.appendChild(colorDiv);
        });

        // Create and append the download button
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.addEventListener('click', downloadImage);
        downloadButton.classList.add('download-button', 'bg-green-500', 'hover:bg-green-600', 'text-white', 'font-bold', 'py-2', 'px-2', 'rounded-full');
        downloadContainer.innerHTML = ''; // Clear previous download button
        downloadContainer.appendChild(downloadButton);
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    // Event listener for spacebar key press to generate color palette
    document.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            event.preventDefault(); // Prevent default spacebar behavior (like scrolling)
            generateColorPalette();
        }
    });

    // Initial color palette generation
    generateColorPalette();
});


document.getElementById('download').addEventListener('click', (e) => {
    downloadImage();
});

function downloadImage() {
    const colorPalette = document.getElementById('color-palette');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = colorPalette.offsetWidth;
    canvas.height = colorPalette.offsetHeight;

    let x = 0;
        colorPalette.querySelectorAll('.color').forEach((colorDiv) => {
        const color = colorDiv.style.backgroundColor;
        const colorCode = colorDiv.querySelector('.color-code').textContent; 

        ctx.fillStyle = color;
        ctx.fillRect(x, 0, colorDiv.offsetWidth, colorPalette.offsetHeight);

        const centerX = x + colorDiv.offsetWidth / 2;


        ctx.fillStyle = '#000000'; 
        ctx.font = '24px Arial';
        ctx.textAlign = 'center'; // Center the text horizontally
        ctx.textBaseline = 'middle'; // Center the text vertically
        ctx.fillText(colorCode, centerX, colorPalette.offsetHeight / 2); // Draw color code at the center of the color block

        // Update x-coordinate for the next color block
    x += colorDiv.offsetWidth;
});


    const dataURL = canvas.toDataURL('image/png');

    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'color-palette.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);


    // Color palette - 1 = ex: 100 -> panel 100/5 = 20
    // color code - 5 = W 

    // Start = 0, 20, 40, 60, 80
    // Inner center position = (panel - colorCodeWidth)/2
    // Absolute center position = Inner center position + Start
}

