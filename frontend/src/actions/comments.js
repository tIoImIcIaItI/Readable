/*eslint dot-location: ["error", "object"]*/
export const COMMENTS_ADD = 'COMMENTS_ADD';
export const COMMENT_ADDED = 'COMMENT_ADDED';
export const COMMENTS_LOAD = 'COMMENTS_LOAD';
export const COMMENTS_LOADED = 'COMMENTS_LOADED';
export const COMMENT_UPDATE = 'COMMENT_UPDATE';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';
export const COMMENTS_DELETE = 'COMMENTS_DELETE';
export const COMMENT_DELETED = 'COMMENT_DELETED';

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
			headers: { 'Authorization': 'whatever-you-want' },
			method: 'PUT',
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
				commentUpdated(
					id));
		}).
		catch(console.error)
}

export function commentUpdated(id) {
	return {
		type: COMMENT_UPDATED,
		id
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