import React, {Component} from 'react';
import './App.scss';

import Layout from './UI/Layout';
import Field from './UI/Field';

import {
    moveCells,
    directions,
    initCells,
    removeAndIncreaseCells,
    populateField,
} from './logic'



class App extends Component {

    state = this.getNewState();

    newGame = () => {
        this.setState(this.getNewState());
    };

    getNewState() {
        return {
            cells: initCells(),
            score: 0,
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress)
    }

    mapKeyCodeToDirection = {
        65: directions.LEFT,
        83: directions.DOWN,
        68: directions.RIGHT,
        87: directions.UP,
        37: directions.LEFT,
        40: directions.DOWN,
        39: directions.RIGHT,
        38: directions.UP,
    };



    handleKeyPress = async event => {

        console.log('handleKeyPress 2',event.code , event.keyCode);

        if ([37,38,39,40,65,83,68,87].includes(event.keyCode)){

            this.setState(state => ({
                ...state,
                cells: moveCells(state.cells, this.mapKeyCodeToDirection[event.keyCode]),
            }));

            await delay(100);


            this.setState(state => ({
                ...state,
                cells: removeAndIncreaseCells(state.cells),
            }));

            //await delay(100);

            this.setState(state => ({
                ...state,
                cells: populateField(state.cells),
            }))

        }

    };

    render() {
        const {cells} = this.state

        return (
            <div className="container">
                <header className="heading">
                    <h1 className="title">2048</h1>

                    <div className="scores-container">
                        <div className="score-container">80<div className="score-addition">+4</div></div>
                        <div className="best-container">30292</div>
                    </div>

                </header>

                <div className="above-game">
                    <p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
                    <a className="restart-button" onClick={this.newGame}>New Game</a>
                </div>


                <Layout>
                    <Field cells={cells}/>
                </Layout>

                <p className="game-explanation">
                    <strong className="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>
                </p>

            </div>
        );
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default App;
