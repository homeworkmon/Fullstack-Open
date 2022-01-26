
const setMessage = (message) => {
    return {
            type: 'CHANGE_MESSAGE',
            message
        }
    }

const removeMessage = () => {
    return { type: 'REMOVE' }
    }

let timeoutID

export const setNotification = (message, delay) => {
    return dispatch => {
        dispatch(setMessage(message))
        timeoutID = setTimeout(() => { dispatch(removeMessage()) }, (delay * 1000))
    }
}

const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'CHANGE_MESSAGE':
            clearTimeout(timeoutID)
            return action.message
        case 'REMOVE':
            return null
        default: 
            return state
    }
}

export default notificationReducer