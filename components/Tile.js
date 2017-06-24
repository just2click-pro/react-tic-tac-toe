import React, { Component } from 'react';

export default (props)=> {

	function setTileClass (player) {
		for (let i = 0; i < player.tiles.length; i++) {
			if (player.tiles[i] === props.id) {
				return ("tile-" + player.id);
			}
		}
		return '';
	}

	let tileClassName = "tile ";
	if (props.player1.tiles) {
		tileClassName += setTileClass(props.player1);
	}
	if (props.player2.tiles) {
		tileClassName += setTileClass(props.player2);
	}	
	return (
		<div className={ tileClassName } onClick={ props.tileClicked.bind(this) } id={ props.id }>
			{ props.value }
		</div>
	);
}