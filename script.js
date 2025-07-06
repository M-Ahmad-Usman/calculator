import evaluateInfixExpression from "./evaluate_expression.js"
import { validOperators } from "./evaluate_expression.js"

const previousExpression = document.querySelector(".expression>p");
const inputOutput = document.querySelector(".input-output>input");

function handleButtonClick(button) {
    if (!(button instanceof HTMLButtonElement)) {
        return;
    }

    let value = button.textContent;

    if (/\d/.test(value) || validOperators.test(value)) {
        inputOutput.value += value;
    }
    else if (value == "C") {
        inputOutput.value = "";
        previousExpression.textContent = "";
    }
    else if (value == "CE") {
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
    }
    else if (value == "x") {
        inputOutput.value = inputOutput.value.slice(0, -1);
    }
    else if (value == "=") {
        let result;

        try {
            result = evaluateInfixExpression(inputOutput.value);
        }
        catch (error) {
            console.log(error)
        }

        if (!result) {
            return;
        }

        previousExpression.textContent = inputOutput.value;
        inputOutput.value = result;
    }
}
document.querySelector(".buttons").addEventListener("click", (e) => handleButtonClick(e.target));
