//import { combineReducers } from 'redux';
import { CATEGORIES_LOADED } from '../actions/categories';
import { POSTS_LOADED, POST_LOADED, POST_UPDATED } from '../actions/posts';
import { COMMENTS_LOADED, COMMENTS_COUNTED } from '../actions/comments';

const initialState = {
	allCategories: [],
	allPosts: [],
	commentCounts: {}
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
		case POST_UPDATED:
			{
				const updatedPost = action.post;
				const newState = { ...state };

				if (newState.post && newState.post.id === updatedPost.id)
					newState.post = updatedPost;

				if (newState.allPosts) // TODO: convert array of posts to dictionary of posts by ID ???
				{
					const idx = newState.allPosts.findIndex(p => p.id === updatedPost.id);
					if (idx >= 0)
						newState.allPosts[idx] = updatedPost;
				}

				return newState;
			}

		case COMMENTS_LOADED:
			return {
				...state,
				comments: action.comments,
				commentsCount: (action.comments || []).length
			};
		case COMMENTS_COUNTED:
			return {
				...state,
				commentCounts: {
					...state.commentCounts,
					[action.postId]: action.commentsCount
				}
			};

		default:
			return state;
	}
};

export default app;
