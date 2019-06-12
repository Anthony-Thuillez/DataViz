/* Initialize the state of the project with default values */
const initState = {
    data: [],
    selectedRate: "win",
    selectedPoste: "",
    champ_name: "",
    champ_quolation: "",
    champ_icon: "",
    champ_role: "",
    champ_win: null,
    champ_ban: null,
    champ_pick: null,
    champ_posteName: "",
    champ_posteValue: null,
    champ_posteName2: "",
    champ_posteValue2: null,
    champ_posteName3: "",
    champ_posteValue3: null
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
    if (action.type === 'SET_CHAMP') {
        let newData = action.value
        return {
            ...state,
            champ_name: newData
        }
    }
    if (action.type === 'SET_GLOBAL') {
        let newData = action.value
        return {
            ...state,
            champ_quolation: newData.quotation,
            selectedPoste: newData.selectedPoste,
            champ_icon: newData.icon,
            champ_role: newData.role,
            champ_win: newData.win,
            champ_ban: newData.ban,
            champ_pick: newData.pick,
            champ_posteName: newData.posteName,
            champ_posteValue: newData.posteValue,
            champ_posteName2: newData.posteNam2,
            champ_posteValue2: newData.posteValue2,
            champ_posteName3: newData.posteName3,
            champ_posteValue3: newData.posteValue3
        }
    }

    if (action.type === 'SET_CHAMPNAME_FROM_URL') {
        let newData = action.value
        return {
            ...state,
            champ_name: newData
        }
    }

    if (action.type === 'SET_POSTE_FROM_URL') {
        let newData = action.value
        return {
            ...state,
            selectedPoste: newData
        }
    }
    return state;
}

export default rootReducer;