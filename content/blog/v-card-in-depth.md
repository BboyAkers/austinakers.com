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

1. How is it fundementally built?
2. How does it get exported for use?
3. How am I able to use the props/attributes availiable within this component?
4. How is it possible to declare this component in 3 different ways?

### How Is It Fundementally Built?