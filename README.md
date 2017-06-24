# react-tic-tac-toe

Netcraft React version of Tic-Tac-Toe

## Context

* Building the entire app using React, ES6 and webpack
* Application is broken into various components:
* App
	* Topbar
	* Board
		* Messaging - inform the user about actions in the game
		* Start/Restart button -  start a game
		* Player1 and Player2
		* Game Board - holds the actual game rendering
			* Tile - renders each tile

* The Board component handles all the logic of the application.
* It holds the player data (name, id, sign and any tiles each player has already used)
* Each tile when clicked informs the game board and then the board that the user has clicked it
* Upon each click the board updates all the data, checks if this tile is clickable and
	if any of the players won the game.
* If any of the players has won the game the restart button is re-enabled.

