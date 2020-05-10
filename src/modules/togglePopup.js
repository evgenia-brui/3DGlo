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

export default togglePopup;