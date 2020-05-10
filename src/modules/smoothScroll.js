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

export default smoothScroll;