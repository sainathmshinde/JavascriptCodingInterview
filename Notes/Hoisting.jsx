//Hoisting

Hoisting in JavaScript is a behavior where variable and function declarations are moved to the top of their containing scope 
(either the global scope or the function scope) during the compilation phase, before the code is executed. 
This makes it possible to use functions and variables before they are declared in the code.

Key Points About Hoisting:
Only Declarations are Hoisted: Only the declarations are hoisted, 
not the initializations or assignments.
Var, Let, and Const: Variables declared with var are hoisted 
and initialized with undefined. Variables declared with let and const are hoisted but remain in a "temporal dead zone" until they are initialized.

1. Function Hoisting
In JavaScript, function declarations are hoisted completely, 
meaning you can invoke a function before it is defined.

//------
sayHello(); // Output: "Hello, World!"

function sayHello() {
  console.log("Hello, World!");
}

/* 
Here, even though the function sayHello is called before it is defined, 
it works because the function declaration is hoisted to the top.
*/

//----

Function Expressions Are Not Hoisted
If a function is defined as an expression, it does not get fully hoisted:
//---
sayHello(); // Output: TypeError: sayHello is not a function

var sayHello = function () {
  console.log("Hello, World!");
};

In this case, only the variable sayHello is hoisted (with the value undefined), but the function itself is not.

//----
2. Variable Hoisting with var
Variables declared with var are hoisted and initialized with undefined.


console.log(myVar); // Output: undefined

var myVar = 10;

console.log(myVar); // Output: 10

In the above example, the declaration of myVar is hoisted to the top, but its value is not initialized until the line 
where myVar = 10 is executed. Until then, myVar is undefined.

Internally, this code is interpreted as:

var myVar;

console.log(myVar); // Output: undefined

myVar = 10;

console.log(myVar); // Output: 10


//----

3. Variable Hoisting with let and const

Variables declared with let and const are hoisted, but they are not initialized and remain in a "temporal dead zone" (TDZ) 
until the code execution reaches their definition.

console.log(myLetVar); // ReferenceError: Cannot access 'myLetVar' before initialization

let myLetVar = 20;

In this example, trying to access myLetVar before its declaration results in a ReferenceError. 
The variable is hoisted but is not initialized until the let statement is executed.

//-----

4. Temporal Dead Zone (TDZ)

The TDZ is the time between the entering of the scope (where the variable is declared) and the variable’s actual declaration and initialization. 
Variables in the TDZ cannot be accessed.

console.log(myConstVar); // ReferenceError: Cannot access 'myConstVar' before initialization

const myConstVar = 30;

//---
//Example

console.log(a); // Output: undefined
console.log(b); // Output: ReferenceError: Cannot access 'b' before initialization
console.log(c); // Output: ReferenceError: Cannot access 'c' before initialization

var a = 1;
let b = 2;
const c = 3;

console.log(a); // Output: 1
console.log(b); // Output: 2
console.log(c); // Output: 3


The declaration of a is hoisted, so it is undefined initially.
b and c are in the TDZ and cannot be accessed before their declarations.
Conclusion
Function declarations are fully hoisted.
Variables declared with var are hoisted and initialized with undefined.
Variables declared with let and const are hoisted but are not initialized, leading to a ReferenceError if accessed before their declaration due to the TDZ.

///// Normal Function and Arrow function differeance  and Hoisting


In JavaScript, both normal functions (also known as function declarations) and arrow functions are used to define functions, 
but they have differences in syntax, behavior, and how they are treated during hoisting.

1. Syntax Differences

Normal Function (Function Declaration):

function greet() {
    console.log("Hello, World!");
  }

Arrow Function:

const greet = () => {
    console.log("Hello, World!");
  };

  
  //--
2. Key Differences Between Normal Functions and Arrow Functions
    2.1 Hoisting
    Function Declarations: Function declarations are fully hoisted, meaning you can call them before they are defined in the code.

greet(); // Output: "Hello, World!"

function greet() {
  console.log("Hello, World!");
}

The function declaration is hoisted, allowing it to be called even before it appears in the code.

//----

Arrow Functions: Arrow functions are not hoisted in the same way as function declarations. 
They are treated as variable declarations, so only the variable is hoisted, not the function definition. 
This means that trying to invoke an arrow function before it is defined will result in an error.

greet(); // Output: TypeError: greet is not a function

const greet = () => {
  console.log("Hello, World!");
};


In this example, greet is hoisted as a variable but remains undefined until the assignment occurs. 
As a result, invoking it before it is defined throws an error.

//------------------
2.2 this Binding
Normal Functions: In a normal function, this is determined by how the function is called (the context in which it is invoked).

const person = {
    name: "John",
    greet: function () {
      console.log(`Hello, ${this.name}`);
    },
  };
  
  person.greet(); // Output: "Hello, John"

  
Here, this refers to the object person because the function is called as a method of that object.

Arrow Functions: Arrow functions do not have their own this. They inherit this from the surrounding context (lexical scope).

const person = {
    name: "John",
    greet: () => {
      console.log(`Hello, ${this.name}`);
    },
  };
  
  person.greet(); // Output: "Hello, undefined"

  In this example, this is not bound to the person object because arrow functions don’t have their own this. 
  Instead, this is inherited from the lexical scope (typically the global object in non-strict mode), where name is not defined.


  //----------------
  2.3 Arguments Object
Normal Functions: Normal functions have access to the arguments object, 
which contains all arguments passed to the function.

function sum() {
    console.log(arguments);
  }
  
  sum(1, 2, 3); // Output: [1, 2, 3]

  Arrow Functions: Arrow functions do not have their own arguments object. If you need to access arguments, you must use a rest parameter (...args) or use a normal function.

  const sum = () => {
    console.log(arguments); // ReferenceError: arguments is not defined
  };
  
  sum(1, 2, 3);
  