// Calculator object to perform basic arithmetic operations
let calculator = {
    oprnd1: undefined,
    oprnd2: undefined,
    oprtr: undefined,

    validOprtrs: ["+", "-", "*", "/", "%"],

    // Define operators
    "+": function () { return this.oprnd1 + this.oprnd2 },
    "-": function () { return this.oprnd1 - this.oprnd2 },
    "*": function () { return this.oprnd1 * this.oprnd2 },
    "/": function () { return this.oprnd1 / this.oprnd2 },
    "%": function () { return this.oprnd1 % this.oprnd2 },
};

function isNumber(str) {
    return !isNaN(str) && str.trim() !== "";
}

miscBtns = ["C", "CE", "x", "="];

let inputExpr = document.querySelector(".output>p");
let result = document.querySelector(".output>p");
let expression = document.querySelector(".expression>p");

function clearCalculator() {
    calculator.oprnd1 = undefined;
    calculator.oprnd2 = undefined;
    calculator.oprtr = undefined;
}

function clearDisplay() {
    inputExpr.textContent = "";
    expression.textContent = "";
}

function isDividingByZero() {
    return calculator.oprtr === "/" && calculator.oprnd2 === "0";
}


// Add click event listener leveraging event delegation
document.querySelector(".buttons").addEventListener("click", (e) => {

    // If clicked element is not button.
    if (!(e.target instanceof HTMLButtonElement)) {
        console.info("Clicked element is not a Button.")
        return;
    }
    
    // If some previous calculation's result was invalid
    if (inputExpr.textContent === "Undefined") {
        clearCalculator();
        clearDisplay();
    }
    
    let clickedBtn = e.target.textContent;

    if (isNumber(clickedBtn)) {
        inputExpr.textContent += clickedBtn;
    }

    // Handle floating points
    else if (clickedBtn === ".") {

        // If expression has not any floating point number
        if (!(inputExpr.textContent.includes("."))) {
            inputExpr.textContent += clickedBtn;
        }
    }

    // Handle Operators
    else if (calculator.validOprtrs.includes(clickedBtn)) {

        // If operand1 is not defined
        if (inputExpr.textContent === "") {
            console.error("Operand1 is not defined");
            return;
        }

        // Replace operator if expression already contains some operator
        if (calculator.oprtr) {

            // Take index of operator in input expression
            let indexOfOprtr = inputExpr.textContent.indexOf(calculator.oprtr);

            // Replace previous operator with new operator
            inputExpr.textContent = inputExpr.textContent.slice(0, indexOfOprtr) + clickedBtn + inputExpr.textContent.slice(indexOfOprtr + 1);

            calculator.oprtr = clickedBtn;
            return;
        }
        // Add operator in expression and in calculator
        else {
            inputExpr.textContent += clickedBtn;
            calculator.oprtr = clickedBtn;
            return;
        }
    }

    // Handle miscellaneous buttons
    else if (miscBtns.includes(clickedBtn)) {
        switch (clickedBtn) {
            case "C":
                clearCalculator();
                clearDisplay();
                break;

            case "CE":
                inputExpr.textContent = "";
                break;

            // Clear last character
            case "x":
                inputExpr.textContent = inputExpr.textContent.slice(0, -1);
                break;

            case "=":
                // Set data in calculator
                let indexOfOprtr = inputExpr.textContent.indexOf(calculator.oprtr);
                calculator.oprnd1 = inputExpr.textContent.slice(0, indexOfOprtr);
                calculator.oprnd2 = inputExpr.textContent.slice(indexOfOprtr + 1);

                // If operator and operands are defined.
                if (calculator.oprtr && calculator.oprnd1 && calculator.oprnd2) {

                    if (isDividingByZero()) {
                        inputExpr.textContent = "Undefined";
                        break;
                    }

                    calculator.oprnd1 = Number(calculator.oprnd1);
                    calculator.oprnd2 = Number(calculator.oprnd2);

                    expression.textContent = inputExpr.textContent;
                    inputExpr.textContent = calculator[calculator.oprtr]();

                    // Clear calculator's data
                    clearCalculator();
                }
                else {
                    alert("Invalid Expression");
                }
                break;
        }
    }
});
