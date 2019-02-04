import { cloneDeep } from 'lodash'
import { cellStates } from './cellManager'


//поворот матрицы
let matrixRotate = (matrix) => {
    matrix = matrix.reverse();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
};


const directions = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
}


//двигает или складывает ячейки поля
const moveCells = (initCells, direction) => {
    const cells = cloneDeep(initCells)

    const matrix = Array.from(new Array(4), () =>
        Array.from(new Array(4), () => 0),
    )

    cells.forEach(cell => {
        matrix[cell.y][cell.x] = cell
    })

    rotateMatrixFromDirection(matrix, direction)

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (matrix[y][x] === 0) continue
            moveCell(matrix, x, y)
        }
    }

    rotateMatrixToDirection(matrix, direction)

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (matrix[y][x] === 0) continue
            matrix[y][x].y = y
            matrix[y][x].x = x
            matrix[y][x].status = false
        }
    }

    //printMatrix(matrix);

    cells.filter(cell => cell.by != null).forEach(cell => {
        cell.x = cell.by.x;
        cell.y = cell.by.y;
        delete cell.by
    })

    return cells
}

// проверяет можно ли двигать ячейки в поле
function canMoveCells(initCells, direction) {
    const cells = cloneDeep(initCells)
    let bCanMove = false
    const matrix = Array.from(new Array(4), () =>
        Array.from(new Array(4), () => 0),
    )
    cells.forEach(cell => {
        matrix[cell.y][cell.x] = cell
    })
    rotateMatrixFromDirection(matrix, direction)
    for (let y = 0; y < 4; y++) {
        if(bCanMove)
            break;
        for (let x = 0; x < 4; x++) {
            if (matrix[y][x] === 0) continue
            if(canMoveCell(matrix, x, y)){
                bCanMove = true
                break;
            }
        }
    }
    return bCanMove;
}

//проверяет можно ли двигать ячейку x/y
function canMoveCell(matrix, x, y) {
    let nextRow = y - 1
    let currentRow = y
    let canMove = false
    while (nextRow >= 0) {
        if (matrix[nextRow][x] === 0) {
            canMove = true
            currentRow = nextRow
        } else if (
            matrix[nextRow][x].value === matrix[currentRow][x].value &&
            (matrix[nextRow][x].state === cellStates.IDLE ||
                matrix[nextRow][x].state === cellStates.MOVING)
        ) {
            canMove = true
            currentRow = nextRow
        } else {
            break
        }
        nextRow -= 1
    }
    return canMove
}

//двигает ячейку x/y
function moveCell(matrix, x, y) {
    let nextRow = y - 1
    let currentRow = y

    while (nextRow >= 0) {
        if (matrix[nextRow][x] === 0) {
            matrix[nextRow][x] = matrix[currentRow][x]
            matrix[currentRow][x].state = cellStates.MOVING
            matrix[currentRow][x] = 0

            currentRow = nextRow
        } else if (
            matrix[nextRow][x].value === matrix[currentRow][x].value &&
            (matrix[nextRow][x].state === cellStates.IDLE ||
                matrix[nextRow][x].state === cellStates.MOVING)
        ) {
            matrix[nextRow][x].state = cellStates.DYING
            matrix[nextRow][x].by = matrix[currentRow][x]
            matrix[currentRow][x].state = cellStates.INCREASE
            matrix[nextRow][x] = matrix[currentRow][x]
            matrix[currentRow][x] = 0
            currentRow = nextRow
        } else {
            break
        }

        nextRow -= 1
    }
}


//поворот матрицы в зависимости от нпаврления
function rotateMatrixFromDirection(matrix, direction) {
    switch (direction) {
        case directions.LEFT:
            matrixRotate(matrix)
            break
        case directions.DOWN:
            matrixRotate(matrix)
            matrixRotate(matrix)
            break
        case directions.RIGHT:
            matrixRotate(matrix)
            matrixRotate(matrix)
            matrixRotate(matrix)
            break
        default:
            break
    }
}

//обратный разворот матрицы в исходное положение
function rotateMatrixToDirection(matrix, direction) {
    switch (direction) {
        case directions.LEFT:
            matrixRotate(matrix)
            matrixRotate(matrix)
            matrixRotate(matrix)
            break
        case directions.DOWN:
            matrixRotate(matrix)
            matrixRotate(matrix)
            break
        case directions.RIGHT:
            matrixRotate(matrix)
            break
        default:
            break
    }
}

function printMatrix(matrix) {
    let printString = '[\n'

    Array.from(new Array(4), (x, i) => i).forEach(colNum => {
        printString += '  '
        printString += Array.from(new Array(4), (x, i) => i)
            .map(rowNum => JSON.stringify(matrix[colNum][rowNum]).padStart(40, ' '))
            .join(', ')
        printString += ',\n'
    })

    printString += ']'
    console.log(printString)
}

export { moveCells, directions, canMoveCells }