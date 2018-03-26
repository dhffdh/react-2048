import {uniqueId} from 'lodash'

const cellStates = {
    IDLE: "IDLE",
    MOVING: "MOVING",
    DYING: "DYING",
    INCREASE: "INCREASE",
};

const cellStatuses = {
    NEW: "NEW",
    MERGED: "MERGED",
};

const create = (x, y, value, id) => ({
    x, y, value,
    id: id ? id : uniqueId(),
    state: cellStates.IDLE,
    status: cellStatuses.NEW
});

export {create, cellStates , cellStatuses}