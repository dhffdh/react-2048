import {cellStates, cellStatuses} from './cellManager'

function removeAndIncreaseCells (cells) {
    return cells.filter(cell => cell.state !== cellStates.DYING).map(cell => {
        if (cell.state === cellStates.INCREASE) {
            cell.value *= 2
            cell.status = cellStatuses.MERGED
        }

        cell.state = cellStates.IDLE

        return cell
    })
}

function getScore(cells) {
    let newScore = 0;
    cells.map(function (el, index) {
        if(el.status === cellStatuses.MERGED){
            newScore += el.value;
        }
        return 1;
    });
    return newScore;
}

export {removeAndIncreaseCells, getScore}