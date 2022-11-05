const initialState = {
    windowActive: "editPoints"
}

export const windowReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_WINDOW_ACTIVE":
            return { ...state, windowActive: action.payload}
        case "SET_CURRENT_NULL":
            return initialState
        default:
            return state
    }
}

export default windowReducer;