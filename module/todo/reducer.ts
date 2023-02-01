import { DECREMENT, INCREMENT } from './types';

type Action = {
  type: string;
  payload?: any;
}

const INITIAL_STATE = {
	count: 0,
};

const counterReducer = (state = INITIAL_STATE, action:Action) => {
	switch (action.type) {
		case INCREMENT:
			return {
				...state, count: state.count + 1,
			};
		case DECREMENT:
			return {
				...state, count: state.count - 1,
			};
		default: return state
	}
}

export default counterReducer;