console.log('Gallery!!! BOO!');

const thumbnails = document.querySelectorAll('figure');
// console.info(thumbnails);

const modal = document.querySelector('dialog');

thumbnails.forEach(thumb => {
    // console.log(thumb);
    thumb.addEventListener('click', loadModal);
})

function loadModal(event) {
    console.info(event.target.closest('figure').querySelector('img').src);
    let thumbImg = event.target.closest('figure').querySelector('img').src;
    thumbImg = thumbImg.substring(thumbImg.lastIndexOf('/'));
    console.info(thumbImg);

    modal.querySelector('figure').innerHTML = event.target.closest('figure').innerHTML;
    modal.querySelector('img').src = 'images' + thumbImg;
    modal.showModal();
}