# Advanced Expression Calculator

A sophisticated web-based calculator that evaluates complex mathematical expressions using the Shunting Yard algorithm. Built with modern JavaScript modules, custom data structures, and comprehensive error handling.

## Live Preview

Click [here](https://m-ahmad-usman.github.io/calculator/) to see Live Preview.

## Overview

This calculator implements a complete mathematical expression parser and evaluator from scratch, featuring:

- **Shunting Yard Algorithm** - Converts infix expressions to postfix for evaluation
- **Custom Stack Data Structure** - Built from scratch for expression processing
- **Complex Expression Support** - Handles nested brackets, unary operators, and operator precedence
- **Modern JavaScript Architecture** - ES6 modules with clean separation of concerns
- **Comprehensive Error Handling** - Validates input at multiple layers with user-friendly feedback

## Key Features

### Mathematical Capabilities
- ✅ **Complex Expression Evaluation** - Real-time evaluation of sophisticated mathematical expressions
- ✅ **Multiple Bracket Types** - Support for parentheses `()`, brackets `[]`, and braces `{}`
- ✅ **Unary & Binary Operators** - Complete support for `+`, `-`, `*`, `/`, `%` with unary variants
- ✅ **Operator Precedence & Associativity** - Proper PEMDAS/BODMAS implementation
- ✅ **Decimal Number Support** - Full floating-point arithmetic with proper parsing

### User Experience
- ✅ **Dual Input Methods** - Button clicks and full keyboard support
- ✅ **Real-time Expression Display** - Shows complete expression as you type
- ✅ **Smart Error Handling** - Comprehensive validation with automatic recovery
- ✅ **Multiple Clear Functions** - Clear All (C), Clear Entry (CE), and Backspace
- ✅ **Visual Feedback** - Color-coded buttons and responsive interface

## Complex Expression Examples

The calculator can handle deeply nested expressions with multiple operator types:

```javascript
// Deeply nested brackets with mixed operators
((50 - 30) * 12 - (25 / 2) * (8 / 4)) / (3 + 1)  →  53.75

// Multiple unary operators
-(-5 + 3) * +(2 - 4)  →  -4

// Complex nested expressions
{[(10 + 5) * 3] - [20 / (2 + 2)]} * 2  →  80

// Unary operators with brackets
-(5 + 3) * +(10 / -2)  →  40

// Mixed bracket types with precedence
[5 + (3 * 2)] * {10 - [8 / (4 - 2)]}  →  66

// Advanced expression with all operators
((12 % 5) + 3) * -(4 - 6) / +(8 / 2)  →  2.5
```

## Technical Implementation

### Architecture Overview
Built with ES6 modules for clean separation of concerns:

- **`script.js`** - UI logic, event handling, and user interaction management
- **`evaluate_expression.js`** - Shunting Yard algorithm and expression evaluation engine  
- **`stack.js`** - Custom Stack data structure implementation
- **`styles.css`** - Modern responsive design with CSS Grid and custom properties
- **`index.html`** - Semantic HTML structure with accessibility features

### Core Algorithm: Shunting Yard
Converts infix expressions to postfix notation for evaluation:

1. **Tokenization** - Parses input into numbers, operators, and brackets
2. **Precedence Handling** - Maintains mathematical order of operations (PEMDAS/BODMAS)
3. **Associativity Management** - Handles left-to-right and right-to-left operations
4. **Postfix Evaluation** - Uses custom Stack to evaluate the converted expression

### Key Technical Features
- **Custom Stack Class** - Complete implementation with push, pop, top, isEmpty methods
- **Operator Objects** - Rich representation with precedence, associativity, and type information
- **Multi-level Validation** - Character filtering, bracket balancing, and syntax validation
- **Context-aware Parsing** - Distinguishes unary vs binary operators based on position
- **Comprehensive Error Handling** - Graceful error recovery with meaningful user feedback

## User Interface

### Input Methods
- **Button Interface** - Click-based input with visual feedback
- **Keyboard Support** - Full keyboard shortcuts (Enter=Calculate, Escape=Clear, etc.)
- **Smart Input Validation** - Real-time filtering of invalid characters
- **Context-aware Behavior** - Different handling for keyboard vs button input

### Visual Design
- **Color-coded Buttons** - Numbers (light), operators (orange), functions (red)
- **Responsive Layout** - CSS Grid for consistent button arrangement
- **Error Display** - Dedicated area for clear error messages
- **Expression History** - Shows previous calculation when result is displayed

## Project Structure

```
calculator/
├── index.html                      # HTML structure and layout
├── styles.css                      # CSS styling with custom properties  
├── script.js                       # Main application logic
├── evaluate_expression.js          # Expression evaluation engine
├── stack.js                        # Custom Stack implementation
├── infix_to_postfix_algorithm.md   # Algorithm documentation
└── README.md                       # Project documentation
```

## Development Highlights

### Algorithm & Data Structures
- **Shunting Yard Implementation** - Complete infix-to-postfix conversion algorithm
- **Custom Stack Class** - Built from scratch with full error handling
- **Expression Parsing** - Multi-pass validation and tokenization system
- **Operator Precedence Engine** - Handles complex precedence and associativity rules

### Modern JavaScript Features
- **ES6 Modules** - Clean import/export architecture
- **Class-based OOP** - Stack implementation using ES6 classes
- **Regular Expressions** - Complex pattern matching for input validation
- **Event Delegation** - Efficient single-listener event handling
- **Error Handling** - Comprehensive try-catch with user feedback

### Code Quality
- **Modular Architecture** - Clear separation of concerns across files
- **Comprehensive Documentation** - Inline comments and algorithm explanation
- **Defensive Programming** - Multiple validation layers and edge case handling
- **Performance Optimization** - Efficient parsing and minimal DOM manipulation

## Learning Outcomes

This project demonstrates mastery of:
- **Computer Science Algorithms** (Shunting Yard, Stack operations)
- **Data Structure Implementation** (Custom Stack with full functionality)
- **Advanced JavaScript** (Modules, classes, regex, event handling)
- **Mathematical Computing** (Operator precedence, expression parsing)
- **Software Engineering** (Clean architecture, error handling, documentation)

## Acknowledgments

- **Computer Science Community** - For Shunting Yard algorithm documentation
- **The Odin Project** - For foundational web development learning
- **MDN Web Docs** - For comprehensive JavaScript reference

---

*This calculator showcases the evolution from basic arithmetic to advanced expression evaluation, demonstrating algorithmic thinking and software architecture skills.*