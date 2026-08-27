(function() {
    const asteroidCanvas = document.getElementById('asteroids');
    const space = document.querySelector('.space');
    const ctx2 = asteroidCanvas.getContext('2d');

    const countAsteroids = 300;
    let asteroids = [];

    const beltInnerRadius = 350;
    const beltOuterRadius = 450;

    function initAsteroids() {
        asteroids = Array.from({ length: countAsteroids }, () => {
            const angle = Math.random() * Math.PI * 2;
            const distance = beltInnerRadius + Math.random() * (beltOuterRadius - beltInnerRadius);

            return {
                angle: angle,
                distance: distance,
                radius: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.001 + 0.0001,
                color: `rgba(180, 180, 180, ${Math.random() * 0.6 + 0.2})`
            };
        });
    }

    function resizeAsteroids() {
        asteroidCanvas.width = space.clientWidth;
        asteroidCanvas.height = space.clientHeight;
        initAsteroids()
    }

    function draw() {
        ctx2.clearRect(0, 0, asteroidCanvas.width, asteroidCanvas.height);    
        const centerX = asteroidCanvas.width / 2;
        const centerY = asteroidCanvas.height / 2;

        asteroids.forEach(ast => {
            ast.angle += ast.speed * window.timeScale;

            const x = centerX + Math.cos(ast.angle) * ast.distance;
            const y = centerY + Math.sin(ast.angle) * ast.distance;

            ctx2.beginPath();
            ctx2.arc(x, y, ast.radius, 0, Math.PI * 2);
            ctx2.fillStyle = ast.color;
            ctx2.fill();
        });

        requestAnimationFrame(draw);
    }

    resizeAsteroids();
    window.addEventListener('resize', resizeAsteroids);
    initAsteroids();
    draw();
})();