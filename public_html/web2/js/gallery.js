console.log('Gallery!!! BOO!')

const thumbnails = document.querySelectorAll('figure')
console.info(thumbnails)

const modal = document.querySelector('dialog')

thumbnails.forEach(thumb => {
    console.log(thumb)
    thumb.addEventListener('click', loadModal)
})

function loadModal(event) {
    console.info(event.target.closest('figure').innerHTML)
    modal.querySelector('figure').innerHTML = (event.target.closest('figure').innerHTML)
    modal.showModal()
}