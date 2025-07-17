import evaluateInfixExpression from "./evaluate_expression.js"
import { validOperators } from "./evaluate_expression.js"

const errorMessage = document.querySelector(".error-message");
const previousExpression = document.querySelector(".expression");
const inputOutput = document.querySelector(".input-output");
const validInputs = /[-+*/%\.\d()[\]{}]/;
const arrowKeys = /(ArrowRight)|(ArrowLeft)|(ArrowUp)|(ArrowDown)/;
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

    
    // If next symbol is an operator then append it on the result of previous calculation
    // Else if next symbol is "=" then show the previous result
    // Else remove everything
    if (!isFirstCalculation && !validOperators.test(input) && input != "=") {
        resetCalculator();
    }
    
    // Always true
    // Only "=" will make it false on successful calculation
    isFirstCalculation = true;
    
    if (validInputs.test(input)) {
        // Get the position of text selected by cursor.
        // If no text is selected then start === end
        const start = inputOutput.selectionStart;
        const end = inputOutput.selectionEnd;
        const currentExpression = inputOutput.value;

        // Append the input at the current position of cursor
        // if some text is selected then replace that text with input
        inputOutput.value = currentExpression.slice(0, start) + input + currentExpression.slice(end);
        return;
    }

    switch (input) {
        case "C":
            resetCalculator();
            break;

        case "x":
            // selectionEnd is used to remove the last character from selected text.
            // If nothing is selected then remove the last character behind the cursor
            const cursorPosition = inputOutput.selectionEnd;
            const currentExpression = inputOutput.value;

            // Do nothing if cursor is at start
            if (cursorPosition == 0) break;

            // Remove the previous character if cursor is after 1st character
            if (cursorPosition == 1) inputOutput.value = currentExpression.slice(1);
            // Remove the last character if cursor is at last
            else if (cursorPosition == currentExpression.length)
                inputOutput.value = currentExpression.slice(0, cursorPosition - 1);
            // If cursor is somewhere between remove the character behind the cursor.
            else
                inputOutput.value = currentExpression.slice(0, cursorPosition - 1) + currentExpression.slice(cursorPosition);

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
    if (e.target instanceof HTMLInputElement && arrowKeys.test(e.key)) {
        return;
    }

    // Input element handles input content on its own.
    // Prevent this behavior as the input is handled by handleKeyBoardInput.
    else if (e.target instanceof HTMLInputElement) {
        e.preventDefault();
    }

    handleKeyBoardInput(e.key);
});