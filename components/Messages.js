import React, { Component } from 'react';

export default class Messages extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="message-board">
				{this.props.message}
			</div>
		);
	}
}