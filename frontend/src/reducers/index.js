//import { combineReducers } from 'redux'; // TODO: split into multiple recuders and combine
import { CATEGORIES_LOADED } from '../actions/categories';
import { POSTS_LOADED, POST_LOADED, POST_UPDATED, POST_DELETED, POST_VOTES_UPDATED } from '../actions/posts';
import { COMMENTS_LOADED, COMMENTS_COUNTED, COMMENT_UPDATED, COMMENT_DELETED, COMMENT_VOTES_UPDATED } from '../actions/comments';

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
					if (idx >= 0) {
						newState.allPosts = [ ...newState.allPosts ];

						newState.allPosts[idx] = updatedPost;
					}
				}

				return newState;
			}
		case POST_VOTES_UPDATED:
			{
				const { id, voteScore } = action;
				const newState = { ...state };

				if (newState.post && newState.post.id === id) {
					newState.post = {
						...newState.post,
						voteScore
					};
				}

				if (newState.allPosts) // TODO: convert array of posts to dictionary of posts by ID ???
				{
					const idx = newState.allPosts.findIndex(p => p.id === id);
					if (idx >= 0) {
						newState.allPosts = [
							...newState.allPosts
						];
						newState.allPosts[idx] = {
							...newState.allPosts[idx],
						};
						newState.allPosts[idx].voteScore =
							voteScore;
					}
				}

				return newState;
			}
		case POST_DELETED:
			{
				const { id } = action;
				const newState = { ...state };

				if (newState.allPosts) // TODO: convert array of posts to dictionary of posts by ID ???
				{
					newState.allPosts = newState.allPosts.filter(p => p.id !== id);
				}

				if (newState.post) {
					newState.post = {
						...newState.post,
						deleted: true // this assumes the server did what we think it should have done; if the updated post is returned, use it here instead
					}
				}

				// TODO: find a way to de-dupe this logic with COMMENT_DELETED reducer
				if (newState.commentCounts) {
					newState.commentCounts = { ...newState.commentCounts };
					delete newState.commentCounts[id];
				}

				if (newState.comments) // TODO: convert array of comments to dictionary of comments by ID ???
				{
					newState.comments = newState.comments.filter(c => c.parentId !== id);
				}

				if (newState.commentsCount) {
					newState.commentsCount = 0;
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
				const updatedComment = action.comment;
				const newState = { ...state };

				if (newState.comments) // TODO: convert array of comments to dictionary of comments by ID ???
				{
					const idx = newState.comments.findIndex(c => c.id === updatedComment.id);
					if (idx >= 0)
						newState.comments[idx] = updatedComment;
				}

				return newState;
			}
		case COMMENT_VOTES_UPDATED:
			{
				const { id, voteScore } = action;
				const newState = { ...state };

				if (newState.comments) // TODO: convert array of comments to dictionary of comments by ID ???
				{
					const idx = newState.comments.findIndex(c => c.id === id);
					if (idx >= 0) {
						newState.comments[idx] = {
							...newState.comments[idx],
							voteScore
						};
					}
				}

				return newState;
			}
		case COMMENT_DELETED:
			{
				const { id, parentId } = action;
				const newState = { ...state };

				if (newState.comments)  // TODO: convert array of comments to dictionary of comments by ID ???
				{
					newState.comments = newState.comments.filter(c => c.id !== id);
				}

				if (newState.commentsCount) {
					newState.commentsCount -= 1;
				}

				if (newState.commentCounts) {
					newState.commentCounts = { ...newState.commentCounts };

					newState.commentCounts[parentId] -= 1;
				}

				return newState;
			}

		default:
			return state;
	}
};

export default app;
