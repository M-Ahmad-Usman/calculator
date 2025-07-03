# Calculator

A fully functional web-based calculator built with HTML, CSS, and JavaScript as part of **The Odin Project's** [Foundations Calculator](https://www.theodinproject.com/lessons/foundations-calculator) capstone project.

## Live Preview

Click [here](https://m-ahmad-usman.github.io/calculator/) to see Live Preview.

## About

This calculator project represents the culmination of the Foundations path in The Odin Project curriculum. It demonstrates proficiency in:

- **HTML** - Semantic structure and accessibility
- **CSS** - Modern styling with Flexbox and Grid layouts
- **JavaScript** - DOM manipulation, event handling, and functional programming

## Features

### Core Functionality
- ✅ Basic arithmetic operations (addition, subtraction, multiplication, division, modulus)
- ✅ Clear display functionality (C and CE buttons)
- ✅ Backspace functionality to undo last input
- ✅ Decimal point support with validation
- ✅ Division by zero protection
- ✅ Automatic rounding for long decimal results
- ✅ Expression validation and error handling

### User Experience
- Clean, intuitive interface with visual feedback
- Responsive design that works on various screen sizes
- Real-time expression display showing current calculation
- Immediate visual feedback for button interactions
- Robust error handling with user-friendly messages

### Technical Highlights
- Modular JavaScript architecture with calculator object
- Event delegation for efficient event handling
- Regular expression validation for input sanitization
- Precise floating-point arithmetic with custom rounding
- Clean, maintainable code structure

## Technical Implementation

### Architecture
The calculator uses an object-oriented approach with a main `calculator` object that stores:
- Operands (`oprnd1`, `oprnd2`)
- Operator (`oprtr`)
- Operation functions for each arithmetic operation
- Validation patterns using regular expressions

### Key JavaScript Features
- **Regular Expressions**: Used for input validation and operator detection
- **Event Delegation**: Single event listener handles all button clicks
- **Custom Rounding**: Prevents floating-point overflow in display
- **Input Sanitization**: Prevents invalid expressions and multiple decimal points

### CSS Techniques
- **CSS Grid**: For calculator button layout
- **Flexbox**: For overall component alignment
- **Custom Properties**: For consistent styling
- **Responsive Design**: Adapts to different screen sizes

## Project Requirements Met

This calculator successfully implements all core requirements from The Odin Project assignment:

1. ✅ **Basic Operations**: Add, subtract, multiply, divide functions
2. ✅ **Operate Function**: Takes operator and two numbers, calls appropriate operation
3. ✅ **HTML Structure**: Calculator with buttons for digits, operators, and equals
4. ✅ **Display Population**: Functions to populate display on button clicks
5. ✅ **Full Functionality**: Stores values, performs calculations, updates display
6. ✅ **Bug Prevention**: Handles edge cases and prevents common calculator bugs

### Extra Credit Features Implemented
- ✅ **Decimal Support**: Users can input floating-point numbers with validation
- ✅ **Backspace Button**: Undo last input functionality
- ✅ **Advanced Error Handling**: Comprehensive input validation and error messages

## Usage

### Basic Operations
1. Enter a number by clicking the digit buttons
2. Click an operator (+, -, *, /, %)
3. Enter a second number
4. Click equals (=) to see the result

### Special Functions
- **C**: Clear all data and start fresh
- **CE**: Clear current entry only
- **x**: Backspace - remove last character
- **.**: Add decimal point (prevented if already present)

### Example Calculations
- `12 + 7 = 19`
- `15.5 / 2 = 7.75`
- `10 % 3 = 1`
- `8 * 0.5 = 4`

## Project Structure

```
calculator/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # Calculator logic and functionality
└── README.md       # Project documentation
```

## Code Quality

The project demonstrates:
- **Clean Code**: Well-commented, readable JavaScript
- **Separation of Concerns**: HTML for structure, CSS for styling, JavaScript for behavior
- **Error Handling**: Comprehensive validation and user feedback
- **Performance**: Efficient event handling and minimal DOM manipulation
- **Accessibility**: Semantic HTML and keyboard-friendly interface

## Learning Outcomes

This project reinforced key concepts including:
- DOM manipulation and event handling
- Regular expressions for input validation
- JavaScript objects and function organization
- CSS Grid and Flexbox for modern layouts
- Debugging and testing user interfaces
- Planning and implementing complex user interactions


## Acknowledgments

- **The Odin Project** - For providing excellent curriculum and guidance
- **MDN Web Docs** - For comprehensive JavaScript documentation
- **Web Development Community** - For inspiration and best practices

---

*This calculator represents my journey through The Odin Project's Foundations course, demonstrating growth in web development fundamentals and problem-solving skills.*