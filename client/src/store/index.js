import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import taskReducer from "./reducers/taskReducer";

const rootReducer = combineReducers({
	taskReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
