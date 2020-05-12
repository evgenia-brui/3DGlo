const formListener = (selector, listener, regex) => {
    const inputItems = document.querySelectorAll(selector);
    inputItems.forEach(input => {
        input.addEventListener(listener, event => {
            const target = event.target;
            target.value = target.value.replace(regex, '');
        });
    });
};

export default formListener;