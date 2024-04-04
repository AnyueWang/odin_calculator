const btns = document.querySelectorAll(".btn");
const btnsNum = document.querySelectorAll(".btn-num");
const btnAc = document.querySelector(".ac");
const btnDel = document.querySelector(".delete");
const maxDigits = 9;
let numDisplay = document.querySelector(".display-container");

btns.forEach((btn) => {
    btn.addEventListener("mouseover", (e) => {
        e.target.classList.add("btn-hover")
    });
    btn.addEventListener("mouseout", (e) => {
        e.target.classList.remove("btn-hover")
    });
});

btnsNum.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const numChar = e.target.textContent;
        if (numDisplay.textContent.length < maxDigits) {
            if (numChar === '.') {
                if (numDisplay.textContent.includes('.')) { }
                else { numDisplay.textContent += numChar }
            } else {
                if (numDisplay.textContent === "0") { numDisplay.textContent = numChar }
                else { numDisplay.textContent += numChar }
            }
        }
    })
});

btnAc.addEventListener("click", () => {
    numDisplay.textContent = '0';
});

btnDel.addEventListener("click", () => {
    if (numDisplay.textContent.length === 1) {numDisplay.textContent = "0"}
    else {numDisplay.textContent = numDisplay.textContent.slice(0, -1)}
}); 