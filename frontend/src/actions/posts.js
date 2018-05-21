/*eslint dot-location: ["error", "object"]*/
import { api, headers, jsonHeaders } from '../config';

export const POSTS_LOADED = 'POSTS_LOADED';
export const POSTS_ADD = 'POSTS_ADD';
export const POST_ADDED = 'POST_ADDED';
export const POSTS_DELETE = 'POSTS_DELETE';
export const POST_DELETED = 'POST_DELETED';
export const POST_UPDATE = 'POST_UPDATE';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_VOTES_UPDATED = 'POST_VOTES_UPDATED';
export const POST_LOADED = 'POST_LOADED';
export const POST_LOADED_FAILED = 'POST_LOADED_FAILED';

export const fetchPosts = () => dispatch => (
	fetch(`http://${api}/posts`,
		{
			headers: headers
		}).
		then(res => {
			if (res.ok)
				return res.json();

			throw new Error(res);
		}).
		then(json => {
			dispatch(
				postsLoaded(json));
		}).
		catch(console.error)
);

export function postsLoaded(posts) {
	return {
		type: POSTS_LOADED,
		posts
	};
}

export const fetchPostById = (id) => dispatch => {
	fetch(`http://${api}/posts/${id}`,
		{
			headers: headers
		}).
		then(res => {
			if (res.ok)
				return res.json();

			throw new Error(res);
		}).
		then(post => {
			if (!post || post.id === undefined)
				dispatch(postLoaded({ id, deleted: true }));
			else
				dispatch(postLoaded(post));
		}).
		catch(error => {
			console.error(error);
			dispatch(postLoadedFailed(id));
		});
};

export function postLoaded(post) {
	return {
		type: POST_LOADED,
		post
	};
}

export function postLoadedFailed(id) {
	return {
		type: POST_LOADED_FAILED,
		id
	};
}


export const addPost = ({ id, timestamp, author, category, title, body }) => dispatch => {
	fetch(`http://${api}/posts`,
		{
			headers: jsonHeaders,
			method: 'POST',
			body: JSON.stringify({ id, timestamp, author, category, title, body })
		}).
		then(res => {
			if (res.ok)
				return res.json();
			throw new Error(res);
		}).
		then(post => {
			dispatch(
				postAdded(post));
		}).
		catch(console.error);
};

export function postAdded(post) {
	return {
		type: POST_ADDED,
		post
	};
}

export const updatePost = ({ id, title, body }) => dispatch => {
	fetch(`http://${api}/posts/${id}`,
		{
			headers: jsonHeaders,
			method: 'PUT',
			body: JSON.stringify({ title, body })
		}).
		then(res => {
			if (res.ok)
				return res.json();

			throw new Error(res);
		}).
		then(post => {
			dispatch(
				postUpdated(
					post));
		}).
		catch(console.error);
};

export function postUpdated(post) {
	return {
		type: POST_UPDATED,
		post
	};
}

export const deletePost = (id) => dispatch => {
	fetch(`http://${api}/posts/${id}`,
		{
			headers: headers,
			method: 'DELETE'
		}).
		then(res => {
			if (res.ok)
				return res.json();

			throw new Error(res);
		}).
		then(() => { // TODO: should we dispatch deletions for all child comments, so the post & comment reducers don't mix ???
			dispatch(
				postDeleted(
					id));
		}).
		catch(console.error);
};

export function postDeleted(id) {
	return {
		type: POST_DELETED,
		id
	};
}

const vote = (id, option, dispatch) => {
	fetch(`http://${api}/posts/${id}`,
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

			throw new Error(res);
		}).
		then(post => {
			dispatch(
				postVotesUpdated(
					post));
		}).
		catch(console.error);
};

export function postVotesUpdated(post) {
	return {
		type: POST_VOTES_UPDATED,
		id: post.id,
		voteScore: post.voteScore
	};
}

export const votePostUp = (id) => dispatch => {
	vote(id, 'upVote', dispatch);
};

export const votePostDown = (id) => dispatch => {
	vote(id, 'downVote', dispatch);
};
