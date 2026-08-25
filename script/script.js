const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const STAR_COUNT = 200;
const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.3,
    baseAlpha: Math.random() * 0.5 + 0.2,
    twinkleSpeed: Math.random() * 0.008 + 0.0008,
    phase: Math.random() * Math.PI * 2
}));

let shootingStars = [];

function maybeSpawnShootingStar() {
    if (Math.random() < 0.003) { 
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4,
        alpha: 1
        });
    }
}

function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);
        const alpha = star.baseAlpha + twinkle * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`;
        ctx.fill();
    });

    maybeSpawnShootingStar();
    shootingStars.forEach(s => {
        const tailX = s.x - s.length * Math.cos(s.angle);
        const tailY = s.y - s.length * Math.sin(s.angle);

        const tailGradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        tailGradient.addColorStop(0, `rgba(255, 244, 200, ${s.alpha})`);
        tailGradient.addColorStop(0.4, `rgba(255, 255, 255, ${s.alpha * 0.6})`);
        tailGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.strokeStyle = tailGradient;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        const glowRadius = 8;
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowRadius);
        glow.addColorStop(0, `rgba(255, 250, 220, ${s.alpha})`);
        glow.addColorStop(0.5, `rgba(255, 250, 220, ${s.alpha * 0.3})`);
        glow.addColorStop(1, `rgba(255, 250, 220, 0)`);

        ctx.beginPath();
        ctx.arc(s.x, s.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 250, 220, ${s.alpha})`;
        ctx.fill();

        s.x += s.speed * Math.cos(s.angle);
        s.y += s.speed * Math.sin(s.angle);
        s.alpha -= 0.01;
    });
    shootingStars = shootingStars.filter(s => s.alpha > 0);

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);