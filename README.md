# tic-tac-toe

An in-browser Tic-Tac-Toe Game. Implemented in TypeScript using an HTML `canvas` element.

## How to use

Run `yarn` to install dependencies. Then run `npm run start:dev` to run the development server, which builds the TypeScript code and serves the HTML and resulting JavaScript files. Then go to `localhost:8080` in your browser to play the game.

I use vscode (Visual Studio Code) as the editor for this project, which has a nice built-in integration for TypeScript. If you have vscode installed, just load up the project with `code .` and you should be good to go.

The TypeScript code is located in `src`, but `index.html` is located in `dist`.

## TODO

1. Actually implement the game loop. Right now it just displays a static grid and you can't do anything. Support multiple players taking turns, and stop the game and draw a line over the three in a row when a player wins.
2. Show an indicator for which player is playing.
3. Add some AI. Start with something stupid that just makes a legal move, and go from there.
