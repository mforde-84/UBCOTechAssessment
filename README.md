# UBCOTranslate

Greetings Earthling! Frustrated at being unable to communicate with the inhabitants of Planet UBCO? `UBCOTranslate` has you covered. Type any English phrase you want, and faster than you can say "Take me to your leader", you will be able to express everything you've ever wanted to say in the local vernacular. Amazing! Or should I say, UBCO AAnaabiiph!1

![UBCOTranslate in action](img/UBCOTranslate.gif)

Contents
========

 * [Installation](#installation)
 * [High-level Overview](#high-level-overview)
 * [Solution Breakdown](#solution-breakdown)
 * [How I solved the problem](#how-i-solved-the-problem)
 * [In the real world]("in-the-real-world)

### Installation
---

The easiest way to get the application up and running on your machine:
- Clone this repository.
- Use Visual Studio to open the [UBCOTranslate.sln file](./UBCOTranslate.sln) in the root of the folder.
- Set UBCO.Presentation.API as the startup project if not already.
- Start the application.
- Use Visual Studio Code to open the [ubco.ui folder](/ubco.ui).
- Open a new terminal at the root of the application (Terminal > New Terminal or `ctrl` + `shift` + `~`).
- Type `npm install` and hit enter to install the few necessary npm packages required.
- Once the install has finished, type `npm start` and hit enter.
- The application should now be running in a browser on `localhost:3000`.

### High-level Overview
---

This application is written using a .NET 5.0 back-end which is the "brains" of the operation, and a very basic React UI to enable user interaction.
I have arranged the solution using my interpretation of [clean/onion architecture](https://docs.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#clean-architecture) to ensure a loosely-coupled separation of concerns, improve testability, and allow greater flexibility and scalability in the future if the application needs to grow. (Hey, you never know...) 

### Solution Breakdown
---

Within the solution are 5 projects:
+ UBCO.Core - Contains the DTO which is received by the Controller from the front-end, and the ITranslationService interface definition.
+ UBCO.Services - Contains the logic of the application where the [translation tasks are performed](/UBCO.Services/Translation/TranslationService.cs).
+ UBCO.Services.Tests - Contains unit tests to prove TranslationService does what it should.
+ UBCO.Presentation.API - Contains the Web API and the related application configuration files.   
+ ubco.ui - Contains the React front-end.

### How I solved the problem
---

As the translation rules differ depending on each individual letter of the original phrase the solution I've gone with initially converts the string to be translated into an array of characters, and then loops over the array to apply the relevant translation rules to each character individually. For performance reasons, a [StringBuilder object](https://docs.microsoft.com/en-us/dotnet/standard/base-types/stringbuilder) is used as a container for each translated character to be inserted into, before finally converting into a string and returning to the API.

I did investigate methods of trying to translate the string in place using regex, or looping over the character array and matching/replacing characters using regex but the performance was actually worse than the solution I implemented, and I also believe my solution is more readable and easier to understand.

### In the real world
---

The following is a list of things I can think of in no particular order that I would do in a production environment or if I had a little more time:
+ Implement exception handling.
+ Implement logging.
+ Tidy React front-end - there are a few unused files in there, and while the UI is reasonably responsive it looks strange on smaller screens.
+ Investigate how extendible the translation logic is if we wanted to add more languages, or convert from the Alien language (I've referred to it as 'Ublish') back into English.
+ Host it - I attempted to host this on Heroku, but had difficulties. One of the recommended ways to do so is buy adding a dockerfile and setting up a CI/CD pipeline using github actions to deploy to Heroku. I'm definitely not a docker expert so I suspect someone more knowledgeable could probably get this working in a matter of minutes, and my attempt to learn Docker late on a Sunday night proved unsuccessful 😞.
+ Currently the translation service doesn't handle multiline strings properly.
