

const gallery = document.querySelector("#gallery_wrapper");

let isDragging = false, startX, startScrollLeft;

const dragStart = (e) => {
    isDragging = true;
    gallery.classList.add("dragging")
    // records the mouse and scroll position of the gallery
    startX = e.pageX;
    startScrollLeft = gallery.scrollLeft
}

const dragging = (e) => {
    if (!isDragging) return;
    //  console.log(e.pageX);
    // This updates the scroll position based on mouse movement
    gallery.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    gallery.classList.remove("dragging")

}

gallery.addEventListener("mousedown", dragStart);
gallery.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);