/* Initialize the state of the project with default values */
const initState = {
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
    return state;
}

export default rootReducer;