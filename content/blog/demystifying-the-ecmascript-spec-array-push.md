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




