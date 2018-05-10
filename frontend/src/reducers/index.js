//import { combineReducers } from 'redux';
import { CATEGORIES_LOADED } from '../actions/categories';
import { POSTS_LOADED, POST_LOADED, POST_UPDATED, POST_VOTES_UPDATED } from '../actions/posts';
import { COMMENTS_LOADED, COMMENTS_COUNTED, COMMENT_UPDATED, COMMENT_VOTES_UPDATED } from '../actions/comments';

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
		case POST_VOTES_UPDATED:
			{
				const {id, voteScore} = action;
				const newState = { ...state };

				if (newState.post && newState.post.id === id)
				{
					newState.post = { 
						...newState.post,
						voteScore };
				}

				if (newState.allPosts) // TODO: convert array of posts to dictionary of posts by ID ???
				{
					const idx = newState.allPosts.findIndex(p => p.id === id);
					if (idx >= 0){
						newState.allPosts[idx] = {
							...newState.allPosts[idx],
							voteScore
						};
					}
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
		case COMMENT_UPDATED:
		{
			// TODO: update comment content after edit
			const updatedComment = action.comment;
			const newState = { ...state };

			if (newState.comments) // TODO: convert array of comments to dictionary of comments by ID ???
			{
				const idx = newState.comments.findIndex(p => p.id === updatedComment.id);
				if (idx >= 0)
					newState.comments[idx] = updatedComment;
			}
			
			return newState;
		}
		case COMMENT_VOTES_UPDATED:
			{
				const {id, voteScore} = action;
				const newState = { ...state };

				if (newState.comments) // TODO: convert array of comments to dictionary of comments by ID ???
				{
					const idx = newState.comments.findIndex(p => p.id === id);
					if (idx >= 0){
						newState.comments[idx] = {
							...newState.comments[idx],
							voteScore
						};
					}
				}

				return newState;
			}

		default:
			return state;
	}
};

export default app;
