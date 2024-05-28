---
title: "What is a CLI"
subtitle: "Vuetify Beginner's Guide Series:"
description: "Introduction to a Command Line Interface"
tags: 
  - 'Vue3'
  - 'Vuetify'
  - 'TypeScript'
date: 05112020
id: 4
---

<a href="https://dev.to/bboyakers/what-is-a-cli-53a6" target="_blank" class="text-blue-600 hover:underline visited:text-purple-600">Dev.to Original Article</a>

## What is a CLI?

<img src="https://dev-to-uploads.s3.amazonaws.com/i/rk2z3duexrmf05utoydr.PNG" alt="Image of blank Terminal" width="400px"/>
A CLI or **Command Line Interface** is an in interface that accepts text input to execute operating system functions. As a software developer we use CLI's all the time. What exactly does a CLI look like? Open your terminal on Mac or command prompt (powershell works too) if you are on Windows. As a developer we use the terminal and/or command prompt to:
- install packages
- run scripts
- manage project files 
- and more. 

Something you might be familiar with in the web development world is this:
``` bash
$ npm install <package name>
```
ex. `npm install vue`

![Gif of npm install vue](https://dev-to-uploads.s3.amazonaws.com/i/pro0g6xdis22hcjtonn7.gif)
You can even navigate to and around the files on your system, or better yet what we call the **file system**.

In that example in the CLI, we are using the node package manager, `npm`, to install a package of our choice!

## Basic Commands
There are some basic commands you can use that come in handy when using the **file system**:

### Basic Windows Commands
- `dir` - Lists what is in the current directory (folder).
- `cd <pathName>` - Changes the directory (folder) in the file system
- `cd ..` - Moves you up one level
- `mkdir or md <folderName>` - Makes a new directory (folder).

### Basic Linux Commands
- `ls` - Lists what is in the current directory (folder).
- `cd <pathName>` - Changes the directory (folder) in the file system
- `cd ..` - Moves you up one level
- `mkdir or md <folderName>` - Makes a new directory (folder).

*Suggestion to get comfortable with the CLI*: 
Play with the commands and see what you can do!

### Basic Challenges
1.	Open your terminal/command prompt and navigate to  your Documents directory and then Downloads directory
2.	Inside your Documents directory  create a folder

**Bonus**: Navigate inside the folder you created and figure out how to create a file!

## Vue CLI
Before we get go further into getting the project started we need to take a look into the Vue CLI. Vue CLI is the standard command line tooling for developing vue.js projects. To learn how to install Vue CLI [visit here](https://cli.vuejs.org/). If you're wanting to know more information about how to use the Vue CLI you can visit the [documentation](https://cli.vuejs.org/guide/).

## Creating the Project
The first thing we need to do is create is a Vue project. Hopefully you've familiarized yourself with the basic commands. Navigate to the directory you'd like to create the project in and type:

```bash
$ vue create my-app
// navigate to new project directory
$ cd my-app
```
![Gif of vue create and cd](https://dev-to-uploads.s3.amazonaws.com/i/l8qoqv927550in0j1l60.gif)

## Adding Vuetify
Now that we've created our project and navigated into the directory, next we have to add the Vuetify UI.

Next we have to add the Vuetify CLI package by typing in our CLI:

``` bash
$ vue add vuetify
```
![Gif of add vuetif](https://dev-to-uploads.s3.amazonaws.com/i/2fw1znjv09qyznpdpqm5.gif)

## Using Vue UI
We can also use Vue UI to install Vuetify CLI:
```bash
// ensure Vue CLI is >= 3.0
$ vue --version

// Then start the UI
$ vue ui
```
1. Click **Plugins**
2. Type in **vuetify** in the search bar
3. You should see **vue-cli-plugin-vuetify**
4. Click and install it

---

This blog post is a part of [Vuetify Beginner's Guide Series](https://vuetifyjs.com/en/introduction/guide/). 🐣 Each blog has been collaboratively worked on by the Vuetify Core Team. Interested in contributing a topic? ➡ Reach out to [Johanna](https://dev.to/johannarlee) on Dev.to or in the [Vuetify Community Discord](https://discord.com/invite/s93b7Fv). 
