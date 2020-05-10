const countTimer = deadline => {
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
        const dateStop = +new Date(deadline).getTime(),
            dateNow    = new Date().getTime(),
            isTimeOver = dateStop < dateNow;

        let timeRemaining = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;

        if (!isTimeOver) {
            timeRemaining = (dateStop - dateNow) / 1000;
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

    const secondsInterval = setInterval(updateClock, 1000);
};

export default countTimer;