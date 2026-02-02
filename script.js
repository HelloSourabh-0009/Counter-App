const display = document.getElementById("display");
const increaseBtn = document.getElementById("increaseBtn");
const resetBtn = document.getElementById("resetBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const extendBtn = document.getElementById("extendBtn");
const message = document.getElementById("message");

let count = Number(localStorage.getItem("count")) || 0;
let maxLimit = Number(localStorage.getItem("maxLimit")) || 10;
let isFirstLoad = true;

//Main update Function
function updateUI () {
    display.textContent = count;

    decreaseBtn.disabled = count === 0;
    resetBtn.disabled = count === 0;
    increaseBtn.disabled = count === 10;

    
    extendBtn.disabled = count !== 10;
   
    if (count === 10 ) {
        message.style.opacity = 0;
        setTimeout(() => {
            message.textContent = "Limit reached! Click 10+ to extend.";
            message.style.opacity = 1;
        }, 150);

    } else if (count === maxLimit) {
        message.textContent = "Maximum limit reached."
    } else {
        message.textContent = "";
    }

    //display bump
    if (!isFirstLoad) {
    display.classList.add("bump");
    setTimeout(() => display.classList.remove("bump"), 180);
    }

    isFirstLoad = false;

    //shaking animation
    if(count === maxLimit) {
        container.classList.add("shake");
        setTimeout(() => {
            container.classList.remove("shake");
        }, 300);
    }

    localStorage.setItem("count", count);
    localStorage.setItem("maxLimit", maxLimit);
}

//Event Handlers
increaseBtn.addEventListener("click", () => {
    if (count < maxLimit) count++;
    updateUI();
});
resetBtn.addEventListener("click", () => {
    count = 0;
    updateUI();
});
decreaseBtn.addEventListener("click", () => {
    if (count > 0) count--;
    updateUI();
});
extendBtn.addEventListener("click", () => {
    if(count === 10) count++;
    
    updateUI();
});

//Keyboard Support
document.addEventListener("keydown", (e) => {
    if(e.key === "+" && !increaseBtn.disabled) {
        increaseBtn.click();
    }
    if(e.key === "-" && !decreaseBtn.disabled) {
        decreaseBtn.click();
    }
    if(e.key === "0") {
        resetBtn.click();
    }
});

//Theme
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
});


if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}
updateUI();