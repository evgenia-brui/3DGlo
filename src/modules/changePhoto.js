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

export default changePhoto;