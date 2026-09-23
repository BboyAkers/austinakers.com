---
title: "Demystifying the ECMAScript Spec: Array.prototype.push"
description: "A step-by-step tutorial on translating the ECMAScript specification for Array.prototype.push into working JavaScript."
tags:
  - 'intermediate'
  - 'ecmascript'
  - 'javascript'
  - 'tutorial'
date: "2026-09-22"
minutes: 12
id: 6
---

## Introduction

Throughout my career, senior engineers always told me: *"Read the official specification."* Early on, opening the ECMAScript document felt like reading legal code written for compiler authors—dense, foreign, and overwhelming. But over time, learning to parse the spec became one of the most effective ways to truly understand how JavaScript executes under the hood.

This post is the first in a series breaking down the fundamentals of ECMAScript specifications by building our own polyfills directly from the official algorithm. We will start with a method every JavaScript developer uses daily: `Array.prototype.push()`.

By the end of this tutorial, you will know:
1. How to navigate and read your very first method from the ECMAScript spec.
2. How to map abstract operations to real JavaScript code.
3. Why `push()` is generic and works on objects that aren't arrays.

---

## The Spec "Decoder Ring"

Before jumping into reading the spec and building our own version of `Array.prototype.push()`, let's cover some of the syntax and terminology that TC39 uses across the specification:

| Spec Notation | Meaning in Plain JavaScript |
| :--- | :--- |
| **`? Operation()`** | **Return if abrupt:** Run the operation. If it throws an error, immediately rethrow/propagate that error. |
| **`! Operation()`** | **Assert success:** This operation is guaranteed by invariants never to fail or throw an error under these conditions. |
| **`𝔽(number)`** | **Number conversion:** Converts an internal mathematical real number into an ECMAScript double-precision 64-bit float. |
| **`ToObject(val)`** | Wraps primitives into their object counterparts (`Object(val)`); throws a `TypeError` if given `null` or `undefined`. |

---

## The Official Specification

According to the [ECMAScript Specification for `Array.prototype.push`](https://262.ecma-international.org/#sec-array.prototype.push), when we use `Array.prototype.push()` these steps occur:

1. Let *O* be ? `ToObject`(*this value*).
2. Let *len* be ? `LengthOfArrayLike`(*O*).
3. Let *argCount* be the number of elements in *items*.
4. If *len* + *argCount* > $2^{53} - 1$, throw a **TypeError** exception.
5. For each element *E* of *items*, do:
   a. Perform ? `Set`(*O*, ! `ToString`(𝔽(*len*)), *E*, **true**).
   b. Set *len* to *len* + 1.
6. Perform ? `Set`(*O*, `"length"`, 𝔽(*len*), **true**).
7. Return 𝔽(*len*).

Let's translate this specification into a custom method called `austinPush` (fancy naming, i know 😎).

---

## Building `austinPush()`: Step-by-Step


This code snippet will be our reference for understanding how `push()` works. 

```javascript
const months = ['Jan', 'Mar', 'Apr', 'May'];
months.push('Feb');
console.log(months); // Array ['Jan', 'Mar', 'Apr', 'May', 'Feb']
```

### Step 1: Coerce `this` to an Object

> **Spec:** 1. Let *O* be ? `ToObject`(*this value*).

- This is saying: "Get the object (Array) that the `push()` method is being called on." 
    - Refrencing the code example above, `months` is `this value`
- The `?` is used for error handling. If `ToObject(this value)` throws an error, the function will throw an error. 
    - If `months` was `null` or `undefined`, this method, `push()`, would throw an error.
- `ToObject` is an abstract operation that converts `this value` to an object. It is used to ensure that the object that the method is called on is an object. 
    - `Object(months)` would return the object `months`.


```javascript
function austinPush(...items) {
    // 1. Let O be ? ToObject(this value).
    let O = Object(this);

    // ...
}

```

---

### Step 2: Determine Current Length

> **Spec:** 2. Let *len* be ? `LengthOfArrayLike`(*O*).
> 
> 
- This is saying: "Get the object (Array) that the `push()` method is being called on." 
    - Refrencing the code example above, `months` is `this value`
- The `?` is used for error handling. If `ToObject(this value)` throws an error, the function will throw an error. 
    - If `months` was `null` or `undefined`, this method, `push()`, would throw an error.
- `ToObject` is an abstract operation that converts `this value` to an object. It is used to ensure that the object that the method is called on is an object. 
    - `Object(months)` would return the object `months`.

Notice that the spec does **not** check if `O` is an array. It only checks `LengthOfArrayLike(O)`. This operation reads the `length` property of `O`, coerces it into a non-negative integer, and caps it at $2^{53} - 1$.

Let's write a small helper that mirrors `LengthOfArrayLike(O)`:

```javascript
const toLength = (value) => {
  const len = Number(value);
  if (Number.isNaN(len) || len <= 0) return 0;
  return Math.min(Math.floor(len), Number.MAX_SAFE_INTEGER);
};

function austinPush(...items) {
    // 1. Let O be ? ToObject(this value).
    let O = Object(this);

    // 2. Let len be ? LengthOfArrayLike(O).
    let len = toLength(O.length); 
    
  // ...
}

```

---

### Step 3 & 4: Count Arguments and Check Safe Limits

> **Spec:**
> 3. Let *argCount* be the number of elements in *items*.
> 
> 
> 4. If *len* + *argCount* > $2^{53} - 1$, throw a **TypeError** exception.
> 
> 

- `items` is the array of arguments that are passed to the `push()` method.
- `argCount` is the number of arguments that are passed to the `push()` method(`austinPush()` for us).
- `len` is the current length of the object. It is calculated using `toLength()` which is a helper function that mirrors `LengthOfArrayLike(O)`.
- `$2^{53} - 1$` JavaScript represents numbers using 64-bit binary floating-point values (IEEE 754). Integers beyond $2^{53} - 1$ (`Number.MAX_SAFE_INTEGER`) cannot be uniquely represented. If adding your arguments would cause the array length to exceed that limit, the engine aborts immediately with a `TypeError`.

```javascript
const toLength = (value) => {
  const len = Number(value);
  if (Number.isNaN(len) || len <= 0) return 0;
  return Math.min(Math.floor(len), Number.MAX_SAFE_INTEGER);
};

function austinPush(...items) {
    // 1. Let O be ? ToObject(this value).
    let O = Object(this);

    // 2. Let len be ? LengthOfArrayLike(O).
    let len = toLength(O.length);

    // 3. Let argCount be the number of elements in items.
    let argCount = items.length

    // 4. If len + argCount > 2****53 - 1, throw a TypeError exception.
    if ((len + argCount) > (2 ** 53 - 1)) {
      throw new TypeError('Operation could not be performed, exceeded max safe integer in JavaScript');
    }
    
  // ...
}

```

---

### Step 5: Append Elements to the Object

> **Spec:**
> 5. For each element *E* of *items*, do:
> 
> 
> a. Perform ? `Set`(*O*, ! `ToString`(𝔽(*len*)), *E*, **true**).
> 
> 
> b. Set *len* to *len* + 1.
> 
> 

#### Step 5:
- At this point we're creating a foreach loop and running it for each element inside of items. We take the first element and add it to the end of the object.
- `E` is an element of the array of arguments.
- `items` is the array of arguments that are passed to the `push()` method.
- `len` is the current length of the object.

#### Step 5a:
- This the point where we append each element to the end of the array. if `months` is the array and we are pushing `'Feb'` into it, then we are adding the element `'Feb'` to the end of the array `months`. This is where that happens
- `Set` is an abstract operation that sets the value of the property `! ToString(𝔽(len))` to `E` on the object `O`.
- `! ToString(𝔽(len))` is the property name that is used to store the element in the array.
- `E` is the element that is being added to the array.
- `true` is a boolean value that indicates whether the property should be set.
- `?` is used for error handling. If `Set(O, ! ToString(𝔽(len)), E, true)` throws an error, the function will throw an error.

#### Step 5b:
- This is incrementing the length of the array by 1, because we are adding a new element to the array.
- `len` is the length of the array.
- `len + 1` is the new length of the array.
- This will increment the length of the array by 1.

```javascript
const toLength = (value) => {
  const len = Number(value);
  if (Number.isNaN(len) || len <= 0) return 0;
  return Math.min(Math.floor(len), Number.MAX_SAFE_INTEGER);
};

function austinPush(...items) {
    // 1. Let O be ? ToObject(this value).
    let O = Object(this);

    // 2. Let len be ? LengthOfArrayLike(O).
    let len = toLength(O.length);

    // 3. Let argCount be the number of elements in items.
    let argCount = items.length

    // 4. If len + argCount > 2****53 - 1, throw a TypeError exception.
    if ((len + argCount) > (2 ** 53 - 1)) {
      throw new TypeError('Operation could not be performed, exceeded max safe integer in JavaScript');
    }

    // 5. For each element E of items, do
    items.forEach((E) => {
      // a. Perform ? Set(O, ! ToString(𝔽(len)), E, true).
      O[len] = E;
      // b. Set len to len + 1.
      len = len + 1;
    })

  // ...
}


```

---

### Step 6 & 7: Commit New Length & Return

> **Spec:**
> 6. Perform ? `Set`(*O*, `"length"`, 𝔽(*len*), **true**).
> 
> 
> 7. Return 𝔽(*len*).
> 
> 

#### Step 6
- This is updating the length property of the array to the new length.
- `?` is used for error handling. If `Set(O, "length", 𝔽(len), true)` throws an error, the function will throw an error.
- `Set(O, "length", 𝔽(len), true)` is an abstract operation that sets the value of the property `"length"` to `𝔽(len)` on the object `O`.
- `"length"` is the property name that is used to store the length of the array.
- `𝔽(len)` is the value of the length of the array.
- `true` is a boolean value that indicates whether the property should be set.

#### Step 7
- This is returning the new length of the array.
- `𝔽(len)` is the value of the length of the array.

A common beginner slip-up is assuming `push()` returns the modified array. The spec shows that it explicitly writes the final count to `"length"` on *O* and returns that numeric count.

```javascript
  // Step 6: Update the length property on O
  O.length = len;

  // Step 7: Return the new length
  return len;

```

---

## The Complete Implementation

Here is our complete spec-compliant implementation, attached to `Array.prototype` for educational exploration:

```javascript
const toLength = (value) => {
  const len = Number(value);
  if (Number.isNaN(len) || len <= 0) return 0;
  return Math.min(Math.floor(len), Number.MAX_SAFE_INTEGER);
};

function austinPush(...items) {
  // 1. Let O be ? ToObject(this value).
  if (this == null) {
    throw new TypeError('Array.prototype.austinPush called on null or undefined');
  }
  const O = Object(this);

  // 2. Let len be ? LengthOfArrayLike(O).
  let len = toLength(O.length);

  // 3. Let argCount be the number of elements in items.
  const argCount = items.length;

  // 4. If len + argCount > 2**53 - 1, throw a TypeError exception.
  if (len + argCount > Number.MAX_SAFE_INTEGER) {
    throw new TypeError('Exceeded maximum safe array length');
  }

  // 5. For each element E of items, do
  for (const element of items) {
    // a. Perform ? Set(O, ! ToString(𝔽(len)), E, true).
    O[len] = element;
    // b. Set len to len + 1.
    len += 1;
  }

  // 6. Perform ? Set(O, "length", 𝔽(len), true).
  O.length = len;

  // 7. Return 𝔽(len).
  return len;
}

// Attach custom implementation to prototype for testing
Array.prototype.austinPush = austinPush;

```

(Note: Monkey patching built-in prototypes in production applications is discouraged. It's used here to study native behavior.)

---

## Verifying Our Implementation

Run this test suite in your console to verify that our polyfill handles typical usages, edge cases, and generic bindings:

```javascript
// Test 1: Standard push and return value
const months = ['Jan', 'Mar', 'Apr', 'May'];
const resultLength = months.austinPush('Feb');
console.assert(resultLength === 5, `Expected 5, got ${resultLength}`);
console.assert(months[4] === 'Feb', 'Element not inserted at index 4');

// Test 2: Appending multiple arguments
const numbers = [1, 2];
numbers.austinPush(3, 4, 5);
console.assert(numbers.length === 5, `Expected length 5, got ${numbers.length}`);
console.assert(numbers[4] === 5, 'Element not inserted at index 4');

// Test 4: Null / Undefined check
try {
  Array.prototype.austinPush.call(null, 'fail');
  console.assert(false, 'Should have thrown TypeError');
} catch (err) {
  console.assert(err instanceof TypeError, 'Expected TypeError on null context');
}

console.log('All tests passed successfully!');

```

---

## Conclusion

Reading the ECMAScript specification might seem intimidating initially, but every built-in method follows the same predictable pattern: input coercion, validation, state mutation, and result return. Breaking it down into executable code turns abstract standards into clear mental models. Hopefully this helped!

If you want to explore the official specification directly, check out [tc39.es/ecma262](https://tc39.es/ecma262/?utm_source=gemini) and if you like this follow me on social media and message me. I'd be happy to do more tutorials like this!
