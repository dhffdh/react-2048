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

export {removeAndIncreaseCells}