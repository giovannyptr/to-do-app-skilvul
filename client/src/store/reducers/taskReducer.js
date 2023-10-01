import { SET_TASKS } from "../actionTypes";

const initialState = {
	tasks: [],
};

export default function taskReducer(state = initialState, action) {
	switch (action.type) {
		case SET_TASKS:
			return {
				...state,
				tasks: action.payload,
			};
		default:
			return state;
	}
}
