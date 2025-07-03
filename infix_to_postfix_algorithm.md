# Algorithm of Infix To Postfix conversion using Stack

## Steps
1. Print operands as they arrive.
2. If Stack is empty or contains a left bracket or opening bracket on top, push the incoming operator onto the stack.
3. If incoming symbol is left bracket or opening bracket, push it onto the stack.
4. If incoming symbol is right bracket or closing bracket, pop the stack and print the operators untill left bracket is found.
5. If there is opeartor on top and incoming operator has **higher precedence** than the operator at the top of stack, **push the incoming operator** onto the stack.
6. If there is opeartor on top and incoming operator has **lower precedence** than the operator at the top of stack, **pop and print the top**. Then test the incoming operator against the new top of the stack.
7. If incoming operator has equal precedence than the top of the stack than use the **Associativity Rules**.
8. At the end of input, pop and print all operators of the stack.

### Associativity Rules
1. **Left-to-Right:** Pop and print the top of the Stack then push the incoming operator.
2. **Right-to-Left:** Push the incoming operator.