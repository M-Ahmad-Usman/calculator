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

function checkBalancedParanthesis(expression) {
    const stack = new Stack();

    for (const char of expression) {
        switch (char) {
            case "(":
            case "[":
            case "{":
                stack.push(char);
                break;
            case ")":
                if (stack.isEmpty() || stack.pop() !== "(") return false;
                break;
            case "]":
                if (stack.isEmpty() || stack.pop() !== "[") return false;
                break;
            case "}":
                if (stack.isEmpty() || stack.pop() !== "{") return false;
                break;
        }
    }

    return stack.isEmpty();
}

function infixToPostfix(expression) {

    const stack = new Stack();
    let postfixExpression = "";

    const length = expression.length;

    let i = 0;

    while (i < length) {
        const char = expression[i]

        // Case 1:
        // Handle Numeric Digits
        if (/\d/.test(char) || char == ".") {

            postfixExpression += char;

            // To keep track of operands which have more than one digits, use ","
            // If the next symbol is an operator then all previous symbols (untill ",") are operand1 of next operator.
            // 20+5 will be 20,5+
            // 20+5-3 will be 20,5,+3-
            if (i + 1 < length && validOperators.test(expression[i + 1])) {
                postfixExpression += ",";
            }
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

// Main Function
export default function evaluateInfixExpression(infixExpression) {
    // Validate & Sanitize Input
    // 1. Remove whitespaces from expression
    infixExpression = infixExpression.replace(/\s+/g, "");
    
    // 2. Check Balanced Paranthesis
    if (!checkBalancedParanthesis(infixExpression)) {
        throw new Error("Invalid input expression with Unbalanced braces.")
    }

    // 3. Validate the structure of Input Infix Expression
    const validInfixExpression = /^\d+(\.\d+)?([+\-*/%]\d+(\.\d+)?)*$/;
    // Before testing remove brackets of all types as Balanced Paranthesis is already been checked. As
    // validInfixExpression doesn't supports brackets of any kind.
    if (!validInfixExpression.test(infixExpression.replace(/[\(\)\[\]\{\}]/g, ""))) {
        throw new Error("Given expression isn't a valid Infix Expression.")
    }
    
    const stack = new Stack();
    const postfixExpression = infixToPostfix(infixExpression);

    let i = 0;
    const size = postfixExpression.length;

    while (i < size) {

        // Case 1:
        // Hande Numbers (operands)
        if (/\d/.test(postfixExpression[i])) {

            let operand = "";
            // Get Operand untill "," or some operator
            while (/\d/.test(postfixExpression[i]) || postfixExpression[i] == ".") {
                operand += postfixExpression[i];
                i++;
            }
            stack.push(+operand);

            if (postfixExpression[i] == ",") i++;
        }

        // Case 2:
        // Handle Operators
        else if (validOperators.test(postfixExpression[i])) {
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            let operator = postfixExpression[i];

             if (operand2 == 0 && operator == "/") {
                throw new Error("Division by Zero is not allowed.");
            }

            let result = calculate(operand1, operand2, operator);
            stack.push(result);
            i++;
        }

        // Case 3:
        // Handle Undefined Characters
        else {
            throw new Error ("Invalid Input Expression.")
        }
    }

    let result = stack.pop();

    if (!stack.isEmpty() || isNaN(result)) {
        throw new Error("Invalid Postfix Expression");
    }
    else {
        return result;
    }
}