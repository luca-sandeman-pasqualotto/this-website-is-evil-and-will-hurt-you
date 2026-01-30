console.log("loaded ⚔️")

const Link = document.getElementById("link");

const stage = document.querySelector("body");

const linkSound = new Audio("sounds/linkjump.mp3")

Link.onclick = function ()
{
    this.classList.toggle("move");
    linkSound.play();
}

stage.addEventListener("click", function(event) {
    console.log(event.clientX + " : " + event.clientY)
    // Link.style.transform = "translateX(" + event.clientX + "px) translateY(" + event.clientY + "px)"
    Link.style.transform = `translateX(${event.clientX}px) translateY(${event.clientY}px)`
})


function addMyObject() {
let myObject = document.createElement("img");
myObject.src = "img/favicon_io/rupee.svg";
myObject.style.width = "62px";
stage.append(myObject);

let w = window.innerWidth - 68;
let randoX = Math.floor((Math.random() * w) + 1);
let h = window.innerHeight - 110;
let randoY = Math.floor((Math.random() * h) + 1);

myObject.style.transform = `translateX(${randoX}px) translateY(${randoY}px)`;

setTimeout(() => {
    myObject.remove();
    addMyObject();    
}, 2000);
}
addMyObject();