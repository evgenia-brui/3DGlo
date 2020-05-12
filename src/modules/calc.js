import animate from './animate';

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

export default calc;