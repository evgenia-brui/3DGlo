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
        const body = document.querySelector('body'),
            menu = document.querySelector('menu');

        const handlerMenu = event => {
            if (event.target.closest('.menu')) {
                menu.classList.add('active-menu');
            } else {
                menu.classList.remove('active-menu');
            }
        };

        body.addEventListener('click', handlerMenu);
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

        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
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

            window.scrollTo({
                top: topScroll,
                behavior: "smooth"
            });

        }
    };
    const linkAnchors = document.querySelectorAll('a[href^="#"]');
    linkAnchors.forEach(item => item.addEventListener('click', smoothScroll));

    // Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
});
