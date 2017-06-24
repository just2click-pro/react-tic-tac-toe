import React, { Component } from 'react';
import TopBar from './TopBar';
import Board from './Board';

export default class App extends Component {

    constructor(){
        super();

        this.state = {
            data: []
        };
    }

    componentDidMount () {
        fetch('../static/data/win-states.json')
            .then((response) => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Got no response');
            })
            .then((response) => {
                this.setState({ 'data': response.states })
            })
            .catch((err) => {
                console.log('There was an error getting data', err);
            })
    }

    render() {
        return (
        <div className="app">
            <TopBar name={ this.state.name }>
                React Tic-Tac-Toe
            </TopBar>
            <Board winStates={ this.state.data } />
        </div>
        )
    }
}
