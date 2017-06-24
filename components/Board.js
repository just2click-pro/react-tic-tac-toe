import React, { Component } from 'react';
import Messages from './Messages';
import Player from './Player';
import GameBoard from './GameBoard';

const BOARD_SIZE =  3;

export default class Board extends Component {
    constructor(){
        super();

        this.state = {
            message: '',
            player1: this.resetPlayer(1),
            player2: this.resetPlayer(2),
            activePlayer: { id: 0 },
            startButton: this.resetButton(),
            gameBoard: this.prepareBoard(),
            gameOn: false
        };
    }

    startAGame () {
    	let selectedPlayerIndex = (Math.floor((Math.random() * 2) + 1));
    	let selectPlayer = ((selectedPlayerIndex ===1) ? this.state.player1 : this.state.player2);
    	this.setState({
    		startButton: {
    			class: 'start-game',
    			text: 'Game on!',
    			state: 'disabled',
    		},
            player1: this.resetPlayer(1),
            player2: this.resetPlayer(2),
    		activePlayer: selectPlayer,
    		gameBoard: this.prepareBoard(),
    		gameOn: true,
    		message: "A game has started!"
    	});
    }

    resetButton () {
    	return {
	    	className: 'start-game',
	    	text: 'Start a new game!',
	    	state: ''
		}
    }

    resetPlayer (id) {
    	let sign = (id === 1) ? 'X' : 'O';
    	return {
    		id: id,
    		name: 'Player ' + id,
    		className: 'player-' + id,
    		sign: sign,
    		tiles: []
    	}
    }

    gameOver (winner) {
		this.setState({
			startButton: this.resetButton(),
			message: 'The winner is ' + winner.name
		})
    } 

    prepareBoard () {
    	let board = [];
    	for (let i = 0; i < BOARD_SIZE; i++) {
    		board.push(new Array(BOARD_SIZE).fill(null));
    	}

    	return board;
    }

    getActivePlayerClass (value) {
    	return ( (this.state.activePlayer.id == value) ? 'active-player' : '' );
    }

    markPlayerMove (gameBoard, tile, activePlayer) {
    	let tileIndices = tile.split('_');
    	if (activePlayer.id === 1) {
    		this.state.player1.tiles.push(tile);
    	} else {
    		this.state.player2.tiles.push(tile);
    	}
    	gameBoard[parseInt(tileIndices[0], 10)][parseInt(tileIndices[1], 10)] = activePlayer.sign;
    	return gameBoard;
    }

    checkWinState (winState) {
		let cell1 = winState[0],
			cell2 = winState[1],
			cell3 = winState[2];

		return ((this.state.gameBoard[cell1[0]][cell1[1]] === this.state.gameBoard[cell2[0]][cell2[1]]) &&
				(this.state.gameBoard[cell1[0]][cell1[1]] === this.state.gameBoard[cell3[0]][cell3[1]]) &&
				(this.state.gameBoard[cell1[0]][cell1[1]] !== null));
    }

    hasWinner () {
    	let found = false, winState;
    	for (winState of this.props.winStates) {
    		found = this.checkWinState(winState);
    		if (found) { break; }
    	}
		return found;
    }

    tileClicked (tile) {
    	let tileValue = tile.target.textContent;
    	if (!this.state.gameOn) { return; }
    	if (tileValue !== '') { return; }
    	tile = tile.target.id;
    	let active = ((this.state.activePlayer.id == 1) ? this.state.player2 : this.state.player1);
    	this.setState({
    		gameBoard: this.markPlayerMove(this.state.gameBoard, tile, this.state.activePlayer),
    		activePlayer: active,
    		message: active.name + ' turn now ...'
    	});
    	if (this.hasWinner()) {
    		this.gameOver(this.state.activePlayer);
    	}
    }

    render () {
    	return (
    		<div className="container">
    			<Messages message={ this.state.message } />
    			<button className={ this.state.startButton.className + ' button' } 
    				disabled = { this.state.startButton.state }
    				onClick={ this.startAGame.bind(this) }>{ this.state.startButton.text }</button>
    			<section className="players">
	    			<Player person={ this.state.player1 } active={ this.getActivePlayerClass(1) } />
	    			<Player person={ this.state.player2 } active={ this.getActivePlayerClass(2) } />
    			</section>
    			<GameBoard gameBoard={ this.state.gameBoard } 
    				player1={ this.state.player1 } 
    				player2={ this.state.player2 } 
    				onTileClicked={ this.tileClicked.bind(this) } />
    		</div>
		);
    }
}