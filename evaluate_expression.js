import Stack from "./stack.js"

// "\" is used before "minus" sign to avoid it being considered as range.
const validOperators = /[+\-*/%]/;

// Returns precedence and associativity of given operator. 
// Higher the Number higher the precedence
function getOperatorPrecedence(operator) {
    switch (operator) {
        case "+":
        case "-":
            return 1;
        case "*":
        case "/":
        case "%":
            return 2;
        default:
            throw new Error("Invalid Operator.");
    };
}

// Creates and return an Operator object with two properties.
function makeOperator(operator) {
    return {
        "operator": operator,
        "precedence": getOperatorPrecedence(operator),
    }
}

// Returns the Opening bracket of given closing bracket
function getOpeningBracket(closingBracket) {
    switch (closingBracket) {
        case ")":
            return "(";
        case "]":
            return "["
        case "}":
            return "{"
        default:
            throw new Error("Invalid Bracket Symbol");
    }
}

function calculate(operand1, operand2, operator) {
    switch (operator) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            return operand1 / operand2;
        case "%":
            return operand1 % operand2;
        default:
            throw new Error("Invalid operator");
    }
}


function infixToPostfix(expression) {
    const stack = new Stack();
    let postfixExpression = "";

    expression = expression.trim();
    const length = expression.length;

    let i = 0;

    while (i < length) {
        const char = expression[i]

        // Case 1:
        // Handle Numeric Digits
        if (/\d/.test(char)) {
            postfixExpression += char;
            i++;
        }

        // Case 2:
        // Handle Opening Braces
        else if (char == "(" || char == "[" || char == "{") {
            stack.push(char);
            i++;
        }

        // Case 3:
        // Handle Operators
        else if (validOperators.test(char)) {
            const currentOperator = makeOperator(char);

            if (stack.isEmpty()) {
                stack.push(currentOperator);
                i++;
                continue;
            }

            let topOfStack = stack.top();

            if (topOfStack == "(" || topOfStack == "[" || topOfStack == "{") {
                stack.push(currentOperator);
                i++;
            }
            else if (currentOperator.precedence > topOfStack.precedence) {
                stack.push(currentOperator);
                i++;
            }
            else if (currentOperator.precedence < topOfStack.precedence) {
                postfixExpression += stack.pop().operator;
                // Here we do not increment i because the current operator is not handled yet.
                // Now the new top can be anything. So we have to check all cases in handle operators again.
            }
            else {
                postfixExpression += stack.pop().operator;
                stack.push(currentOperator);
                i++;
            }
        }

        // Case 4:
        // Handle Closing Braces
        else if (char == ")" || char == "]" || char == "}") {
            let openingBracket = getOpeningBracket(char);

            while (stack.top() != openingBracket) {
                let lastSymbol = stack.pop();
                postfixExpression += lastSymbol.operator;
            }
            stack.pop();
            i++;
        }

        // Case 5:
        // Handle Invalid input
        else {
            throw new Error("Invalid input expression");
        }
    }

    // Pop all elements from stack
    while (!stack.isEmpty()) {
        let topOfStack = stack.pop();
        postfixExpression += topOfStack.operator;
    }

    return postfixExpression;
}

function evaluateExpression(postfixExpression) {
    const stack = new Stack();

    for (const symbol of postfixExpression) {

        // Case 1:
        // Handle Numbers
        if (/\d/.test(symbol)) {
            stack.push(+symbol)
        }

        // Case 2:
        else if (validOperators.test(symbol)) {
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            let result = calculate(operand1, operand2, symbol);
            stack.push(result);
        }
    }

    let result = stack.pop();

    if (!stack.isEmpty()) {
        throw new Error("Invalid Postfix Expression");
    }
    else {
        return result;
    }
}