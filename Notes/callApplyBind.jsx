/// Dynamic Contest of 'this'

In JavaScript, call, apply, and bind are methods used to control the value of this in functions. 
They allow you to explicitly set the this context for a function and, in some cases, 
immediately invoke it with specified arguments.

//call()
1. call() Method --
The call() method calls a function with a given this value and arguments provided individually.

Syntax - 
functionName.call(thisArg, arg1, arg2, ...);
/// example
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
  }
  
  const person = {
    name: "Alice",
  };
  
  greet.call(person, "Hello", "!"); // Output: "Hello, Alice!"
  
  In this example, the greet function is invoked immediately with this set to the person object, 
  and the arguments "Hello" and "!" are passed individually.
  //apply()
  2. apply() Method
  The apply() method is similar to call(), but it takes the function arguments as an array instead of listing them individually.

  //Syntax
  functionName.apply(thisArg, [arg1, arg2, ...])

  //exmple
  function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
  }
  
  const person = {
    name: "Bob",
  };
  
  greet.apply(person, ["Hi", "."]); // Output: "Hi, Bob."

  Here, greet is invoked with this set to person, and the arguments are passed as an array.

  //bind()
3. bind() Method
The bind() method does not immediately invoke the function. 
Instead, it returns a new function with a specific this value and, optionally, prepends arguments to the function. 
You can then call the returned function later with or without additional arguments.

Syntax
const boundFunction = functionName.bind(thisArg, arg1, arg2, ...)

//ex
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
  }
  
  const person = {
    name: "Charlie",
  };
  
  const greetCharlie = greet.bind(person, "Hey");
  greetCharlie("!!"); // Output: "Hey, Charlie!!"

  
  In this example, greet.bind(person, "Hey") creates a new function greetCharlie where this is set to person and "Hey" is pre-filled as the first argument. 
  When greetCharlie("!!") is called, it outputs "Hey, Charlie!!".

//------------------------

  Key Differences:
Immediate Invocation vs. Function Creation:

call() and apply() immediately invoke the function with the specified this context and arguments.
bind() creates a new function with a bound this context and optional arguments but does not immediately invoke it.
Argument Passing:

call() passes arguments individually.
apply() passes arguments as an array.
bind() allows you to create a function with pre-set arguments that can be called later with additional arguments.
When to Use Each:
call(): Use when you want to invoke a function immediately and pass arguments individually.
apply(): Use when you want to invoke a function immediately and have arguments in an array.
bind(): Use when you want to create a new function with a specific this context that can be invoked later.
Practical Example: Using bind for Event Handlers in React
In a React component, you might use bind to ensure that a method always has the correct this context when used as an event handler.

class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      console.log(this); // `this` refers to the component instance
    }
  
    render() {
      return <button onClick={this.handleClick}>Click Me</button>;
    }
  }
  