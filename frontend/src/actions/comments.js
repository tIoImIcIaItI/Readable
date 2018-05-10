/*eslint dot-location: ["error", "object"]*/
export const COMMENTS_ADD = 'COMMENTS_ADD';
export const COMMENT_ADDED = 'COMMENT_ADDED';
export const COMMENTS_LOAD = 'COMMENTS_LOAD';
export const COMMENTS_LOADED = 'COMMENTS_LOADED';
export const COMMENT_UPDATE = 'COMMENT_UPDATE';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';
export const COMMENT_VOTES_UPDATED = 'COMMENT_VOTES_UPDATED';
export const COMMENTS_DELETE = 'COMMENTS_DELETE';
export const COMMENT_DELETED = 'COMMENT_DELETED';
export const COMMENTS_COUNTED = 'COMMENTS_COUNTED';

// TODO: remove hard-coded API URL prefix
export const countCommentsForPost = (postId) => dispatch => (
	fetch(`http://127.0.0.1:3001/posts/${postId}/comments`,
		{
			headers: { 'Authorization': 'whatever-you-want' }
		}).
		then(res => {
			if (res.ok)
				return res.json();

			console.log(res);
			throw new Error('TODO');
		}).
		then(json => {
			dispatch(
				commentsCounted(
					postId, (json || []).length));
		}).
		catch(console.error)
);

export function commentsCounted(postId, commentsCount) {
	return {
		type: COMMENTS_COUNTED,
		postId, commentsCount
	};
}

export const fetchCommentsForPost = (postId) => dispatch => (
	fetch(`http://127.0.0.1:3001/posts/${postId}/comments`,
		{
			headers: { 'Authorization': 'whatever-you-want' }
		}).
		then(res => {
			if (res.ok)
				return res.json();

			console.log(res);
			throw new Error('TODO');
		}).
		then(json => {
			console.log(json);
			dispatch(
				commentsLoaded(
					json));
		}).
		catch(console.error)
);

export const addComment = (id, timestamp, body, author, parentId) => dispatch => {
	fetch(`http://127.0.0.1:3001/comments`,
		{
			headers: { 'Authorization': 'whatever-you-want' },
			method: 'POST',
			body: {} // TODO: 
		}).
		then(res => {
			// if (res.ok)
			// 	return res.json();

			console.log(res);
			// throw new Error('TODO');
		}).
		then(_ => {
			dispatch(
				commentAdded(
					id));
		}).
		catch(console.error)
}

export function commentAdded(id) {
	return {
		type: COMMENT_ADDED,
		id
	};
}

export const updateComment = (id, timestamp, body) => dispatch => {
	fetch(`http://127.0.0.1:3001/comments/${id}`,
		{
			headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({
				timestamp, 
				body
			})
		}).
		then(res => {
			if (res.ok)
				return res.json();

			console.log(res);
			// throw new Error('TODO');
		}).
		then(comment => {
			dispatch(
				commentUpdated(
					comment));
		}).
		catch(console.error)
}

export function commentUpdated(comment) {
	return {
		type: COMMENT_UPDATED,
		comment
	};
}

export const deleteComment = (id) => dispatch => {
	fetch(`http://127.0.0.1:3001/comments/${id}`,
		{
			headers: { 'Authorization': 'whatever-you-want' },
			method: 'DELETE'
		}).
		then(res => {
			// if (res.ok)
			// 	return res.json();

			console.log(res);
			// throw new Error('TODO');
		}).
		then(_ => {
			dispatch(
				commentDeleted(
					id));
		}).
		catch(console.error)
}

export function commentDeleted(id) {
	return {
		type: COMMENT_DELETED,
		id
	};
}

export function commentsLoaded(comments) {
	return {
		type: COMMENTS_LOADED,
		comments
	};
}

const vote = (id, option, dispatch) => {
	fetch(`http://127.0.0.1:3001/comments/${id}`,
		{
			headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({
				option
			})
		}).
		then(res => {
			if (res.ok)
			{
				const comment = res.json();
				console.log(comment);
				return comment;
			}			
			// throw new Error('TODO');
		}).
		then(comment => {
			dispatch(
				commentVotesUpdated(
					id));
		}).
		catch(console.error)
};

export function commentVotesUpdated(comment) {
	return {
		type: COMMENT_VOTES_UPDATED,
		id: comment.id,
		voteScore: comment.voteScore
	};
}

export const voteCommentUp = (id) => dispatch => {
	vote(id, 'upVote', dispatch);
};

export const voteCommentDown = (id) => dispatch => {
	vote(id, 'downVote', dispatch);
};
