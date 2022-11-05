const initialState = {
    points: [],
    lastPoint:null
}

export const pointsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_POINT":
            const searchIndex = state.points.findIndex((e) => e.x == action.payload.x && e.y == action.payload.y);
            if (searchIndex == -1) {
                state.points.push(action.payload)
                return {...state,lastPoint:action.payload};
            }else{
                return state;
            }
        case "REMOVE_POINT":
            state.points.splice(action.payload,1);
            return {...state,lastPoint:action.payload}
        case "SET_CURRENT_NULL":
            return initialState
        default:
            return state
    }
}

export default pointsReducer;