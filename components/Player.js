import React, { Component } from 'react';

export default class Player extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className={ this.props.person.className + ' player ' + this.props.active }>
				{this.props.person.name} ({this.props.person.sign})
			</div>			
		)
	}
}