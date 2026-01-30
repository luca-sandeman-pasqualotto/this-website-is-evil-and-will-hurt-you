console.log("JS 2 in action")

// step 1 - Selecting the element
const myShape = document.getElementById("circle");

// Step 2 - Adding a click event
myShape.addEventListener("click", () => {
    // myShape.style.background = "green"
    myShape.classList.toggle("change-me");
})