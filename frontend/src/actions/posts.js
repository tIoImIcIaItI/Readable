/*eslint dot-location: ["error", "object"]*/
export const POSTS_LOADED = 'POSTS_LOADED';
export const POSTS_ADD = 'POSTS_ADD';
export const POST_ADDED = 'POST_ADDED';
export const POSTS_DELETE = 'POSTS_DELETE';
export const POST_DELETED = 'POST_DELETED';
export const POST_UPDATE = 'POST_UPDATE';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_LOADED = 'POST_LOADED';

export const fetchPosts = () => dispatch => (
	fetch('http://127.0.0.1:3001/posts',
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
	fetch(`http://127.0.0.1:3001/posts/${postId}`,
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
				postLoaded(
					json));
		}).
		catch(console.error)
};

export const addPost = (id, timestamp, title, body, author, category) => dispatch => {
	fetch('http://127.0.0.1:3001/posts/',
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
	fetch(`http://127.0.0.1:3001/posts/${post.id}`,
		{
			headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify(post)
		}).
		then(res => {
			console.log(res);
			 if (res.ok)
			 {
				 // fetchPostById(id);
				 const post = res.json();
				 console.log(post);
				 return post;
			 }
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
	fetch(`http://127.0.0.1:3001/posts/${id}`,
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
	fetch(`http://127.0.0.1:3001/posts/${id}`,
		{
			headers: { 'Authorization': 'whatever-you-want' },
			method: 'POST',
			body: {} // TODO: option 
		}).
		then(res => {
			// if (res.ok)
			// 	return res.json();

			console.log(res);
			// throw new Error('TODO');
		}).
		then(_ => {
			dispatch(
				postUpdated(
					id));
		}).
		catch(console.error)
};

export const votePostUp = (id) => dispatch => {
	vote(id, 'downVote', dispatch);
};

export const votePostDown = (id) => dispatch => {
	vote(id, 'upVote', dispatch);
};
