export const setFilter = (query) => {
    return {
        type: 'SET_FILTER',
        query
    }
}
const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.query
        default: 
            return state
    }
}

export default filterReducer