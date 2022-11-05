import { createStore,combineReducers,applyMiddleware } from "redux";
import windowReducer from "../reducers/window";
import pointsReducer from "../reducers/points";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import  dataReducer  from "../reducers/data";

const store=createStore(
    combineReducers({
        window:windowReducer,
        points:pointsReducer,
        data:dataReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;