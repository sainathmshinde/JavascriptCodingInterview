In JavaScript, shallow copy and deep copy refer to different methods of copying objects or arrays. 
Understanding the difference between the two is crucial, especially when working with nested objects or arrays.

//Shallow Copy
1. Shallow Copy
A shallow copy of an object or array means that only the first level of the object or array is copied. 
If the original object contains references to other objects (e.g., nested objects or arrays), 
those references are not copied. Instead, the references themselves are copied, meaning both the original and 
the copied object still point to the same nested objects or arrays.

Example of Shallow Copy:

const original = {
    name: "Alice",
    details: {
      age: 25,
      address: "123 Main St",
    },
  };
  
  // Shallow copy using Object.assign or the spread operator
  const shallowCopy1 = Object.assign({}, original);
  const shallowCopy2 = { ...original };
  
  shallowCopy1.name = "Bob"; // Changes the 'name' property
  shallowCopy1.details.age = 30; // Changes the 'age' in the nested object
  
  console.log(original.name); // "Alice" (name is independent)
  console.log(original.details.age); // 30 (details object is shared)
  
  console.log(shallowCopy1.details === original.details); // true (same reference)
  
  //
Shallow Copy Methods:

Using Object.assign():
const shallowCopy = Object.assign({}, original);

Using the spread operator (...):
const shallowCopy = { ...original };

//Key Point: The top-level properties are copied, but any nested objects or arrays are still shared between the original and the copied object.

//Depp Copy

2. Deep Copy
A deep copy means that all levels of the object or array are copied. This includes copying any nested objects or arrays, 
so that the new object is completely independent of the original. 
Modifying the copied object or array will not affect the original, and vice versa.

Example of Deep Copy:

const original = {
    name: "Alice",
    details: {
      age: 25,
      address: "123 Main St",
    },
  };
  
  // Deep copy using JSON methods
  const deepCopy = JSON.parse(JSON.stringify(original));
  
  deepCopy.name = "Bob"; // Changes the 'name' property
  deepCopy.details.age = 30; // Changes the 'age' in the nested object
  
  console.log(original.name); // "Alice" (independent)
  console.log(original.details.age); // 25 (independent)
  
  console.log(deepCopy.details === original.details); // false (different reference)
  
  Deep Copy Methods:

Using JSON: The simplest way to perform a deep copy is to serialize the object to a JSON string and then parse it back into an object:

const deepCopy = JSON.parse(JSON.stringify(original));

Limitation: This method only works for objects that can be fully represented in JSON 
(e.g., it doesn't work well with functions, undefined, Date objects, or special objects like Map or Set).

Using a library like Lodash: Lodash provides a cloneDeep method that can handle more complex objects:

const _ = require('lodash');
const deepCopy = _.cloneDeep(original);

Key Point: The entire structure of the object, including all nested objects and arrays, is copied. 
The copied object is completely independent of the original.


Differences Summary:
Shallow Copy:

Copies only the first level of the object.
Nested objects or arrays are not copied; they are shared between the original and the copy.
Methods: Object.assign(), spread operator (...).
Deep Copy:

Copies all levels of the object, including all nested structures.
The copy is entirely independent of the original.
Methods: JSON.parse(JSON.stringify()), _.cloneDeep() from Lodash.
When to Use Which:
Shallow Copy: Use when you only need to copy the first level of properties and don't mind if nested objects or arrays are shared between the original and the copy. This is often sufficient for simple objects.

Deep Copy: Use when you need a completely independent copy of an object, particularly when dealing with nested structures where changes to the copy should not affect the original.

Understanding when to use a shallow or deep copy is crucial to managing state, especially in complex applications like those built with React.