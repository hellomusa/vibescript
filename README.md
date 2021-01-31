# VibeScript

## What is < VibeScript />?
Introducing VibeScript, your pair program 'n' vibe matchmaker.  Vibescript is a single-page, easy to use web application that will automatically match you with other coders who are also desperately searching for human company in these isolating times. 

## Inspiration
As programmers, we know how challenging it can be to work on your task when you're road-blocked. Sometimes we need someone else to bounce ideas off of, discuss strategies and workflow logic, or just someone to vibe with while you both work. It's not always easy to find someone to pair program with, especially during COVID when we are stuck at home. We know everyone has gone through this situation before, whether they are experienced coders or someone who is just starting to pick up some programming skills. No matter your experience or skill level, we've come up with a solution.

## How does it work?
Users are prompted to login using discord and fill out a form to be used by a match making algorithm to pair the user with another programmer! Upon being paired, you will both be added to our Vibescript server and get your own voice and text channel where you can vibe out! 

## How we built it
VibeScript was built on a MERN Stack, also known as a MongoDB, ExpressJS, ReactJS, NodeJS stack, alongside the Discord API and a Python based Discord bot. MongoDB is the database used to store user information, such as login, form data, etc, and would be used by the rest of the application in order to efficiently process users engaging with the application. The REST API backend would be deployed using Mongoose/ExpressJS/NodeJS, and would be used to serve and modify the database. The discord API and a Python based Discord bot we designed is used to ensure that users are assigned to proper roles and sent to the correct channel in order to VIBE with their match!

## Launch the application locally
In order to launch the application locally, in the main directory, `npm install`, and then `npm start`. Navigate to `localhost:5000` in your browser in order to use the application.

Once the application has started, start the discord, in the terminal in the main directory, `pip install -r`, then `python bot.py`.

## Project structure
```
.
├── .vscode/ - Visual Studio Code configuration files
├── backend/ - Backend App
│ ├── config/ - Handles middleware and environment variables
│ ├── lib/ - Handles discord middleware
│ ├── models/ - Handles Mongoose Models
│ ├── routes/ - Handles API calls for routes
│ └── server.js - Configures Port and HTTP Server and Handles Middleware
├── frontend/ - Frontend App
│ ├── public/ - public static files
│ ├── scripts/ - scripts to publish
│ ├── src/ - react app folder
│ │ ├── components - React components for each page
│ │ ├── App.js - React routing
│ └─└── index.js - React root component
├── bot.py - Starts python bot
├── requirements.txt - Contains all python libraries to be pip installed for the Discord bot to run
└── README.md
```
