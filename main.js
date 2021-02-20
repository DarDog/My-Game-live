const canvas = document.querySelector('#c1'),
    ctx = canvas.getContext('2d'),
    startBtn = document.querySelector('#start'),
    stopBtn = document.querySelector('#stop');

let mas = [],
    mas2 = [],
    count = 0,
    timer,
    Xspeed = document.querySelector('#speed');

lifeLand();

function lifeLand() { // Создание поля
    let n = 30,
        m = 30;
    for (let i = 0; i < m; i++) {
        mas[i] = [];
        mas2[i] = [];
        for (let j = 0; j < n; j++) {
            mas[i][j] = 0;
            mas[i][j] = 0
        }
    }
}

canvas.onclick = function (event) { // Клик по полю
    let x = event.offsetX, // Определение координат клика
        y = event.offsetY;
    x = Math.floor(x / 10); // Преоброзование координат к сетке
    y = Math.floor(y / 10); // 300 /10 = 30
    // mas[y][x] = 1;
    // drawField();
    if (mas[y][x] === undefined) {
        mas[y][x] = 1;
        drawField();
    } else if (mas[y][x] === 0) {
        mas[y][x] = 1;
        drawField();
    } else if (mas[y][x] !== 0) {
        mas[y][x] = 0;
        drawField();
    }
}

function drawField() { // Отрисовка точки
    ctx.clearRect(0, 0, 300, 300);
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            if (mas[i][j] === 1) {
                ctx.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }
}

function startLife() {
    let lifeCheck = 0;
    mas2 = []
    for (let i = 0; i < 30; i++) {
        mas2[i] = [];
        for (let j = 0; j < 30; j++) {
            let neighbors = 0;
            //Проверка соседей
            if (mas[fpm(i) - 1][j] === 1) neighbors++//Вверх
            if (mas[fpp(i) + 1][j] === 1) neighbors++//Влево
            if (mas[i][fpp(j) + 1] === 1) neighbors++//Вправо
            if (mas[i][fpm(j) - 1] === 1) neighbors++//Вниз
            if (mas[fpm(i) - 1][fpp(j) + 1] === 1) neighbors++//Вверх + вправо
            if (mas[fpp(i) + 1][fpp(j) + 1] === 1) neighbors++//Вниз + вправо
            if (mas[fpp(i) + 1][fpm(j) - 1] === 1) neighbors++//Вниз + влево
            if (mas[fpm(i) - 1][fpm(j) - 1] === 1) neighbors++//Вверх + влево

            if (mas[i][j] === 1) {
                lifeCheck++;
            }
            //Условия появления жизни и смерти
            if (mas[i][j] === 0 && neighbors === 3) {
                mas2[i][j] = 1;
            } else if (mas[i][j] === 1 && neighbors < 2 || neighbors > 3) {
                mas2[i][j] = 0;
            } else if (mas[i][j] === 1 && neighbors === 2 || neighbors === 3) {
                mas2[i][j] = 1;
            }
        }
    }
    mas = mas2;
    drawField();
    count++;
    document.querySelector('#count').innerHTML = count;
    timer = setTimeout(startLife, Xspeed.value);
    if (lifeCheck === 0) {
        alert('Жизнь вымерла');
        clearTimeout(timer);
    }
}

function fpm(i) { // переход через левую || верхнию границу
    if (i === 0) return 30;
    else return i;
}

function fpp(i) { // переход через правую || нижнию границу
    if (i === 29) return -1;
    else return i;
}

startBtn.onclick = function () { // Кнопка старт
    startLife();
    stopBtn.style.display = '';
    startBtn.style.display = 'none';
}

stopBtn.onclick = function () { // Кнопка стоп
    clearTimeout(timer);
    mas2 = [];
    stopBtn.style.display = 'none';
    startBtn.style.display = '';
}

document.querySelector('#clear').onclick = function () { // Очищение поля
    clearTimeout(timer);
    ctx.clearRect(0, 0, 300, 300);
    lifeLand();
    stopBtn.style.display = 'none';
    startBtn.style.display = '';
    count = 0;
    document.querySelector('#count').innerHTML = count;
}

document.querySelector('#random').onclick = function () { // заполнение поля случайным оброзом
    clearTimeout(timer);
    ctx.clearRect(0, 0, 300, 300);
    stopBtn.style.display = 'none';
    startBtn.style.display = '';
    count = 0;
    document.querySelector('#count').innerHTML = count;
    for (let i = 0; i < 30; i++) {
        mas[i] = [];
        for (let j = 0; j < 30; j++) {
            mas[i][j] = getRandomInt(2);
        }
    }
}

function getRandomInt(max) { // Получение max рандомных чисел (max = 2 это от 0 до 1)
    let result = Math.floor(Math.random() * Math.floor(max));
    drawField();
    return result;
}