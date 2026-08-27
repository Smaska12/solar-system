(function() {
    const space = document.querySelector('.space');
    window.planetsFrozen = false;
    const orbitsData = [
        { el: document.querySelector('.mercury-orbit'), speed: 360 / (20 * 60) },
        { el: document.querySelector('.venus-orbit'), speed: 360 / (25 * 60) },
        { el: document.querySelector('.earth-orbit'), speed: 360 / (30 * 60) },
        { el: document.querySelector('.mars-orbit'), speed: 360 / (35 * 60) },
        { el: document.querySelector('.jupiter-orbit'), speed: 360 / (45 * 60) },
        { el: document.querySelector('.saturn-orbit'), speed: 360 / (60 * 60) },
        { el: document.querySelector('.uranus-orbit'), speed: 360 / (90 * 60) },
        { el: document.querySelector('.neptune-orbit'), speed: 360 / (120 * 60) }
    ]

    orbitsData.forEach(orbit => {
        orbit.angle = 0;
    });

    function animatePlanets() {
        const scale = window.planetsFrozen ? 0 : (window.timeScale || 1);

        orbitsData.forEach(orbit => {
            orbit.angle += orbit.speed * scale;

            orbit.el.style.transform = `translate(-50%, -50%) rotate(${orbit.angle}deg)`;
        });

        requestAnimationFrame(animatePlanets);
    }

    space.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('planet')) {
            window.planetsFrozen = true;
        }
    })
    space.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('planet')) {
            window.planetsFrozen = false;
        }
    })

    animatePlanets();
})();