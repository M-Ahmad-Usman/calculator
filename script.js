import evaluateInfixExpression from "./evaluate_expression.js"
import { validOperators } from "./evaluate_expression.js"

const previousExpression = document.querySelector(".expression>p");
const inputOutput = document.querySelector(".input-output>input");
const validInputs = /[-+*/%\.\d()[\]{}]/;

function handleInput(input) {

    if (validInputs.test(input)) {
        inputOutput.value += input;
        return;
    }

    switch (input) {
        case "C":
            inputOutput.value = "";
            previousExpression.textContent = "";
            break;

        case "x":
            inputOutput.value = inputOutput.value.slice(0, -1);
            break;

        case "CE":
            let expression = inputOutput.value;

            // Check if operator exists in the expression
            if (validOperators.test(expression)) {
                const indexOfLastOperator = expression.split("").findLastIndex(char => validOperators.test(char));

                // Remove string after the last operator in the expression.
                inputOutput.value = expression.slice(0, indexOfLastOperator + 1);
            }
            // If no operator is found
            else {
                // Remove the whole expression
                inputOutput.value = "";
            }

            break;

        case "=":
            let result;

            try {
                result = evaluateInfixExpression(inputOutput.value);
            }
            catch (error) {
                previousExpression.textContent = error.message;
                inputOutput.value = "";
                return;
            }

            previousExpression.textContent = inputOutput.value;
            inputOutput.value = result;

            break;
    }
}

function handleKeyBoardInput(value) {
// Keyboard input isn't directly passed to handleInput because
// handleInput allows values which are valid only when passed by buttons like "x".

    if (validInputs.test(value)) {
        inputOutput.value += value;
        return;
    }

    switch (value) {
        case "Backspace":
            handleInput("x");
            break;
        case "Escape":
            handleInput("C");
            break;
        case "Enter":
            handleInput("=");
            break;
        case "Delete":
            handleInput("CE");
            break;
    }
}

// Hande Button input
document.querySelector(".buttons").addEventListener("click", (e) => handleInput(e.target.textContent));

// Handle KeyBoard input on site
document.addEventListener("keydown", (e) => {
    // Prevent the default behavior of input element if input element was focused on key down
    
    if (e.target instanceof HTMLInputElement) {
        e.preventDefault();
    }
    
    handleKeyBoardInput(e.key);
});