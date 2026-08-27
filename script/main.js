window.timeScale = 1;
const btn = document.querySelector('.space-speed');

btn.addEventListener('click', () => {
    window.timeScale = window.timeScale === 1 ? 3 : window.timeScale === 3 ? 5 : 1;

    document.documentElement.style.setProperty('--timeScale', window.timeScale);

    btn.textContent = window.timeScale + "x";
})