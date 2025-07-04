import Stack from "./stack.js"

// Binary & Unary Operators
const validOperators = /^(?:[-+*/%]|u-|u+)$/;

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
        case "u-":
        case "u+":
            return 3;
        default:
            throw new Error("Invalid Operator.");
    };
}

function getOperatorAssociativity(operator) {
    switch (operator) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
            return "LR";
        case "u-":
        case "u+":
            return "RL";
        default:
            throw new Error("Invalid Operator.");
    }
}

// Creates and return an Operator Object.
function makeOperator(operator) {
    return {
        "operator": operator,
        "precedence": getOperatorPrecedence(operator),
        "type": operator.includes("u") ? "unary" : "binary",
        "associativity": getOperatorAssociativity(operator),
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

function calculate(operation) {

    let operationType = operation.type;
    let operator = operation.operator;

    // Unary Operation
    if (operationType == "unary") {
        let operand = operation.operand;

        switch (operator) {
            case "u-":
                return -operand;
            case "u+":
                return operand;
            default:
                throw new Error("Invalid Unary Operator");
        }
    }

    // Binary Operation
    else {
        let operand1 = operation.operand1;
        let operand2 = operation.operand2;

        switch (operation.operator) {
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

    // Handle First Unary Operator (if any)
    if (expression[0] == "+" || expression[0] == "-") {
        stack.push(makeOperator("u" + expression[0]));
        i++;
    }

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

        // Case 3: Handle Operators
        else if (validOperators.test(char)) {
            // An operator is unary if
            // 1. It is "+" or "-".
            // 2. It comes at the start of string (already handled in the start) or 
            // after some other operator or Opening bracket

            let currentOperator;
            // Unary Operator
            if ((char == "+" || char == "-") && (validOperators.test(expression[i - 1]) || /[\(\[\{]/.test(expression[i - 1]))) {
                currentOperator = makeOperator("u" + char);
            }
            // Binary Operator
            else {
                currentOperator = makeOperator(char);
            }

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
            // If precedence of both operators equal
            else {
                // Left To Right Associativity Rule
                if (currentOperator.associativity == "RL") {
                    stack.push(currentOperator);
                }
                // Left To Right Associativity Rule
                else {
                    postfixExpression += stack.pop().operator;
                    stack.push(currentOperator);
                }
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
    const validInfixExpression = /^[+-]*\d+(\.\d+)?([+\-*/%][+-]*\d+(\.\d+)?)*$/;
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

        // Case 2: Handle Operators
        // 2.1 Handle Unary Operators
        else if (postfixExpression[i] == "u") {
            let unaryOperator = postfixExpression[i] + postfixExpression[i + 1];
            let operand = stack.pop();

            let calculationObject = {
                "type": "unary",
                "operator": unaryOperator,
                "operand": operand,
            };

            let result = calculate(calculationObject);
            stack.push(result);
            i += 2;
        }
        // 2.2 Handle Binary Operators
        else if (validOperators.test(postfixExpression[i])) {
            const binaryOperator = postfixExpression[i];
            const operand2 = stack.pop();
            const operand1 = stack.pop();

            if (operand2 == 0 && binaryOperator == "/") {
                throw new Error("Division by Zero is not allowed.");
            }

            const calculationObject = {
                "type": "binary",
                "operator": binaryOperator,
                "operand1": operand1,
                "operand2": operand2,
            };

            let result = calculate(calculationObject);
            stack.push(result);
            i++;
        }

        // Case 3:
        // Handle Undefined Characters
        else {
            throw new Error("Invalid Input Expression.")
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