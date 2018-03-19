//import { combineReducers } from 'redux';
import { CATEGORIES_LOADED } from '../actions/categories';
import { POSTS_LOADED, POST_LOADED } from '../actions/posts';
import { COMMENTS_LOADED } from '../actions/comments';

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
		case POST_LOADED:
			return {
				...state,
				post: action.post
			};
		case COMMENTS_LOADED:
			return {
				...state,
				comments: action.comments
			};
		default:
			return state;
	}
};

export default app;
