const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontPicker = document.getElementById("fontPicker");
const canvas = document.getElementById("mycanvas");
const clear = document.getElementById("clear-btn");
const save = document.getElementById("save-btn");
const retrieve = document.getElementById("retrieve-btn");
const ctx = canvas.getContext("2d");

let isDrawing;
colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 500, 500);
});

fontPicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener("click", () => {
  localStorage.setItem("canvasContent", canvas.toDataURL()); //convert the content into image code

  let link = document.createElement("a");
  link.download = "My canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});

retrieve.addEventListener("click", () => {
  const savedCanvas = localStorage.getItem("canvasContent");

  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
