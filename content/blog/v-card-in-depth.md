---
title: "V-Card In Depth"
subtitle: "Framework Breakdown:"
description: "Diving into the innards of Vuetify"
tags: 
 - 'Beginners'
 - 'Vuetify'
 - 'Vue'
 - 'JavaScript'
date: 03082023=
---

## Introduction

As someone who loves Vuetify and formally a contributor. I wanted to dive back in and see all the amazing changes the made in this newest version over the past years. My first thought was to dive into one of my long time favorite and most used component **[V-Card](https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/components/VCard/VCard.tsx)**.

## Overview

Diving into the Vuetify Component Library can be overwhelming. I decided to break down the V-Card component into a 4 areas I wanted to explore.

1. How does it get exported for use?
2. How is the component created?
3. How am I able to use the props/attributes availiable in this component?
4. How is it possible to declare this component in 3 different ways?


## How does it get exported for use?

When we install Vuetify into our application we are able to import the V-Card like this:

```ts
import { VCard } from 'vueitfy';
```

A line many of us are familiar with. How does this work and where do all of the exports for other components? The flow of exporting the card component is as follows:

<img src="https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/ae7eebc1-8f0c-4a60-333e-7e90d8555d00/public" />

Once the component is exported to the `index.ts` of the `/components` folder. Vuetify runs a build script (`yarn build`) to package it. This is where the magic happens. The build script uses [rollup](https://rollupjs.org/guide/en/) to bundle the component and other parts of vuetify into a single folder for distribution. This `dist` folder is what we use/refrence when we import Vuetify into our application.

<img src="https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/a10baf86-0213-40a7-41f8-bb6f643b2f00/public" />

(Results of `yarn build`)

This is how Vuetify we go from a component being defined in the Vuetify codebase to being packages and exposed to us for use in our application.

## How Is It Created?

Diving into the codebase, I found the V-Card component in: `vuetify>src>components>VCard`
![Vuetify V-Card Directory Image](https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/66f9c179-62d7-4ab0-c64e-5a46fb0d8500/public)

The first thing I noticed was the `VCard.tsx` file. This is the main file orchestrating the composition and use of other components within the same directory. Inside the `VCard.tsx` file we see the various components being imported and used throughout the file.

```ts
// Components
import { VCardActions } from './VCardActions'
import { VCardItem } from './VCardItem'
import { VCardText } from './VCardText'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VImg } from '@/components/VImg'

```

If we jump to line 50 & 51 we'll see exactly where `VCard` is defined as a component and exported for use.

```ts
export const VCard = genericComponent<VCardSlots>()({
  name: 'VCard',
  // more code....
})
```

Why use this instad of the standard [defineComponent](https://vuejs.org/api/general.html#definecomponent) as typically used in Vue applicaitons?
example below:

```ts
export const VCard = defineComponent({
  name: 'VCard',
  // more code....
})
```

TLDR: `genericComponent` essentially for the use of generic props and slots when defining components.
[view here](https://github.com/vuetifyjs/vuetify/blob/f00e0017f0779faba82e739178a92078fd986967/packages/vuetify/src/util/defineComponent.tsx#L180) for more details.

Jumping to [line 110](https://github.com/vuetifyjs/vuetify/blob/f00e0017f0779faba82e739178a92078fd986967/packages/vuetify/src/components/VCard/VCard.tsx#L110) we are able to see exactly where the VCard componnet is initiating rendering and [line 121](https://github.com/vuetifyjs/vuetify/blob/f00e0017f0779faba82e739178a92078fd986967/packages/vuetify/src/components/VCard/VCard.tsx#L121) is where we start builing the components template.

line 110
```ts
useRender(() => {
// more code.....
})
```

`useRender` is a custom rendering function that essentially does the following:
- Gets the current instance of the Node 
	- Checks if it's called inside a "setup" function
	- If it is, it returns the view model
- It takes the valid view model and uses 'vue 3' `.render`  function to return the valid vue model as a Virtual DOM tree to be added to our applications VDOM Tree.

line 121
```ts
return (
// building our component....
)
```

## Parts of the Component.

The component can be broken down into several parts:
 - Shell: Where we see the `<Tag></Tag>` component encapsulating the innards of V-Card
 - Layout: The parts of the components that render conditially based upon the variables with the prefix "has" and slots (ex. hasImage, hasText, slots.action, slots.image, ect.)
 - Props/Options: The attributes/props section is where the default options are declared to interact/modify the V-Card Component. ex.(onClick, title, subtitle, actions, ect.)
 - Classes: Where the component inherits both V-Card specific CSS classes and globally configured classes.

 #### Shell

 Inside the return statement on [line 122](https://github.com/vuetifyjs/vuetify/blob/f00e0017f0779faba82e739178a92078fd986967/packages/vuetify/src/components/VCard/VCard.tsx#L122) we see `<Tag>`. What exactly is this "Tag" component? The `<Tag>` component is essentially an agnostic component that inherits the name of the defined component's name property.
 (Fact check. Looks likes it's a div by default.)
### Layout

Inside the shell the layout is defined. There are a multitude of ternary statements determining what to render. An example of this is on [line 151](https://github.com/vuetifyjs/vuetify/blob/f00e0017f0779faba82e739178a92078fd986967/packages/vuetify/src/components/VCard/VCard.tsx#L1513):

```ts
{ hasImage && (
    <VDefaultsProvider
      key="image"
      defaults={{
        VImg: {
          cover: true,
          src: props.image,
        },
      }}
    >
      <div class="v-card__image">
        { slots.image?.() ?? <VImg /> }
      </div>
    </VDefaultsProvider>
  ) 
}
```

This statement is determining if there's an image if there is we render it! tag is rendered inside the div with `v-card__image` styling.


<!-- Even the type for VCard is exported for use as well in line 197.

```ts
export type VCard = InstanceType<typeof VCard>
``` -->

to be continued.........
