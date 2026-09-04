2 Modularity Principles

In broad terms, something is complex when it becomes hard to grasp or fully understand

## 2.1.1 Single Responsibility Principle

In this code snippet below the "emailing" functionality if coupled with four pieces of functionality that can be split:

- Templating
- Sanitization
- Email API client instantiation
- Email sending

**Coupled Email Component**

```js
import insane from 'insane' 
import mailApi from 'mail-api'   
import { mailApiSecret } from './secrets'   
function sanitize (template, ...expressions) {
	return template.reduce((result, part, i) => {
		result + insane(expressions[i - 1]) + part)
	}
}
function sanitize (template,   
return template. result, part, i) =>   
result +   
1]) + part   
export default function send (options,   
done) {   
const {   
to,   
subject,   
{ title, body,   
model:   
options   
const html   
sanitize   
<hl>${ title }</hl>   
<div>${ body }</div>   
tags }   
tags   
map(tag   
• join(   
${ <span>${ tag }</span> } x )   
mailApiSecret } )   
const client   
client. send({   
from:   
hello@mj avascript . com   
to,   
subject,   
html   
} , done)
```

We can first split this into an email component that's concerned only with configuring the API client. It also adheres to the interface of to, subject, and html. This component is solely used for sending email.

Component for solely sending the email:
![[Pasted image 20231006172707.png]]

Next we create a component that's only focus is to create a piece of sanitized HTML by using a template and the user-provided model:

Component for sanitizing HTML with data provided by the user
```js
import insane from I insanel   
.. expressions) {   
function sanitize(template,   
return template. result, part, i) =>   
result +   
1]) + part   
export default function compile(model) {   
const { title, body, tags   
model   
const html   
sanitize   
<hl>${ title }</hl>   
<div>${ body   
tags   
map(tag   
• join(   
return html   
${ <span>${ tag }</span> } x )
```

## 2.1.2 API First

A module is only as good as its public interface. A poor implementation may hide behind an excellent interface.

Flawed APIs are much harder to repair, you'll either have to:
- Move your API to a newer version (ex. /v2)
or
- Implement breaking changes into the current API to make it more expandable

Make sure you test your component/interface against an API first to get an idea on what the interface should be shaped like.

Following an API-first methodology is crucial in understanding how the API might be used. By placing our foremost focus on the interface, we are purposely avoiding the implementation until there’s a clear idea of what interface the component should have

Note how the focus is not only on what the example at hand addresses directly but also on what it doesn’t address: room for improvement, corner cases, how the API might change going forward, and whether the existing API can accommodate more uses without breaking backward compatibility.
