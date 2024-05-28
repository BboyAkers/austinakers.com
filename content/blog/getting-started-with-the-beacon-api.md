---
title: "Getting Started With The Beacon API"
subtitle: "Web API Series:"
description: "A tutorial of the Beacon API for web"
tags: 
 - 'JavaScript'
 - 'Web API'
 - 'Tutorial'
date: 06252020
id: 2
---

## Getting Started With The Beacon API

The [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) is a web API avalible for developers to implement into their application. View full list of web APIs [here](https://developer.mozilla.org/en-US/docs/Web/AP). The `Beacon API` is a Web API useful for:

- Analytics
- Diagnostics 
 
 ## Why  not `fetch` or `XMLHttpRequest`?
As stated in the MDN Docs, the unfortunate truth is [User Agents](https://developer.chrome.com/multidevice/user-agent) will typically ignore `XMLHttpRequest` made with an unload handler. Which is the handler we want to use before an individual leaves/navigates away from the page.

 ## Overview?
 In this article we will building a very basic analytics tracking library. The objective is to:
 1. Create a backend to capture the data and serve our index.html page
 2. Track what element the end user clicked on and record it with a time stamp.
 3. Store the data that is being generated on each click to a global object to store.
 4. Before refreshing, or leaving the page send the data stored in the global object to the backend using the `sendBeacon()` method provided by the Beacon API.


## Setup

1. First, make sure you have [Node.js](https://nodejs.org/en/) installed into your system. 
2. Once Node is installed on your computer clone the project files:
```bash
git clone https://github.com/BboyAkers/WebAPIs.git
``` 
or
[Download Repo](https://github.com/BboyAkers/WebAPIs)

3. Navigate to the start folder. **WebAPIs**->**beaconAPI**->**start**
4. Open the terminal and install the dependencies `npm install`
We've installed two dependencies. `body-parser` and `express`. 
	- We will be using `body-parse` to parse the incoming POST request from our frontend. 
	- `express` is the backend web framework we will be using to setup our server.

## Setting Up Our Server
Objective:

- Setup a basic express server
- Serve our `index.html` inside of our `public/` folder to the frontend

Navigate to the **server.js** file in the base directory of the `start/` folder.

First we want to setup our basic express server

*server.js*

```javascript
const  express = require("express");

const  app  =  express();

app.listen(8081, () =>  console.log("Listening on 8081"))
```

In your terminal run:

```bash
node server.js
```

We've now successfully setup our basic express server!

When we navigate to `localhost:8081` we should see the message: `Cannot GET /`.

What do we have to do to eliminate this error?

1. We need to find something for our express app to do on `/` our base directory.
	- For example, serving our index.html to the frontend.

How do we serve our index.html from the servers side?
 
 We are going to use [express static](https://expressjs.com/en/starter/static-files.html) to serve the index.html, which is a static file. Our index.html file is located in the `public/` folder.  When using `express static` we need to establish what folder we want to use to serve our static content. Since all of our static content including our index.html is inside our public folder, we are going to specify the "public" folder.
 
 ```javascript
app.use(express.static('public'))
```

Our *server.js* file should look quite similar to this:
```javascript
const express = require("express");

const app = express();

//serving the static content inside our public folder
app.use(express.static('public'))

app.listen(8081, () => console.log("Listening on 8081"))
```

Navigate to `localhost:8081/index.html` in your browser.

You should now see our app.

Congratulations! You've successfully setup the server!

## Setting Up Our Analytics.js File
Objective:
- Tie the `analytics` function on winow.onload window.unload.
- Create an event that: 
	- detects what element a user clicks on when visiting the page
	- Create a timestamp to record what time the user clicked that element
- Store the object that holds the clicked element and the timestamp into a global object.
- Before leaving the page send all the stored data to the backend using the `Beacon API`

Navigate to  our **analytics.js** file in `public/`->`analytics.js`.

Inside our **analytics.js** file, the first thing we need to do is create an event handler that:
- captures the element we clicked on inside our document
- the time we clicked on it
- then push it to a global array that holds the history throughout the entire end users visit to the web page.

Let's do that!

First were capturing the element we clicked on and the time we clicked on it inside our document.
```javascript
document.addEventListener('click', (event) => {
  {
    clickedElement: event.target.outerHTML,
    timestamp: new Date()
  };
})
```

Next we need to create a `dataHistory` variable to store all data we capture from each click. Then push the captured data every time the user clicks inside the document.
```javascript
let dataHistory = [];
document.addEventListener('click', (event) => {
  dataHistory.push({
    clickedElement: event.target.outerHTML,
    timestamp: new Date()
  });
})
```

Now we need create our `analytics` function. This function will;
- execute on window.load and window.unload
- Check to see if our browser has the `navigator.sendBeacon()` method
- If it doesn't it will simply return
- If it does we will define the url we are sending our analytics data to the backend
- Create a variable that will create a new `Blob` object that will hold our stringified JSON.
-  Send the data to the `/analytics` endpoint using `navigator.sendBeacon()`

What our `analytics` methods should look like:
```javascript
window.onload = window.onunload = function analytics(event) {
	if (!navigator.sendBeacon) return;

	// Url we are sending the data to
	let url = "http://localhost:8081/analytics";

	//Create the data to send
	const dataHistoryBlob = new Blob([JSON.stringify(dataHistory)], { type: 'application/json' });

	navigator.sendBeacon(url, dataHistoryBlob);
};
```

We've now completed our analytics.js file!
This is what our file should look like!
```javascript
let dataHistory = [];

document.addEventListener('click', (event) => {
  dataHistory.push({
    clickedElement: event.target.outerHTML,
    timestamp: new Date()
  });
})

window.onload = window.onunload = function analytics(event) {
  if (!navigator.sendBeacon) return;

  // Url we are sending the data to
  let url = "http://localhost:8081/analytics";

  //Create the data to send
  const dataHistoryBlob = new Blob([JSON.stringify(dataHistory)], { type: 'application/json' });

  navigator.sendBeacon(url, dataHistoryBlob);
};
```

There's one last thing we haven't done. In our url variable we send the data to a backend endpoint we haven't defined yet, `/analytics`. Let's go to our server.js file to create that endpoint and make sure it can parse the data it's receiving.


## Creating The "/analytics" Endpoint

In our server.js file let's create the `/analytics` endpoint.

```javascript
const express = require("express");

const app = express();

app.post("/analytics", (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
});
app.listen(8081, () => console.log("Listening on 8081"));
```
If we log the data won't be able to see anything due to express. All of our data is being passed through the body of our request. Unfortunately express itself can't parse data from the body so we have to use the `body-parser` package from npm. Fortunately when we did an npm install setting up the project we already added the package as a dependency. Feel free to check your **package.json** for reference.

Now we need to add body parser to our server and use it to parse the json data being sent to the `/analytics` endpoint. Our file should look like this.

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//serving the static content inside our public folder
app.use(express.static('public'));

app.post("/analytics", (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
});
app.listen(8081, () => console.log("Listening on 8081"))
```
If we save and restart our server we can click on several elements, refresh the page, exit the page, or navigate to a different website, we should see the data being sent and logged to our server. We have now successfully build a very simple use case for the beacon API!


Side note: To check to see what data is being sent to the backend on the browsers side. You can preserve the logs in the network tab.
![Picture of preserve log in the Network Tab of Chrome Developer Tools](https://dev-to-uploads.s3.amazonaws.com/i/ljxj0xfw3dtk4dicp9cz.PNG)

Challenges:
Expand upon the project by:
- Separating the business logic(our click event) into our **index.js** file and have it import and use our **analytics.js** file.
- Expand upon the current tracking capabilities by adding unique sessions.
- Clean up the element retrieval data. We currently use `.outerHTML` see if there are better ways to find the elements we clicked on. :)
- Create a pop up to give users the option to accept or decline tracking.


Happy coding!
