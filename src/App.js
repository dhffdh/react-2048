import React, {Component} from 'react';
import './App.scss';

import Layout from './UI/Layout';
import Field from './UI/Field';

import {
    moveCells,
    canMoveCells,
    directions,
    initCells,
    removeAndIncreaseCells,
    populateField,
    getScore
} from './logic'



class App extends Component {

    state = this.getNewState();

    newGame = () => {

        this.setState(this.getNewState(),() => {this.updateLocalState()});
    };

    getNewState() {
        return {
            cells: initCells(),
            score: 0,
            newScore: 0,
            bestScore: this.getLocalBestScore()
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress)

        const localState = JSON.parse(localStorage.getItem('state'))

        if(!!localState && !!localState.cells)
            this.setState(state => (localState));

    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress)
        this.updateLocalState()
    }

    getLocalBestScore() {
        const bestScore = JSON.parse(localStorage.getItem('bestScore'))
        return !!bestScore ? bestScore : 0
    }

    updateLocalState = () => {
        //console.log('updateLocalState');

        if(this.state.score > this.state.bestScore ){
            this.setState(state => ({
                ...state,
                bestScore: this.state.score
            }));
            localStorage.setItem('bestScore', JSON.stringify(this.state.score));
        }

        localStorage.setItem('state', JSON.stringify(this.state));
    }

    mapKeyCodeToDirection = {
        '65': directions.LEFT,
        '83': directions.DOWN,
        '68': directions.RIGHT,
        '87': directions.UP,
        '37': directions.LEFT,
        '40': directions.DOWN,
        '39': directions.RIGHT,
        '38': directions.UP,
    };

    handleKeyPress = async event => {

        let keyCode = event.keyCode.toString(),
            mapDirection = (Object.keys(this.mapKeyCodeToDirection).includes(keyCode)) ? this.mapKeyCodeToDirection[keyCode] : null ;

        //console.log('handleKeyPress 2', keyCode, Object.keys(this.mapKeyCodeToDirection));

        if ( mapDirection && canMoveCells(this.state.cells,mapDirection)){

            //console.log('handleKeyPress 3', mapDirection);

            this.setState(state => ({
                ...state,
                newScore: 0,
                cells: moveCells(state.cells, mapDirection),
            }));

            await delay(100);

            //console.log('state',this.state);

            const cells = removeAndIncreaseCells(this.state.cells)

            const newScore = getScore(cells);

            this.setState(
                state => ({
                    ...state,
                    newScore: newScore,
                    score: state.score + newScore,
                    cells: cells
                })
            );

            await delay(0);

            this.setState(

                state => ({
                    ...state,
                    cells: populateField(state.cells),
                })

                ,
                () => {
                    this.updateLocalState()
                }

            )

        }

    };

    render() {
        const { cells, score , newScore , bestScore } = this.state

        return (
            <div className="container">
                <header className="heading">
                    <h1 className="title">2048</h1>
                    <div className="scores-container">
                        <div className="score-container">
                            { score }
                            {
                                newScore > 0 ? <div className="score-addition">+{ newScore }</div> : null
                            }
                        </div>
                        <div className="best-container">{ bestScore }</div>
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
