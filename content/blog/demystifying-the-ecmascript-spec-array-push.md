---
title: "Demystifying the ECMAScript Spec: Array.prototype.push"
description: "A deep dive into the specification of Array.prototype.push"
tags:
 - 'intermediate'
 - 'ecmascript'
 - 'javascript'
date: "2026-09-22"
minutes: 10
id: 6
---

## Introduction
Throughout my career, I've always been told to read the official specification for JavaScript. Early in my career reading it I didn't fully understand it, but as I grew in my career, I started to appreciate it more and even used it as a reference when wanting to dive deeper into certain functionalities of the JavaScript language. Recently, I've wanted to start a series of blog posts to go through some of the specs that I find interesting and really break them down to the fundamentals. This post is the first in that series, and I want to start with something relatively simple but fundamental to all JavaScript developers: **Array.prototype.push()**.

## What is the ECMAScript Spec?

The ECMAScript Specification is the official specification for the JavaScript language. It is a document that is maintained by the Ecma International Technical Committee 39 (TC39). The specification is a living document that is constantly being updated with new features and changes to the language. The specification is divided into several parts, each of which covers a different aspect of the language:

- **Types and Values**: This section covers the different types of values that can be stored in variables, such as numbers, strings, booleans, and objects.
- **Abstract Operations**: This section covers the different operations that can be performed on values, such as addition, subtraction, and multiplication.
- **Syntax and Parsing**: This section covers the syntax of the JavaScript language and how it is parsed.
- **Execution of Built-in Functions**: This section covers the execution of built-in functions, such as `Array.prototype.push()`.
- **Built-in Objects**: This section covers the built-in objects of the JavaScript language, such as `Array`, `Object`, and `Function`.
- **Host Objects and Environments**: This section covers the host objects and environments of the JavaScript language, such as the `Window` object and the `Document` object.


## What is `Array.prototype.push()`?

To break this down even further we need to understand what the 3 parts of `Array.prototype.push()` are. 
- `Array` is one of the built-in objects in JavaScript. It enables the ability to store a collection of items.
- `prototype` is an object that is used to provide common properties and methods on objects. If we have a constructor that inherits from `Array`, it will have access to the properties and methods on `Array.prototype`. In other words, methods such as `map`, `filter`, `reduce`, and `push` are all located on `Array.prototype` and we can use them on any array object we create.
- `push()` is a method on `Array.prototype` that is used to add new elements to the end of an array. It is also a **mutating** method, meaning it modifies the original array. It does not create a copy like other methods such as `.map()` and `.filter()`. When we look in the spec we'll see this.

Here is an example of `Array.prototype.push()` in action:

```javascript
const months = ['Jan', 'Mar', 'Apr', 'May'];
months.push('Feb');
console.log(months); // Array ['Jan', 'Mar', 'Apr', 'May', 'Feb']
```


## Breaking Down The Spec
 
Open: [Ecmascript Array.prototype.push()](https://262.ecma-international.org/#sec-array.prototype.push)

The spec for Array.prototype.push() reads as follows:

1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let argCount be the number of elements in items.
4. If len + argCount > 2****53 - 1, throw a TypeError exception.
5. For each element E of items, do
   a. Perform ? Set(O, ! ToString(𝔽(len)), E, true).
   b. Set len to len + 1.
6. Perform ? Set(O, "length", 𝔽(len), true).
7. Return 𝔽(len).
The "length" property of this method is 1𝔽.

Let's break this down line by line while having the code example above as reference.

```javascript
const months = ['Jan', 'Mar', 'Apr', 'May'];
months.push('Feb');
console.log(months); // Array ['Jan', 'Mar', 'Apr', 'May', 'Feb']
```

1. **Let O be ? ToObject(this value).** 
	- This is saying: "Get the object that the `push()` method is being called on." 
        - Refrencing the code example above, `months` is `this value`
	- The `?` is used for error handling. If `ToObject(this value)` throws an error, the function will throw an error. 
        - If `months` was `null` or `undefined`, this method, `push()`, would throw an error.
	- `ToObject` is an abstract operation that converts `this value` to an object. It is used to ensure that the object that the method is called on is an object. 
        - This is the same abstract operation as `Object()`

2. **Let len be ? LengthOfArrayLike(O).**
	- This is saying: "Get the length of the array-like object `O`."
	- `?` is used for error handling. If `LengthOfArrayLike(O)` throws an error, the function will throw an error.
	- `LengthOfArrayLike(O)` is an abstract operation that returns the length of the array-like object `O`. 
	
3. **Let argCount be the number of elements in items.**
	- `items` is the array of arguments that are passed to the `push()` method.
	- `argCount` is the number of elements in the array of arguments.

4. **If len + argCount > 2****53 - 1, throw a TypeError exception.**
	- `len` is the length of the array.
	- `argCount` is the number of elements in the array of arguments.
	- `2****53 - 1` is the maximum number of elements that can be stored in an array.
	- If `len + argCount` is greater than `2****53 - 1`, the function will throw a `TypeError` exception.

5. **For each element E of items, do**
	- `E` is an element of the array of arguments.
	- `items` is the array of arguments that are passed to the `push()` method.
	- This loop will iterate over each element in the array of arguments.
	
	a. **Perform ? Set(O, ! ToString(𝔽(len)), E, true).**
		- `Set(O, ! ToString(𝔽(len)), E, true)` is an abstract operation that sets the value of the property `! ToString(𝔽(len))` to `E` on the object `O`.
		- `! ToString(𝔽(len))` is the property name that is used to store the element in the array.
		- `E` is the element that is being added to the array.
		- `true` is a boolean value that indicates whether the property should be set.
		- `?` is used for error handling. If `Set(O, ! ToString(𝔽(len)), E, true)` throws an error, the function will throw an error.
	
	b. **Set len to len + 1.**
		- `len` is the length of the array.
		- `len + 1` is the new length of the array.
		- This will increment the length of the array by 1.

6. **Perform ? Set(O, "length", 𝔽(len), true).**
	- `Set(O, "length", 𝔽(len), true)` is an abstract operation that sets the value of the property `"length"` to `𝔽(len)` on the object `O`.
	- `"length"` is the property name that is used to store the length of the array.
	- `𝔽(len)` is the value of the length of the array.
	- `true` is a boolean value that indicates whether the property should be set.
	- `?` is used for error handling. If `Set(O, "length", 𝔽(len), true)` throws an error, the function will throw an error.

7. **Return 𝔽(len).**
	- `𝔽(len)` is the value of the length of the array.
	- This will return the new length of the array.

This may seem like a lot of code, but it is actually quite simple. Let's break it down even further with an example.
