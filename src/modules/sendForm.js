const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = `
            <div class="sk-wandering-cubes">
                <div class="sk-cube sk-cube-1"></div>
                <div class="sk-cube sk-cube-2"></div>
            </div>`,
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const forms = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.innerHTML = loadMessage;
            const formData = new FormData(form);
            const body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    setTimeout(() => statusMessage.textContent = '', 5000);
                    form.reset();
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        });
    });
};

export default sendForm;