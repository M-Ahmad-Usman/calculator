import evaluateInfixExpression from "./evaluate_expression.js"
import { validOperators } from "./evaluate_expression.js"

const errorMessage = document.querySelector(".error-message");
const previousExpression = document.querySelector(".expression");
const inputOutput = document.querySelector(".input-output");
const validInputs = /[-+*/%\.\d()[\]{}]/;
const arrowKeys = ["ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft"];
const functionKeys = /F\d{1,2}/;

let isError = false;
let isFirstCalculation = true;

function resetCalculator() {
    inputOutput.value = "";
    previousExpression.textContent = "";
}

function showError(error) {
    previousExpression.classList.toggle("hide");
    inputOutput.classList.toggle("hide");
    errorMessage.classList.toggle("hide");

    errorMessage.textContent = error;
}

function removeError() {
    errorMessage.textContent = "";

    previousExpression.classList.toggle("hide");
    inputOutput.classList.toggle("hide");
    errorMessage.classList.toggle("hide");
}

function handleInput(input) {

    // Reset display if there was some error before
    if (isError) {
        resetCalculator();
        removeError();
        isError = false;
    }

    
    // Erase previous values if anything other than the operator is given after a calculation
    // If an operator is given then append it on the result
    if (!isFirstCalculation && !validOperators.test(input)) {
        resetCalculator();
    }
    
    // Always true
    // Only "=" will make it false on successful calculation
    isFirstCalculation = true;
    
    if (validInputs.test(input)) {
        inputOutput.value += input;
        return;
    }

    switch (input) {
        case "C":
            resetCalculator();
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
                showError(error.message);
                isError = true;
                return;
            }

            previousExpression.textContent = inputOutput.value;
            inputOutput.value = result;

            // Now a calculation is completed
            isFirstCalculation = false;

            break;
    }
}

function handleKeyBoardInput(value) {
// Keyboard input isn't directly passed to handleInput because
// handleInput allows values which are valid only when passed by buttons like "x".

    // Ignore function keys explicity.
    if (functionKeys.test(value)) {
        return;
    }

    if (validInputs.test(value)) {
        handleInput(value);
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
document.querySelector(".buttons").addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLButtonElement)) {
        return;
    }

    handleInput(e.target.textContent)
});

// Handle KeyBoard input on site
document.addEventListener("keydown", (e) => {

    // If arrow keys are pressed on input element then allow default behavior to move the cursor.
    if (e.target instanceof HTMLInputElement && arrowKeys.includes(e.key)) {
        return;
    }

    // Input element handles input content on its own.
    // Prevent this behavior as the input is handled by handleKeyBoardInput.
    else if (e.target instanceof HTMLInputElement) {
        e.preventDefault();
    }

    handleKeyBoardInput(e.key);
});