// Calculator object to perform basic arithmetic operations
let calculator = {
    oprnd1: undefined,
    oprnd2: undefined,
    oprtr: undefined,

    validOprtrs: ["+", "-", "*", "/", "%"],

    // Define operators
    "+": function () { return this.oprnd1 + this.oprnd2 },
    "-": function () { return this.oprnd1 - this.oprnd2 },
    "*": function () { return this.oprnd1 * this.oprnd2 },
    "/": function () { return this.oprnd1 / this.oprnd2 },
    "%": function () { return this.oprnd1 % this.oprnd2 },
};
