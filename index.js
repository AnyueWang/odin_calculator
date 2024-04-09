const btns = document.querySelectorAll(".btn");
const btnsNum = document.querySelectorAll(".btn-num");
const btnAc = document.querySelector(".ac");
const btnDel = document.querySelector(".delete");
const btnsOperator = document.querySelectorAll(".btn-operator");
const btnEqual = document.querySelector(".btn-equal");
const maxDigits = 9;
const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};
let numDisplay = document.querySelector(".display-container");
let currentFormula = [];
let indicatorNewNum = false;

btnsNum.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const numChar = e.target.textContent;
        if (indicatorNewNum === true) {
            numDisplay.textContent = "";
            indicatorNewNum = false;
            clearActiveOperatorBtn();
        }
        if (numDisplay.textContent.length < maxDigits) {
            if (numChar === ".") {
                if (numDisplay.textContent.includes(".")) { }
                else { numDisplay.textContent += numChar }
            } else {
                if (numDisplay.textContent === "0") { numDisplay.textContent = numChar }
                else { numDisplay.textContent += numChar }
            }
        }
    })
});

btnAc.addEventListener("click", () => {
    numDisplay.textContent = "0";
    currentFormula = [];
    indicatorNewNum = false;
    btnsOperator.forEach(btn => {
        if (btn.classList.contains("btn-operator-active")) {
            btn.classList.remove("btn-operator-active")
        }
    })
});

btnDel.addEventListener("click", () => {
    if (numDisplay.textContent.length === 1) { numDisplay.textContent = "0" }
    else { numDisplay.textContent = numDisplay.textContent.slice(0, -1) }
});

btnsOperator.forEach(btn => {
    btn.addEventListener("click", e => {
        const operator = e.target.textContent;
        if (currentFormula.length === 0) {
            currentFormula.push(numDisplay.textContent);
            currentFormula.push(operator);
            e.target.classList.add("btn-operator-active");
            indicatorNewNum = true;
        } else {
            clearActiveOperatorBtn();
            currentFormula.push(numDisplay.textContent);
            const result = calculate(currentFormula);
            numDisplay.textContent = result;
            currentFormula.pop();
            currentFormula[0] = result;
            currentFormula[1] = operator;
            e.target.classList.add("btn-operator-active");
            indicatorNewNum = true;
        }
    })
})

btnEqual.addEventListener("click", () => {
    if (currentFormula.length !== 0) {
        currentFormula.push(numDisplay.textContent);
        const result = calculate(currentFormula);
        numDisplay.textContent = result;
        currentFormula = [];
    }
    clearActiveOperatorBtn();
    indicatorNewNum = true;
});

function clearActiveOperatorBtn() {
    btnsOperator.forEach(btn => {
        if (btn.classList.contains("btn-operator-active")) {
            btn.classList.remove("btn-operator-active");
        }
    });
}

function calculate(arr) {
    const firstNum = arr[0];
    const operator = arr[1];
    const secondNum = arr[2];
    return operations[operator](+firstNum, +secondNum);
}
