---
title: "Let's build a Github Profile Search Web App"
subtitle: "Web Project Series:"
description: "A tutorial for using the Github API"
tags:
 - 'Web Project'
 - 'JavaScript'
 - 'Github API'
 - 'Tutorial'
date: 07032019
id: 1
---


![](https://thepracticaldev.s3.amazonaws.com/i/40xdw6ag75ksnjwjlkvs.PNG)

As my first blog post I thought i'd be great to be able to try and start posting a series of weekly projects for developers looking to build small fun web apps to add to their portfolio.

Today I thought i'd be great to start it off with building something fairly interesting. Bulding a Github Profile Search Web App using the Github API.

Let's Begin!!

1.) First create a folder structure like this.
css/styles.css
js/scripts.js
index.html
![](https://thepracticaldev.s3.amazonaws.com/i/g2z7ko1gzyern6js7bmm.PNG)

If you really want to learn something fun, try using the terminal!

touch index.html
mkdir css && mkdir js
touch css/styles.css
touch js/scripts.js

'touch' is the easiest way to create new, empty files
'mkdir' is the easiest way to create new, empty folders


2.) Setup our HTML
![](https://thepracticaldev.s3.amazonaws.com/i/82olac4qdth6vq57pvqy.PNG)


3.)Next we need to setup our app skeleton
![](https://thepracticaldev.s3.amazonaws.com/i/ijr083mo51ps8amniuia.PNG)

We've create a two main div's. The first div is for our input field and search button. The second div is where we will be displaying the returned information from the call we make to the github api.

We have the classes there as well because we will be using them to style the application and use the elements in JavaScript as you'll see later on.

Building out the JavaScript
In this section we will be building out the functionality of the application.


4.) Scaffold

Before you build out anything it's always great to get an idea of what you should be writing before you sink time into coding. Ask yourself, "what are we trying to accomplish?"

Tasks:
-Grab search element
-Grab div that will display the data
-When we click search we want:
    -Grab data from the text input field
    -Use that data to grab user info from the Github API
    -Display the response data from the Github API 

It should look a little something like this!
![](https://thepracticaldev.s3.amazonaws.com/i/ptqu4oaxkr10whp4j7un.PNG)


5.) Grab our elements and create search call
![](https://thepracticaldev.s3.amazonaws.com/i/oqjlh3hb83f3xiyavyek.PNG)

If you're wondering about querySelector(); 
Here's a link! 
https://www.w3schools.com/jsref/met_document_queryselector.asp
https://www.youtube.com/watch?v=JlgLDfINXvY

If you're wanting to understand addEventListener();
https://www.w3schools.com/jsref/met_document_addeventlistener.asp
https://www.youtube.com/watch?v=F3odgpghXzY


6.) Grab our data from our input field and setup our call to the Github API
![](https://thepracticaldev.s3.amazonaws.com/i/qdih4ywhfi8r3qkf21sg.PNG)

Okay now whoa. There's a lot going on here you're probably wondering and to be honest. You are absolutely correct so let's break it down :).

When we click we need to grab the most recent data from our input field. If we declare in the global scope of our file it will 
![](https://thepracticaldev.s3.amazonaws.com/i/4l76ck626y0gpm7ye0p1.PNG)

Secondly let's take a look at this GET request.
![](https://thepracticaldev.s3.amazonaws.com/i/nww042t08nmcmjjuqin9.PNG)

What is XMLHttpRequest?
XMLHttpRequest is a built-in browser object that allows to make HTTP requests in JavaScript.
More info here.
https://javascript.info/xmlhttprequest
https://www.youtube.com/watch?v=rjmtYkRK1nM

I decided to use this instead of fetch simply due to browser compatibility. I thought it'd be great to support old browsers and not have to deal with polyfills. Take a look here.
 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Browser_compatibility

If you'd like to use fetch instead, feel free to!



7.)Next we have to check and use our response data.

You can check the contents of the response by doing a console.log(response) where we are suppose to display the data.

Now we populate our data in our HTML
![](https://thepracticaldev.s3.amazonaws.com/i/163z38vnolakukue3dst.PNG)

8.) Now we add styling!
![](https://thepracticaldev.s3.amazonaws.com/i/bqu08f3zfarubkfgzrm2.PNG)
![](https://thepracticaldev.s3.amazonaws.com/i/yhavlcftikqntkbut9m1.PNG)

We're done!!!!

Hopefully you made sure you're weren't getting any errors along the way and you've attached your scripts and style sheet as well! 


As nice as this app seems there is much more you can do to improve this application. 

Here's a list:
-**Look into alternatives for using innerHTML and understand why using it isn't the best practice
-Add CSS animations for the card
-Add error handling to our call
-Use CSS Grids or Flexbox for the layout
-Convert the CSS into Sass

That'll keep you busy for a bit. Have fun and enjoy your week!
