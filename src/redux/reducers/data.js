
const initialState = {
    isVisibleVoronoi: true,
    isVisibleDelaunay: true,
    currentNode: null,
    currentPolygon:null
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_POLYGON":
            if (action.payload == state.currentPolygon) {
                return { ...state, currentPolygon: null }
            }
            return { ...state, currentPolygon: action.payload }

        case "SET_CURRENT_NODE":
            if (action.payload == state.currentNode) {
                return { ...state, currentNode: null }
            }
            return { ...state, currentNode: action.payload }
        case "TOOGLE_VISIBLE":
            if (action.payload == "voronoi") {
                return { ...state, isVisibleVoronoi: !state.isVisibleVoronoi }
            }
            if (action.payload == "delaunay") {
                return { ...state, isVisibleDelaunay: !state.isVisibleDelaunay }
            }
        case "FETCH_DATA":
            return { ...state, ...action.payload }
        case "SET_DATA_NULL":
            return initialState
        default:
            return state
    }
}

export default dataReducer;