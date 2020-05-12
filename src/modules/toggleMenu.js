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

export default toggleMenu;