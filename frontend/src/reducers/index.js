//import { combineReducers } from 'redux';
import { CATEGORIES_LOADED, POSTS_LOADED } from '../actions';

const initialState = {
	allCategories: [],
	allPosts: []
}

const app = (state = initialState, action) => {
	switch (action.type) {
		case CATEGORIES_LOADED:
			return {
				...state,
				allCategories: action.categories
			};
		case POSTS_LOADED:
			return {
				...state,
				allPosts: action.posts
			};
		default:
			return state;
	}
};

export default app;
