/* Initialize the state of the project with default values */
const initState = {
    data: [],
    selectedRate: 'win',
    selectedPoste: '',
    selectedChamp: 'Akali'
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
    if (action.type === 'SET_POSTE') {
        let newData = action.value
        return {
            ...state,
            selectedPoste: newData
        }
    }
    if (action.type === 'SET_NAME') {
        let newData = action.value
        return {
            ...state,
            selectedChamp: newData
        }
    }
    return state;
}

export default rootReducer;