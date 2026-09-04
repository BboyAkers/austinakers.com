## 1.2.1 Script Tags and Closures

As web applications grew in size and complexity the dangers of a global scope became evident. This resulted to the invention of Immediately Invoked Function Expressions (IIFE)

There are 3 different types of ways to create IIFEs such as using:

- Parentheses
```javascript
(function() {  console.log('IIFE using parenthesis')})()
```


- Bitwise Operator
```javascript
~function() {  console.log('IIFE using a bitwise operator')}()
```


- Void Operator
```javascript
void function() {  console.log('IIFE using the void operator')}()
```


## 1.2.2 RequireJS, AngularJS, and Dependency Injection

Module systems like RequireJS or frameworks with dependency injection like AngularJS made it possible to allow for developers to explicitly name the dependencies of each module.

Example:

Sum Module inside *mathlib/sum.js*
```js
define(function() {
	return sum

	function sum(...values) {
		return values.reduce((a, b) => a + b, 0)
	}
})
```

Mathlib module inside *index.js*
```js
define(['mathlib/sum'], function(sum) {   
	return { sum }
})
```

Now we can use our sum function inside our application
```js
require(['mathlib'], function(mathlib) {
	mathlib.sum(1,2,3)
	// <- 6
})
```

This explicitness in dependency declaration, at a module level, made it obvious how a component was related to other parts of the application.

RequireJS wasn’t without problems. The entire pattern revolved around its ability to asynchronously load modules, which was ill-advised for production deployments because of how poorly it performed. Using the asynchronous loading mechanism, you issued hundreds of network requests in a waterfall fashion before much of your code was executed.

The dependency injection system in AngularJS suffered many of the same problems.

## 1.2.3 Node.js and the Advent of CommonJS

CommonJS took advantage of the fact that Node.js programs had access to the filesystem. The CommonJS standard is more in line with traditional module-loading mechanisms.

Example:
```js
const mathlib = require( './mathlib');
```


 In RequireJS and AngularJS, you could have many dynamically defined modules per file, whereas CommonJS had a one-to-one mapping between files and modules.

## 1.2.4 ES6, import, Babel, and Webpack

The ES6 specification included a module syntax native to JavaScript, often referred to as ECMAScript modules (ESM).

ESM has a static declarative API and a promise-based dynamic programmable API.

Example:
```js
// Static Declarative API   
import math lib from './mathlib';   

// Dynamic Promised Based API   
import( ' ./mathlib' ).then(mathlib => {
 // ...
})
```

Static imports vastly improve the inner observable capabilities of module systems. It enables each module to be analyzed statically and lexically extracted from the abstract syntax tree (AST) in the system. Static imports in ESM are constrained to the topmost level of a module. This further simplifies parsing and the inner observability.

ESM specifies a way of doing asynchronous module loading, which implies that parts of an application’s dependency graph could be loaded in response to specific events, concurrently, or lazily as needed.

## 1.3 The Perks of Modular Design

- Modularity spread across files limits the amount of complexity we have to pay attention to when working on a particular feature.
- Maintainability- The ability to effect change in the codebase improves significantly.

By default modular code is meant to be highly maintainable.  It keeps pieces of code simple and following the single responsibility principle (SRP).

When interfaces are well-designed, they can be grown in nonbreaking ways, augmenting the number of use cases they can satisfy, without compromising existing usage.

Strong interfaces are effective at hiding away weak implementations. In other words if I have a component and it's implemented poorly, It'll hide the weak implementation and allow for that implementation to be refactored into a more robust implementation, provided the interface to that component holds.

## 1.4 Modular Granularity

When we want to make an application more maintainable, we should consider creating explicitly defined layers of code so that we can grow each layer horizontally while preventing the complexity of those additions from spreading to other, unrelated, layers.

The key to proper modular design is in having the utmost respect for all interfaces, and that includes the interfaces exposed by internal functions.

Performance, we should be treating it as a feature, and for the most part we shouldn’t place a higher premium on it than we would for other features.

As engineers we should focus on the problems we're currently running into or might run into soon instead of planning for hokey-stick growth of infrastructure. Doing this allows for our infrastructure to:

- Grow more naturally
- Adapt to the needs of the near-term
- Gradually progress towards support for a larger application and larger set of requirements.

## 1.5 Modular JavaScript: A Necessity

Upticks/ major advancements in web development came as we adopted new libraries and frameworks like React, jQuery, Angular, Vue, ect. Examples of this improvements are:

- Writing code under ES6 and beyond, but then transpiling parts of that code down to ES5 to attain broader browser support
- Shared rendering, using the same code on both server and client to render a page quickly on initial page load and continue to load pages quickly upon navigation
- Automated code bundling, packing the modules that an application comprises into a single bundle for optimized delivery
- Bundle-splitting along routes so that there are several bundles outputted, each optimized for the initially visited route; CSS bundling at the JavaScript module level so that CSS (which doesn’t feature a native module syntax) can also be split across bundles
- Myriad ways of optimizing assets such as images at compile time, improving productivity during development while keeping production deployments highly performant