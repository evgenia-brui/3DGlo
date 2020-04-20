'use strict';
const DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    today = document.querySelector('.today'),
    dateNow = new Date(),
    hours = dateNow.getHours(),
    days = dateNow.getDay(),
    timeNow = dateNow.toLocaleTimeString('en'),
    year = dateNow.getFullYear(),
    time = dateNow.getTime(),
    newYear = dateNow.setFullYear(year + 1, 1, 1);

let goodNow = '';
if (hours < 4) {
    goodNow = 'Доброй ночи';
} else if (hours < 10) {
    goodNow = 'Доброе утро';
} else if (hours < 19) {
    goodNow = 'Добрый день';
} else {
    goodNow = 'Добрый вечер';
}

function appendLi(text) {
    const li = document.createElement('li');
    li.textContent = text;
    today.append(li);
}

appendLi(goodNow);
appendLi('Сегодня: ' + DAYS[days]);
appendLi('Текущее время: ' + timeNow);
appendLi('До нового года осталось ' + Math.floor((newYear - time) / 1024 / 60 / 60 / 24) + ' дней');