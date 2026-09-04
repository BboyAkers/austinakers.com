**Tip:**
When you have to add a feature to a program but the code is not structured in a convenient way, first refactor the program to make it easy to add the feature, then add the feature.

## The First Steps in Refactoring

Whenever you refactor ensure you have a solid set of tests for that section of code. Test are essential because even though we may refactor things for the better to avoid most opportunities for introducing bugs, we are still human and make mistakes. The larger the program, the higher the probability.

Make all tests self-checking. In other words they all the strings are identical to the reference strings. (think of `expect().toBe()`). Writing more tests allow us to spend less time debugging.

## Decomposing the *statement* Function

When refactoring long functions, try to identify points that separate different parts of the overall behavior.

```javascript
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let results = `Statement for ${invoice.customer}\n`;
	const format = new Intl.NumberFormat("en-US",{
		  style: "currency",
		  currency: "USD",
		  minimumFractionDigits: 2
	  }).format;
	  
	for(let perf of invoice.performances) {
		const play = plays[perf.playID];
		let thisAmount = 0;

		switch(play.type) {
			case "tragedy":
				thisAmount = 40000;
				if(perf.audience > 30) {
					thisAmount += 1000 * (perf.audience - 30);
				}
				break;
			case "comedy":
				thisAmount = 30000;
				if(perf.audience > 20) {
					thisAmount += 1000 + 500 * (perf.audience - 20);
				}
				thisAmount += 300 * perf.audience;
				break;
			default:
				throw new Error(`unknown type: ${play.type}`);
		}

		// add volume credits
		volumeCredits += Math.max(perf.audience - 30, 0);
		// add extra credit for every ten comedy attendees
		if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

		// print line for this order
		result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats) \n`;
		totalAmount += thisAmount;
	}
	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earned ${volumeCredits} credits \n`;
	return result;
}
```

From the function above a good part that can be separated is the *switch* statement.

```javascript
function amountFor(perf, play){
	let thisAmount = 0;
	switch(play.type) {
		case "tragedy":
			thisAmount = 40000;
			if(perf.audience > 30) {
				thisAmount += 1000 * (perf.audience - 30);
			}
			break;
		case "comedy":
			thisAmount = 30000;
			if(perf.audience > 20) {
				thisAmount += 1000 + 500 * (perf.audience - 20);
			}
			thisAmount += 300 * perf.audience;
			break;
		default:
			throw new Error(`unknown type: ${play.type}`);
	}
	return thisAmount;
}
```

We're essentially turning that chunk of code into its own function, naming it after what it does that way we can minimize our chances of getting it wrong. This makes the refactoring proccess easier via compartmentalization. 

Our new *main* function aka *statement()* now looks like this:
```javascript
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let results = `Statement for ${invoice.customer}\n`;
	const format = new Intl.NumberFormat("en-US",{
		  style: "currency",
		  currency: "USD",
		  minimumFractionDigits: 2
	  }).format;
	  
	for(let perf of invoice.performances) {
		const play = plays[perf.playID];
		// Added refactored function below amountFor()
		let thisAmount = amountFor(perf, play);

		// add volume credits
		volumeCredits += Math.max(perf.audience - 30, 0);
		// add extra credit for every ten comedy attendees
		if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

		// print line for this order
		result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats) \n`;
		totalAmount += thisAmount;
	}
	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earned ${volumeCredits} credits \n`;
	return result;
}
```

Compile and test after each change to make sure nothing is broken.

next we refactor "**perf**" to "**aPerformance**". This allows us to know several things
- We have a more defined variable. "perf" could mean anything.
- the "a" in "aPerformance" lets us know it is an individual performance.

```javascript
function amountFor(aPerformance, play){
	let thisAmount = 0;
	switch(play.type) {
		case "tragedy":
			thisAmount = 40000;
			if(aPerformance.audience > 30) {
				thisAmount += 1000 * (aPerformance.audience - 30);
			}
			break;
		case "comedy":
			thisAmount = 30000;
			if(aPerformance.audience > 20) {
				thisAmount += 1000 + 500 * (aPerformance.audience - 20);
			}
			thisAmount += 300 * aPerformance.audience;
			break;
		default:
			throw new Error(`unknown type: ${play.type}`);
	}
	return thisAmount;
}
```

Next we can look to remove temparary variables and replace them with queries. Specifically the *play* variable Why? 
- Temporary variables create a lot of locally scoped names. This complicates extractions. In other wods, if we use a lot of temparary variables in our code we end up making it not only look messier in terms of reading but also messier when we want to extract parts of our codebase needing to be refactor into more compartmentalized functions

Below: (*Replace Temp with Query*)

```javascript
// Query function to replace temp veariable
function playForm(aPerformance) {
	return plays(aPerformance.playID);
}
```

Our top level/main function.
```javascript
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let results = `Statement for ${invoice.customer}\n`;
	const format = new Intl.NumberFormat("en-US",{
		  style: "currency",
		  currency: "USD",
		  minimumFractionDigits: 2
	  }).format;
	  
	for(let perf of invoice.performances) {
		// HERE; Refatoctored plays[perf.playID] to PlayFor() 
		const play = playFor(perf)
		// Added refactored function below amountFor()
		let thisAmount = amountFor(perf, play);

		// add volume credits
		volumeCredits += Math.max(perf.audience - 30, 0);
		// add extra credit for every ten comedy attendees
		if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

		// print line for this order
		result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats) \n`;
		totalAmount += thisAmount;
	}
	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earned ${volumeCredits} credits \n`;
	return result;
}
```

This is great but we can take this a step further.
```javascript
const play = playFor(perf)
``` 
In the line above that is an *Extract Variable*. Essentially *play* is communicating what our *Query* is but that's not really neccessary in this case. Sure we could try to have a more descriptive variable but it already conveys the meaning of our expression. *Inlining*(Inline Variable) the right-hand of the above assignment into our application would be better suited for us.

Our top level/main function.
```javascript
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let results = `Statement for ${invoice.customer}\n`;
	const format = new Intl.NumberFormat("en-US",{
		  style: "currency",
		  currency: "USD",
		  minimumFractionDigits: 2
	  }).format;
	  
	for(let perf of invoice.performances) {
		// We removed our play variable
		// Added refactored function below amountFor()
		// Inlining playFor() below, removing 'play'
		let thisAmount = amountFor(perf, playFor(per));

		// add volume credits
		volumeCredits += Math.max(perf.audience - 30, 0);
		// add extra credit for every ten comedy attendees
		// Inlining playFor() below, removing 'play'
		if("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

		// print line for this order
		result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience} seats) \n`;
		totalAmount += thisAmount;
	}
	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earned ${volumeCredits} credits \n`;
	return result;
}
```

Now we can do the same for our `amountFor()` function.
```javascript
function amountFor(aPerformance, play){
	let thisAmount = 0;
	// Inlining playFor() below, removing 'play'
	switch(playFor(aPerformance).type) {
		case "tragedy":
			thisAmount = 40000;
			if(aPerformance.audience > 30) {
				thisAmount += 1000 * (aPerformance.audience - 30);
			}
			break;
		case "comedy":
			thisAmount = 30000;
			if(aPerformance.audience > 20) {
				thisAmount += 1000 + 500 * (aPerformance.audience - 20);
			}
			thisAmount += 300 * aPerformance.audience;
			break;
		default:
			// Inlining playFor() below, removing 'play'
			throw new Error(`unknown type: ${PlayFor(aPerformance).type}`);
	}
	return thisAmount;
}
```
why?
- `playFor()` is now an independent function we can call inside our application. it makes much more sense to use it directly when possible instead of assigning it was a temp and using it. 

Now that we've inlined our query(***playFor()***)  into both our functions, we can test it. It should stil work and we can remove the play parameter. It is not being used anymore.

```javascript
// Removed playFor(perf) from amountFor()
let thisAmount = amountFor(perf);
```
and
```javascript
// Removed play parameter from amountFor()
function amountFor(aPerformance){
	// More code...
}
```

**Sidenote:** What's intersting is before the refactor, `playFor()` was executed once per loop iteration. Now it's executed 3x. This is unlikely to effect performance.

The main point is that doing this helps with *extractions*(extracting functionality into seperate functions) since there is less local scope to deal with. It can be good practice to take out local variables before doing any extractions.

Now we look to see where the `amountFor` temp variable is called in our function and replace it directly with the function it held inside our main function.

```javascript
// Below: Refactoring thisAmount to amountFor()
result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats) \n`;
		totalAmount += amountFor(perf);
```

Our main function should look like this now:
```javascript
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let results = `Statement for ${invoice.customer}\n`;
	const format = new Intl.NumberFormat("en-US",{
		  style: "currency",
		  currency: "USD",
		  minimumFractionDigits: 2
	  }).format;
	  
	for(let perf of invoice.performances) {
		// add volume credits
		volumeCredits += Math.max(perf.audience - 30, 0);
		// add extra credit for every ten comedy attendees
		// Inlining playFor() below, removing 'play'
		if("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

		// print line for this order
		result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats) \n`;
		totalAmount += amountFor(perf);
	}
	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earned ${volumeCredits} credits \n`;
	return result;
}
```

Since we removed the play variable it's much easier for us to extract volume credits into it's own function.

```javascript
function volumeCreditsFor(perf) {
	let volumeCredits = 0;
	// add volume credits
	volumeCredits += Math.max(perf.audience - 30, 0);
	if("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
	return volumeCredits;
}
```


Now we can use this function in our main/top-level function;

```javascript
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let results = `Statement for ${invoice.customer}\n`;
	const format = new Intl.NumberFormat("en-US",{
		  style: "currency",
		  currency: "USD",
		  minimumFractionDigits: 2
	  }).format;
	  
	for(let perf of invoice.performances) {
		// Refactored line below to implement volumeCreditsFor()
		volumeCredits += volumeCreditsFor(perf);

		// print line for this order
		result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats) \n`;
		totalAmount += amountFor(perf);
	}
	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earned ${volumeCredits} credits \n`;
	return result;
}
```

Now let's rename the variables inside `volumeCreditsFor()` to make it more readable.
```javascript
function volumeCreditsFor(aPerformance) {
	let result = 0;
	// add volume credits
	result += Math.max(aPerformance.audience - 30, 0);
	if("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
	return result;
```
why?
- The renaming here makes it much clearer what the function is doing and for what.
- We're calculating the volume credits for a performance. The function name and parameter reads smoothly.

We still can remove a temp variable. *format* can be replaced from assigning a functioni to a temp variable to replacing it with a declared function.
```javascript
function format(aNumber) {
	return new Intl.NumberFormat("en-US",{
		  style: "currency",
		  currency: "USD",
		  minimumFractionDigits: 2
	  }).format(aNumber);
}
```

 Why?
- This makes our code more declarative
- It makes sense a function is formating a number and not a function assigned to temp variable formatting a number.

We can even take it a step further and rename the function to **usd()**.

```javascript
function usd(aNumber) {
	return new Intl.NumberFormat("en-US",{
		  style: "currency",
		  currency: "USD",
		  minimumFractionDigits: 2
	  }).format(aNumber/100);
}
```

Now let us take a look at our top level functioin now and refactoor **format()** to **usd()** and remove `/100` since we calculate it inside our **usd()** function 
```javascript
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let results = `Statement for ${invoice.customer}\n`;
	for(let perf of invoice.performances) {
		// Refactored line below to implement volumeCreditsFor()
		volumeCredits += volumeCreditsFor(perf);

		// print line for this order
		result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats) \n`;
		totalAmount += amountFor(perf);
	}
	result += `Amount owed is ${usd(totalAmount)}\n`;
	result += `You earned ${volumeCredits} credits \n`;
	return result;
}
```

Looking back into that function let's look at trying to remove the `volumeCredits` variable

first step is to use the *Split Loop*:
- We typically see people write loops that do two or more different things at once in one iterration
- This can be problematic because if you need to  modify it you have to understand both or all things going on, making refactoring more difficult. There are more moving parts that have side-effects instead of just one.
- If we split the things we're doing into separate loops it makes it easier to modify and we can even refactor it's own function into using the *extract function* methodology.

Our for loop above is doing multiiple things and we need to extract them into separate loops and move the `volumeCredits` variable declaration above the relevant loop.
```javascript
function statement(invoice, plays) {
	let totalAmount = 0;	
	let results = `Statement for ${invoice.customer}\n`;
	
	for(let perf of invoice.performances) {
		// print line for this order
		result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats) \n`;
		totalAmount += amountFor(perf);
	}
	
	let volumeCredits = 0;
	for(let perf of invoice.performances) {
		// Refactored line below to implement volumeCreditsFor()
		volumeCredits += volumeCreditsFor(perf);
	}
	result += `Amount owed is ${usd(totalAmount)}\n`;
	result += `You earned ${volumeCredits} credits \n`;
	return result;
}
```

Now we can use the **ExtractFunction** and **Replace Temp with Query** methodologies for `volumeCredits`.

```javascript
function totalVolumeCredits() {
	let volumeCredits = 0;
	for(let perf of invoice.performances) {
		// Refactored line below to implement volumeCreditsFor()
		volumeCredits += volumeCreditsFor(perf);
	}
	return volumeCredits;
}
```

Let's implement this in our top-level function with the **Inline Variable** methodology
```javascript
function statement(invoice, plays) {
	let totalAmount = 0;	
	let results = `Statement for ${invoice.customer}\n`;
	
	for(let perf of invoice.performances) {
		// print line for this order
		result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats) \n`;
		totalAmount += amountFor(perf);
	}
	
	result += `Amount owed is ${usd(totalAmount)}\n`;
	result += `You earned ${totalVolumeCredits()} credits \n`;
	return result;
}
```

