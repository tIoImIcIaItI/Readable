/*eslint dot-location: ["error", "object"]*/
import { api, headers } from '../config';

export const POSTS_LOADED = 'POSTS_LOADED';
export const POSTS_ADD = 'POSTS_ADD';
export const POST_ADDED = 'POST_ADDED';
export const POSTS_DELETE = 'POSTS_DELETE';
export const POST_DELETED = 'POST_DELETED';
export const POST_UPDATE = 'POST_UPDATE';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_VOTES_UPDATED = 'POST_VOTES_UPDATED';
export const POST_LOADED = 'POST_LOADED';

export const fetchPosts = () => dispatch => (
	fetch(`http://${api}/posts`,
		{
			headers: headers
		}).
		then(res => {
			if (res.ok)
				return res.json();

			console.log(res);
			throw new Error('TODO');
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

export function postLoaded(post) {
	return {
		type: POST_LOADED,
		post
	};
}

export const fetchPostById = (postId) => dispatch => {
	fetch(`http://${api}/posts/${postId}`,
		{
			headers: headers
		}).
		then(res => {
			if (res.ok)
				return res.json();

			console.log(res);
			throw new Error('TODO');
		}).
		then(json => {
			dispatch(
				postLoaded(
					json));
		}).
		catch(console.error)
};

export const addPost = (id, timestamp, title, body, author, category) => dispatch => {
	fetch(`http://${api}/posts/`,
		{
			headers: headers,
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
				postAdded(
					id));
		}).
		catch(console.error)
}

export function postAdded(id) {
	return {
		type: POST_ADDED,
		id
	};
}

export const updatePost = (post) => dispatch => {
	fetch(`http://${api}/posts/${post.id}`,
		{
			headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify(post)
		}).
		then(res => {
			 if (res.ok)
				  return res.json();
				  
			 // throw new Error('TODO');
		}).
		then(post => {
			dispatch(
				postUpdated(
					post));
		}).
		catch(console.error)
}

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

			throw new Error('TODO');
		}).
		then(_ => { // TODO: should we dispatch deletions for all child comments, so the post & comment reducers don't mix ???
			dispatch(
				postDeleted(
					id));
		}).
		catch(console.error)
}

export function postDeleted(id) {
	return {
		type: POST_DELETED,
		id
	};
}

const vote = (id, option, dispatch) => {
	fetch(`http://${api}/posts/${id}`,
		{
			headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({
				option
			})
		}).
		then(res => {
			if (res.ok)
				return res.json();

			console.log(res);
			// throw new Error('TODO');
		}).
		then(post => {
			dispatch(
				postVotesUpdated(
					post));
		}).
		catch(console.error)
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
