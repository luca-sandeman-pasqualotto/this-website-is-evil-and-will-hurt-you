console.log("🥺 pwease?");

const myCircles = document.querySelectorAll(".circle");

myCircles.forEach(function(item, index, array) {
    item.addEventListener("click", function () {
        console.log("circle clicked: " + (parseInt(index) + 1));
        
        if (item.classList.toggle("square")) {
            //do something
            item.classList.toggle("make-round")
        } else {
            //do something else
            item.classList.toggle("move-me")
        }
    })
})