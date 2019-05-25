/* Initialize the state of the project with default values */
const initState = {
    data: [],
    selectedRate: 'win'
}
const rootReducer = (state = initState, action) => {
    
    if (action.type === 'SET_RATE') {
        let newRate = action.value;
        return {
            ...state,
            selectedRate: newRate
        }
    }
    if (action.type === 'fetchingDATA') {
        let newData = action.value
        return {
            ...state,
            data: newData
        }
    }
    return state;
}

export default rootReducer;