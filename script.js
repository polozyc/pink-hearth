const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const phrase = "I LOVE YOU";
const points = [];

function createHeart() {
    points.length = 0;

    for (let t = 0; t < Math.PI * 2; t += 0.06) {

        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t)
              - 5 * Math.cos(2 * t)
              - 2 * Math.cos(3 * t)
              - Math.cos(4 * t);

        let scale = Math.min(canvas.width, canvas.height) / 40;

        points.push({
            x: canvas.width / 2 + x * scale,
            y: canvas.height / 2 - y * scale
        });
    }
}

function drawHeart() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#ff5ca8";
    ctx.font = "12px monospace";
    ctx.textAlign = "center";

    for(let i=0; i<points.length; i++){

        let p = points[i];
        let next = points[(i+1)%points.length];

        let angle = Math.atan2(next.y-p.y,next.x-p.x);

        ctx.save();

        ctx.translate(p.x,p.y);
        ctx.rotate(angle);

        ctx.fillText(phrase,0,0);

        ctx.restore();
    }

    requestAnimationFrame(drawHeart);
}

createHeart();
drawHeart();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createHeart();
});