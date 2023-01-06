---
title: "V-Card In Depth"
subtitle: "Framework Breakdown:"
description: "Diving into the innards of Vuetify"
tags: 
 - 'Beginners'
 - 'Vuetify'
 - 'Vue'
 - 'JavaScript'
date: 12302022
---

## Introduction

As someone who loves Vuetify and formally an active contributor. I wanted to dive back in and see all the amazing changes the made in this newest version over the past year. My first thought was to dive into one of my long time favorite and most used component **[V-Card](https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/components/VCard/VCard.tsx)**.

## Overview

Diving into the Vuetify Component Library can be overwhelming. I decided to break down the V-Card component into a 4 areas I wanted to explore.

1. How is it created?
2. How does it get exported for use?
3. How am I able to use the props/attributes availiable within this component?
4. How is it possible to declare this component in 3 different ways?

### How Is It Created?

Diving into the codebase, I found the V-Card component in: `vuetify>packages>vuetify>src>components>VCard`
![Vuetify V-Card Directory Image](https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/66f9c179-62d7-4ab0-c64e-5a46fb0d8500/public)

The first thing I noticed was the `VCard.tsx` file. This is the main file orchestrating the composition and use of other components within the same directory. Inside the VCard.tsx file we see exactly that.

```ts
// Components
import { VCardActions } from './VCardActions'
import { VCardItem } from './VCardItem'
import { VCardText } from './VCardText'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VImg } from '@/components/VImg'

```

We see the various components imported and used throughout this file to create the V-Card component.

If we jump to line 35-36 we'll see exactly where VCard is defined as a component and exported for use.

```ts
export const VCard = defineComponent({
  name: 'VCard',
  // more code....
})
```

Jumping to line 92 we are able to see exactly where the VCard componnet is initiating rendering and 103 is where we start builing the components template.

line 92
```ts
useRender(() => {
// more code.....
})
```

useRender():
- Gets the current instance of the Node 
	- Checks if it's called inside a "setup" function
	- If it is, it returns the view model
- It takes the valid view model and uses 'vue 3' `.render`  function to return the valid vue model as a Virtual DOM tree to be added to our applications VDOM Tree. 

line 103
```ts
return (
// building our component....
)
```

### Parts of the Component.

The component can be broken down into several parts:
 - Shell: Where we see the `<Tag></Tag>` component encapsulating the innards of V-Card
 - Layout: The parts of the components that render conditially based upon the variables with the prefix "has" and slots (ex. hasImage, hasText, slots.action, slots.image, ect.)
 - Props/Options: The attributes/props section is where the default options are declared to interact/modify the V-Card Component. ex.(onClick, title, subtitle, actions, ect.)
 - Classes: Where the component inherits both V-Card specific CSS classes and globally configured classes.

 #### Shell

 Inside the return statement on line 104 we see `<Tag>`. What exactly is this "Tag" component? The <Tag> component is essentially an agnostic component that inherits the name of the defined component's name property.
 (Fact check. Looks likes it's essentially a div by default.)


<!-- Even the type for VCard is exported for use as well in line 197.

```ts
export type VCard = InstanceType<typeof VCard>
``` -->

