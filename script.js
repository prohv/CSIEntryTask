document.addEventListener("DOMContentLoaded", function () {
    const canvasContainer = document.querySelector(".canvas-container");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let drawing = false;
    let isTextMode = false;
    
    function setupCanvas() {
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvasContainer.appendChild(canvas);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Ensure background is white
    }
    
    function startDrawing(e) {
        if (isTextMode) return;
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
    
    function draw(e) {
        if (!drawing || isTextMode) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
    }
    
    function stopDrawing() {
        drawing = false;
        ctx.closePath();
    }
    
    function clearCanvas() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function saveCanvas() {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        
        const link = document.createElement("a");
        link.download = "canvas-drawing.jpg";
        link.href = tempCanvas.toDataURL("image/jpeg");
        link.click();
    }
    
    function addText(event) {
        if (!isTextMode) return;
        const text = prompt("Enter your text:");
        if (text) {
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(text, event.offsetX, event.offsetY);
        }
        isTextMode = false;
    }
    
    function enableTextMode() {
        isTextMode = true;
        alert("Click anywhere on the canvas to add text.");
    }
    
    function generateShareableLink() {
        const imageData = canvas.toDataURL("image/png");
        navigator.clipboard.writeText(imageData).then(() => {
            alert("Canvas image link copied to clipboard!");
        });
    }
    
    document.querySelector(".toolbar button:first-child").addEventListener("click", function () {
        if (!canvasContainer.contains(canvas)) {
            setupCanvas();
        }
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);
        canvas.addEventListener("click", addText);
    });
    
    document.querySelector(".toolbar button:nth-child(2)").addEventListener("click", enableTextMode);
    document.querySelector(".toolbar button:nth-child(3)").addEventListener("click", clearCanvas);
    document.querySelector(".toolbar button:nth-child(4)").addEventListener("click", saveCanvas);
    document.querySelector(".toolbar button:nth-child(5)").addEventListener("click", generateShareableLink);
    
    window.addEventListener("resize", function () {
        if (canvasContainer.contains(canvas)) {
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas.width = canvasContainer.clientWidth;
            canvas.height = canvasContainer.clientHeight;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);
        }
    });
});

