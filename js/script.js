'use strict';

// Проверка на число
const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && n !== 0;
// Проверка на пустоту
const isEmpty = s => s === null || !s || s.trim() === '';

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

        if (anchor === '') {
            return;
        }
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

    // Slider
    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots'),
            slide = document.querySelectorAll('.portfolio-item');
        let currentSlide = 0,
            interval;

        const addPagination = () => {
            slide.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('dot');
                if (index === 0) li.classList.add('dot-active');
                portfolioDots.append(li);
            });
        };
        addPagination();

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };
    slider();

    // Our Team
    const changePhoto = () => {
        const command = document.querySelector('#command');
        let imgChanged = '';

        command.addEventListener('mouseover', event => {
            if (event.target.matches('.command__photo')) {
                imgChanged = event.target.getAttribute('src');
                event.target.setAttribute('src', event.target.dataset.img);
            }
        });

        command.addEventListener('mouseout', event => {
            if (event.target.matches('.command__photo')) {
                event.target.setAttribute('src', imgChanged);
            }
        });
    };
    changePhoto();

    // Calculator
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            calcTotal = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                count = 1,
                day = 1;
            const typeObject = calcType.options[calcType.selectedIndex].value,
                squareObject = +calcSquare.value;

            if (calcCount.value > 1) {
                count += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                day *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                day *= 1.5;
            }

            if (typeObject && squareObject) {
                total = price * typeObject * squareObject * count * day;
            }

            if (typeObject > 0) {

                const animateTotal = () => animate({
                    duration: 1000,
                    timing(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        calcTotal.textContent = Math.floor(progress * total);
                    }
                });

                animateTotal();

            }
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc(100);

    // Send Form
    const sendForm = formId => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = `
                <div class="sk-wandering-cubes">
                    <div class="sk-cube sk-cube-1"></div>
                    <div class="sk-cube sk-cube-2"></div>
                </div>`,
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById(formId);

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };

        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.innerHTML = loadMessage;
            const formData = new FormData(form);
            const body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body, () => {
                statusMessage.textContent = successMessage;
                form.reset();
            }, error => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
        });
    };
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');

    // Validation
    const formListener = (selector, listener, regex) => {
        const inputItems = document.querySelectorAll(selector);
        inputItems.forEach(input => {
            input.addEventListener(listener, event => {
                const target = event.target;
                target.value = target.value.replace(regex, '');
            });
        });
    };
    formListener('input[type="number"]', 'input', /[^\d]/g);
    formListener('input[type="text"]', 'input', /[^а-яё\s]+/gi);
    formListener('#form2-message', 'input', /[^а-яё\s]+/gi);
    formListener('input[type="tel"]', 'input', /[^\+?\d]+/g);
});
