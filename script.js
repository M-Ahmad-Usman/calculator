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

document.querySelector(".buttons").addEventListener("click", (e) => {
    let clickedBtn = e.target.textContent;
    let output = document.querySelector(".output>p");
    let expression = document.querySelector(".expression>p");

    function resetCalculator() {
        calculator.oprnd1 = undefined;
        calculator.oprnd2 = undefined;
        calculator.oprtr = undefined;
        output.textContent = "";
        expression.textContent = "";
    }

    // If clicked button is some number
    if (isNumber(clickedBtn)) {
        // If some previous calculation was invalid
        if (output.textContent == "Undefined") {
            resetCalculator();
        }
        output.textContent += clickedBtn;
    }
    // If clicked button is floating point and there is no floating point in the expression
    else if (clickedBtn === "." && !output.textContent.includes(".")) {
        output.textContent += clickedBtn;
    }
    // If clicked button is some operator
    else if (calculator.validOprtrs.includes(clickedBtn)) {
        if (output.textContent === "") {
            alert("Invalid Format. Please enter an operand!");
            return;
        }
        else if (calculator.oprtr) {
            alert("Invalid Format. Please enter an operand!");
            return;
        }

        calculator.oprnd1 = Number(output.textContent);
        calculator.oprtr = clickedBtn;
        output.textContent = "";
        expression.textContent = calculator.oprnd1 + calculator.oprtr;
    }
    // Handle miscellaneous buttons
    else {
        switch (clickedBtn) {
            case "C":
                resetCalculator();
                break;

            case "CE":
                output.textContent = "";
                break;

            case "x":
                output.textContent = output.textContent.slice(0, -1);
                break;

            case "=":
                if (!calculator.oprnd1 || !calculator.oprtr || output.textContent === "") {
                    alert("Invalid format.");
                    break;
                }

                // Handle division by zero
                else if (output.textContent === "0" && calculator.oprtr === "/") {
                    output.textContent = "Undefined";
                    break;
                }
                
                // Calculate expression and display result
                calculator.oprnd2 = Number(output.textContent);
                output.textContent = calculator[calculator.oprtr]();
                expression.textContent = calculator.oprnd1 + calculator.oprtr + calculator.oprnd2;

                // Allow further calculations
                calculator.oprnd1 = Number(output.textContent);
                calculator.oprtr = undefined;
                calculator.oprnd2 = undefined;
                break;

            // If Some element other than the button is clicked in .buttons div
            default:
                break;
        }
    }
});
