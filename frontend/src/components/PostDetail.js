import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostById, updatePost, deletePost } from '../actions/posts';
import CommentsList from './CommentsList';
import VoteScore from './VoteScore';
import { votePostUp, votePostDown } from '../actions/posts';
import PostEditForm from './PostEditForm';

class PostDetail extends Component {

	state = {
		isEditing: false
	};

	editPost = () => {
		// TODO
		this.setState({
			isEditing: true
		});
	};

	cancelEditPost = () => {
		this.setState({
			isEditing: false
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

				<br/>
				{this.state.isEditing && 
					<PostEditForm 
						post={post}
						savePost={this.savePost}
						cancelEditPost={this.cancelEditPost}/>}
				<br/>

				<div>{post.id}</div>
				<div>{post.title}</div>
				<div>{post.body}</div>
				<div>{post.author}</div>
				<div>{post.category}</div>
				<div>{post.voteScore}</div>
				<div>{post.timestamp}</div>

				<VoteScore
					score={post.voteScore}
					voteUp={this.props.voteUp}
					voteDown={this.props.voteDown} />

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
	fetchPostById, updatePost, deletePost,
	voteUp: votePostUp,
	voteDown: votePostDown
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(PostDetail);
