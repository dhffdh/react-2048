import React, { PureComponent } from 'react'

class Cell extends PureComponent{

    getTileClass = (value) => {
        return ( value <= 2048 ) ? value : 'super';
    };

    getTileFullClasses = ( props ) => {
        const { x,y,value,status } = props;

        let str = `tile tile-${this.getTileClass(value)} tile-position-${x}-${y}`;

        if(!!status){
            str += ` tile-${status.toLowerCase()}`;
        }
        return str;
    };

    render() {
        const { value } = this.props;
        return (
            <div className={this.getTileFullClasses(this.props)} >
                <div className="tile-inner">
                    { value }
                </div>
            </div>
        )
    }
}

class BackgroundCell extends PureComponent{
    render() {
        const {x,y} = this.props;
        return (
            <div className={`bg-tile bg-tile-position-${x}-${y}`} ></div>
        )
    }
}


class Field extends PureComponent {
    render() {
        const { cells } = this.props;
        return (
            <div className="game-container">
                <div className="grid-container">
                    {
                        Array
                            .from(new Array(4), (_, i) => i)
                            .map(i => {
                                return Array.from(new Array(4), (_, j) => j)
                                .map(j => {
                                    return <BackgroundCell x={i} y={j}/>
                                })
                            })}
                </div>

                <div className="tile-container">
                    {cells.map(({ x, y, value, id, status }) => (
                        <Cell key={id} x={x} y={y} value={value} status={status} />
                    ))}
                </div>
            </div>
        )
    }
}


export default Field