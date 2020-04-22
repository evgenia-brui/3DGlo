'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        if (deadline === undefined) {
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate() + 1);
            deadline = new Date((nextDay.getMonth() + 1) + ',' + nextDay.getDate() + ',' +
                                 nextDay.getFullYear() + ',00:00:00');
        }

        function addZero(n) {
            return n < 10 ? '0' + n : n;
        }

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow    = new Date().getTime(),
                isTimeOver = dateStop < dateNow;

            let timeRemaining = 0,
                hours = 0,
                minutes = 0,
                seconds = 0;

            if (!isTimeOver) {
                timeRemaining = (dateStop - dateNow) / 1024;
                seconds = Math.floor(timeRemaining % 60);
                minutes = Math.floor((timeRemaining / 60) % 60);
                hours = Math.floor(timeRemaining / 60 / 60);
            }

            return { timeRemaining, hours, minutes, seconds };
        }

        const updateClock = function() {
            const timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining === 0) {
                // eslint-disable-next-line no-use-before-define
                clearInterval(secondsInterval);
            }
        };

        const secondsInterval = setInterval(updateClock, 1024);
    }
    //countTimer('22 april 2020');
    countTimer();

    // Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul > li');

        const handlerMenu = () => menu.classList.toggle('active-menu');

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(item => item.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    // Amimate
    function animate({ timing, draw, duration }) {
        const start = performance.now();
        requestAnimationFrame(function animate(time) {
            // timeFraction изменяется от 0 до 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // вычисление текущего состояния анимации
            const progress = timing(timeFraction);

            draw(progress); // отрисовать её

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }

    // Popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            pageWidth = document.documentElement.clientWidth;

        const animatePopup = () => animate({
            duration: 300,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                popupContent.style.top = '0%';
                popup.style.opacity = 0.1;
                popup.style.display = 'block';
                popupContent.style.top = progress * 10 + '%';
                popup.style.opacity = progress * 1;
            }
        });

        popupBtn.forEach(item => {
            if (pageWidth > 768) {
                item.addEventListener('click', animatePopup);
            } else {
                item.addEventListener('click', () => popup.style.display = 'block');
            }
        });

        popupClose.addEventListener('click', () => popup.style.display = 'none');
    };
    togglePopup();

    // Smooth scroll
    const smoothScroll = event => {
        const anchor = event.currentTarget.href.split('#')[1];
        const target = document.querySelector(`#${anchor}`);

        if (target) {
            event.preventDefault();
            const targetTop = target.getBoundingClientRect().y;
            const targetTopScroll = document.documentElement.scrollTop;
            const topScroll = targetTop + targetTopScroll;

            /*
            Изи решение
            window.scrollTo({
                top: topScroll,
                behavior: "smooth"
            });
            */

            // Есть задержка в ожидании, когда "воображаемый" скрол дойдет от начала страницы
            // до текущего положения, и только потом начинается анимация..
            animate({
                duration: 500,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    if (document.documentElement.scrollTop < (progress * topScroll)) {
                        document.documentElement.scrollTop = progress * topScroll;
                    }
                }
            });
        }
    };
    const linkAnchors = document.querySelectorAll('a[href^="#"]');
    linkAnchors.forEach(item => item.addEventListener('click', smoothScroll));
});
