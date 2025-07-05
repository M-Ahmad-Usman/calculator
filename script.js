import evaluateInfixExpression from "./evaluate_expression.js"
import { validOperators } from "./evaluate_expression.js"

const previousExpression = document.querySelector(".expression>p");
const inputOutput = document.querySelector(".output>p");

function handleButtonClick(button) {
    if (!(button instanceof HTMLButtonElement)) {
        return;
    }

    let value = button.textContent;

    if (/\d/.test(value) || validOperators.test(value)) {
        inputOutput.textContent += value;
    }
    else if (value == "C") {
        inputOutput.textContent = "";
        previousExpression.textContent = "";
    }
    else if (value == "CE") {
        let expression = inputOutput.textContent;

        // Check if operator exists in the expression
        if (validOperators.test(expression)) {
            const indexOfLastOperator = expression.split("").findLastIndex(char => validOperators.test(char));
            
            // Remove string after the last operator in the expression.
            inputOutput.textContent = expression.slice(0, indexOfLastOperator + 1);
        }
        // If no operator is found
        else {
            // Remove the whole expression
            inputOutput.textContent = "";
        }
    }
    else if (value == "x") {
        inputOutput.textContent = inputOutput.textContent.slice(0, -1);
    }
    else if (value == "=") {
        let result;

        try {
            result = evaluateInfixExpression(inputOutput.textContent);
        }
        catch (error) {
            console.log(error)
        }

        if (!result) {
            return;
        }

        previousExpression.textContent = inputOutput.textContent;
        inputOutput.textContent = result;
    }
}
document.querySelector(".buttons").addEventListener("click", (e) => handleButtonClick(e.target));
