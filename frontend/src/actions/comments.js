/*eslint dot-location: ["error", "object"]*/
import { api, headers, jsonHeaders } from '../config';

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

export const countCommentsForPost = (postId) => dispatch => (
	fetch(`http://${api}/posts/${postId}/comments`,
		{
			headers: headers
		}).
		then(res => {
			if (res.ok)
				return res.json();

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
	fetch(`http://${api}/posts/${postId}/comments`,
		{
			headers: headers
		}).
		then(res => {
			if (res.ok)
				return res.json();

			throw new Error('TODO');
		}).
		then(json => {
			dispatch(
				commentsLoaded(
					json));
		}).
		catch(console.error)
);

export function commentsLoaded(comments) {
	return {
		type: COMMENTS_LOADED,
		comments
	};
}

export const addComment = ({ id, timestamp, body, author, parentId }) => dispatch => {
	fetch(`http://${api}/comments`,
		{
			headers: jsonHeaders,
			method: 'POST',
			body: JSON.stringify({ id, timestamp, body, author, parentId })
		}).then(res => {
			if (res.ok)
				return res.json();

			throw new Error('TODO');
		}).then(comment => {
			dispatch(
				commentAdded(
					comment));
		}).catch(console.error);
};

export function commentAdded(comment) {
	return {
		type: COMMENT_ADDED,
		comment
	};
}

export const updateComment = ({ id, timestamp, body }) => dispatch => {
	fetch(`http://${api}/comments/${id}`,
		{
			headers: jsonHeaders,
			method: 'PUT',
			body: JSON.stringify({ timestamp, body })
		}).
		then(res => {
			if (res.ok)
				return res.json();

			throw new Error('TODO');
		}).
		then(comment => {
			dispatch(
				commentUpdated(
					comment));
		}).
		catch(console.error);
};

export function commentUpdated(comment) {
	return {
		type: COMMENT_UPDATED,
		comment
	};
}

export const deleteComment = (id) => dispatch => {
	fetch(`http://${api}/comments/${id}`,
		{
			headers: headers,
			method: 'DELETE'
		}).
		then(res => {
			if (res.ok)
				return res.json();

			throw new Error('TODO');
		}).
		then(comment => {
			dispatch(
				commentDeleted(
					comment));
		}).
		catch(console.error);
};

export function commentDeleted({ id, parentId }) {
	return {
		type: COMMENT_DELETED,
		id,
		parentId
	};
}

const vote = (id, option, dispatch) => {
	fetch(`http://${api}/comments/${id}`,
		{
			headers: jsonHeaders,
			method: 'POST',
			body: JSON.stringify({
				option
			})
		}).
		then(res => {
			if (res.ok)
				return res.json();

			throw new Error('TODO');
		}).
		then(comment => {
			dispatch(
				commentVotesUpdated(
					comment));
		}).
		catch(console.error);
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
