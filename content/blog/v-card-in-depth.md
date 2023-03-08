---
title: "[Draft] V-Card In Depth"
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

line 92
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

 Inside the return statement on [line 122](https://github.com/vuetifyjs/vuetify/blob/f00e0017f0779faba82e739178a92078fd986967/packages/vuetify/src/components/VCard/VCard.tsx#L122) we see `<Tag>`. What exactly is this "Tag" component? The <Tag> component is essentially an agnostic component that inherits the name of the defined component's name property.
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

This statement is determining if there's an image and if there is the `<V-Img />` tag is rendered inside the div with `v-card__image_styling`.


<!-- Even the type for VCard is exported for use as well in line 197.

```ts
export type VCard = InstanceType<typeof VCard>
``` -->

to be continued.........
