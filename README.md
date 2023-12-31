# About this project

This project is a web version of the popular board game qwirkle: https://en.wikipedia.org/wiki/Qwirkle

## Current Progress

The app is working locally and online play using sockets with socket io has been implemented. To create a
game the host game button should be clicked and then others can join via by entering the generated 'lobby id'.
In future a chat functionality may be implemented

### Running the app

Clone this git repo onto your local machine and run the `npm start` command from the root directory.
The 'play locally with 4 players' method is currently working without the server. If you want to play
via the server it may be down but is sometimes being hosted on render.com so the app may connect
automatically. If it is down then the server can be ran by navigating to the /server directory and
running the `npm install` and `nodemon server.ts` commands.
