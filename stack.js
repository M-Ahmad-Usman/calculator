export default class Stack {
    constructor() {
        this.stack = [];
    }

    push(data) {
        this.stack.push(data);
    }

    pop() {
        if (this.stack.length == 0) {
            throw new Error ("Stack UnderFlow. Can't Pop from an empty stack.");
        }
        return this.stack.pop();
    }

    top() {
        if (this.stack.length == 0) {
            throw new Error("Stack Underflow. Can't get Top from an empty stack.");
        }
        return this.stack[this.size()-1];
    }

    isEmpty() {
        return this.stack.length == 0;
    }

    size() {
        return this.stack.length;
    }

    print() {
        for (let item of this.stack) {
            console.log(item);
        }
    }
}