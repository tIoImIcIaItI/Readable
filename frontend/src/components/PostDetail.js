import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchPostById, updatePost, deletePost } from '../actions/posts';
import CommentsList from './CommentsList';

// TODO: Posts and comments, in all views where they are displayed, 
// should display their current score and should have controls to increment or decrement the voteScore for the object. 
// Posts should display the number of comments associated with the post.

class PostDetail extends Component {

	static propTypes = {
		//postId: PropTypes.string.isRequired
	};

	state = {
		isEditing: false
	};

	editPost = () => {
		// TODO
		this.setState({
			isEditing: true
		});
	};

	deletePost = (id) => {
		// TODO
		this.props.deletePost(id);
	};	

	componentWillMount() {
		const id = this.props.match ? this.props.match.params.id : -1;
		this.props.fetchPostById(id);
	}

	render() {
		const id = this.props.match ? this.props.match.params.id : -1;
		const post = this.props.post;
		return (
			<div>
				<h2>Post</h2>

				{this.state.isEditing ? 'editing' : 'not editing'}

				<div>{post.id}</div>
				<div>{post.title}</div>
				<div>{post.body}</div>
				<div>{post.author}</div>
				<div>{post.category}</div>
				<div>{post.voteScore}</div>
				<div>{post.timestamp}</div>

				<button
					onClick={this.editPost}>edit</button>

				<button
					onClick={this.deletePost}>delete</button>

				<CommentsList
					postId={id} />

			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		post: (state.post || {})
	}
};

const mapDispatchToProps = {
	fetchPostById, updatePost, deletePost
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(PostDetail);
