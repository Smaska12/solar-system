const space = document.querySelector('.space');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const modalTitle = document.querySelector('.modal-title');
const modalTemp = document.querySelector('.modal-temp');
const modalDesc = document.querySelector('.modal-desc');
const modalImg = document.querySelector('.modal-img');
const closeBtn = document.querySelector('.close-modal');

const planetData = {
    mercury: { title: "Меркурий", temp: "430°C", desc: "Самая близкая к Солнцу планета. У неё нет атмосферы, поэтому днём там адская жара, а ночью — ледяной холод.", img: "img/mercury.png" },
    venus: { title: "Венера", temp: "462°C", desc: "Самая горячая планета из-за мощного парникового эффекта. Она вращается в обратную сторону по сравнению с большинством других планет.", img: "img/venus.png" },
    earth: { title: "Земля", temp: "14°C", desc: "Наш дом. Единственная известная планета, на которой есть жизнь и жидкая вода на поверхности.", img: "img/earth.png" },
    mars: { title: "Марс", temp: "-63°C", desc: "Красная планета, названная так из-за оксида железа в почве. Здесь находится самая высокая гора в Солнечной системе — Олимп.", img: "img/mars.png" },
    jupiter: { title: "Юпитер", temp: "-108°C", desc: "Газовый гигант и самая большая планета в системе. Знаменит своим Большим Красным Пятном — гигантским штормом, бушующим уже сотни лет.", img: "img/jupiter.png" },
    saturn: { title: "Сатурн", temp: "-139°C", desc: "Властелин колец. Его знаменитые кольца состоят из миллиардов кусочков льда и камня. Самая легкая планета — она могла бы плавать в воде!", img: "img/saturn.png" },
    uranus: { title: "Уран", temp: "-197°C", desc: "Ледяной гигант, который вращается «лежа на боку». Имеет самый холодный климат среди всех планет и бледно-голубой цвет из-за метана.", img: "img/uranus.png" },
    neptune: { title: "Нептун", temp: "-201°C", desc: "Самая дальняя планета от Солнца. Здесь дуют самые сильные ветры в Солнечной системе, достигающие скорости 2100 км/ч.", img: "img/neptune.png" },
};

function openModal(planetName) {
    const data = planetData[planetName];

    if (data) {
        modalTitle.textContent = data.title;
        modalTemp.textContent = `Температура: ${data.temp}`;
        modalDesc.textContent = data.desc;
        if (data.img) {
            modalImg.src = data.img;
            modalImg.style.display = 'block';
        }
        else {
            modalImg.style.display = 'none';
        }

        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

space.addEventListener('click', (event) => {
    if (event.target.classList.contains('planet')) {
        const name = event.target.getAttribute('data-name');
        openModal(name);
    }
})

overlay.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
})

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
})

window.addEventListener('click', (event) => {
    if (event.target === overlay) {
        modal.classList.remove('active');
    }
})