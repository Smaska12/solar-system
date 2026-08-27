(function() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');

    const STAR_COUNT = 300;
    let stars = []
    function initStars() {
        stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.3,
            baseAlpha: Math.random() * 0.5 + 0.2,
            twinkleSpeed: Math.random() * 0.008 + 0.0008,
            phase: Math.random() * Math.PI * 2
        }));
    } 

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars()
    }
    resize();
    window.addEventListener('resize', resize);



    let shootingStars = [];

    function maybeSpawnShootingStar() {
        if (Math.random() < 0.003 * window.timeScale) { 
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
            const twinkle = Math.sin(time * star.twinkleSpeed * window.timeScale + star.phase);
            const alpha = star.baseAlpha + twinkle * 0.3;
            const radius = star.radius * window.pageScale;
            ctx.beginPath();
            ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`;
            ctx.fill();
        });

        maybeSpawnShootingStar();
        shootingStars.forEach(s => {
            const scale = window.pageScale;
            const length = s.length * scale;

            const tailX = s.x - length * Math.cos(s.angle);
            const tailY = s.y - length * Math.sin(s.angle);

            const tailGradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
            tailGradient.addColorStop(0, `rgba(255, 244, 200, ${s.alpha})`);
            tailGradient.addColorStop(0.4, `rgba(255, 255, 255, ${s.alpha * 0.6})`);
            tailGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.beginPath();
            ctx.strokeStyle = tailGradient;
            ctx.lineWidth = 2 * scale;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            const glowRadius = 8 * scale;
            const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowRadius);
            glow.addColorStop(0, `rgba(255, 250, 220, ${s.alpha})`);
            glow.addColorStop(0.5, `rgba(255, 250, 220, ${s.alpha * 0.3})`);
            glow.addColorStop(1, `rgba(255, 250, 220, 0)`);

            ctx.beginPath();
            ctx.arc(s.x, s.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(s.x, s.y, 2 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 250, 220, ${s.alpha})`;
            ctx.fill();

            s.x += s.speed * Math.cos(s.angle) * window.timeScale;
            s.y += s.speed * Math.sin(s.angle) * window.timeScale;
            s.alpha -= 0.01 * window.timeScale;
        });
        shootingStars = shootingStars.filter(s => s.alpha > 0);

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})();