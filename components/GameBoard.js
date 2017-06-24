import React, { Component } from 'react';
import Tile from './Tile';

export default class GameBoard extends Component {
	constructor(props) {
		super(props);
	}

	onTileClicked (e) {
		this.props.onTileClicked(e);
	}

	render () {
		return (
			<div className="game-board">
				{
					this.props.gameBoard.map( (col, colIndex) => { 
						return (col.map( (row, rowIndex) => {
							return (
								<Tile key={ colIndex + '_' + rowIndex } 
									state={ row } 
									tileClicked={ this.onTileClicked.bind(this)} 
									id={colIndex + '_' + rowIndex}
									player1={ this.props.player1 }
									player2={ this.props.player2 }
									value={ this.props.gameBoard[colIndex][rowIndex] } />
								)
							})
						)
					})	
				}
			</div>
		);
	}
}