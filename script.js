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
    return calculator.oprtr === "/" && calculator.oprnd2 === 0;
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

        // Avoid - to be taken as range with \- in regexp.
        let indexOfOprtr = inputExpr.textContent.search(/[+\-*/%]/);

        // If expression contains only one operand and it does not contain floating-point
        if (indexOfOprtr === -1 && !inputExpr.textContent.includes(".")) {
            inputExpr.textContent += clickedBtn;
        }
        // If opearnd2 does not contain floating-point
        else if (!(inputExpr.textContent.slice(indexOfOprtr + 1).includes("."))) {
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
                /*
                Regular Expression for expression validation
                    \d+: [0-9] 1 or more times
                    \.?: Optional floating point 0 or 1 time
                    \d*: Optional [0-9] after floating point 0 or more times
                    [+\-/*%]: Exactly 1 valid operator (+, -, *, /, or %)
                */
                const regex = /\d+\.?\d*[+\-/*%]\d+\.?\d*/g;
                let isValid = regex.test(inputExpr.textContent);

                if (!isValid) {
                    alert("Invalid Expression");
                    break;
                }

                // Setting data in calculator
                calculator.oprtr = inputExpr.textContent.match(/[+\-/*%]/).toString();
                
                let oprnds = inputExpr.textContent.split(calculator.oprtr);
                calculator.oprnd1 = Number(oprnds[0]);
                calculator.oprnd2 = Number(oprnds[1]);

                if (isDividingByZero()) {
                    inputExpr.textContent = "Undefined";
                    break;
                }

                // Calculate and display result
                expression.textContent = inputExpr.textContent;
                inputExpr.textContent = calculator[calculator.oprtr]();

                // Clear calculator's data
                clearCalculator();
                break;
        }
    }
});
