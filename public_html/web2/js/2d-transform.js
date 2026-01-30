console.log('2D transform is loaded.');

let cat = document.querySelector("#aliencat");

cat.addEventListener('click', function (event) {
    // console.log(this.id);
    this.classList.toggle('move-right');
})