import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostById, updatePost, deletePost } from '../actions/posts';
import CommentsList from './CommentsList';
import VoteScore from './VoteScore';
import { votePostUp, votePostDown } from '../actions/posts';
import PostEditForm from './PostEditForm';

class PostDetail extends Component {

	state = {
		isEditingPost: false
	};

	editPost = () => {
		this.setState({
			isEditingPost: true
		});
	};

	savePost = (post) => {
		console.log(post);

		this.props.updatePost(post);

		// TODO: save to db
		this.setState({
			isEditingPost: false
		});
	};

	cancelEditPost = () => {
		this.setState({
			isEditingPost: false
		});
	};

	deletePost = (id) => {
		// TODO: delete from db
		this.props.deletePost(id);
	};

	componentWillMount() {
		const id = this.props.match ? this.props.match.params.id : -1;
		this.props.fetchPostById(id);
	}

	render() {
		const id = this.props.match ? this.props.match.params.id : -1;
		const { /*allCategories,*/ post } = this.props;
		const timestamp = post.timestamp ? new Date(post.timestamp).toString() : '';

		return (
			this.state.isEditingPost ?
				(
					<PostEditForm
						/*allCategories={allCategories}*/
						post={post}
						savePost={this.savePost}
						cancelEditPost={this.cancelEditPost} />
				) : (
					<div>
						<h2>{post.title}</h2>

						<div>{post.id}</div>
						<div>{post.title}</div>
						<div>{post.body}</div>
						<div>{post.author}</div>
						<div>{post.category}</div>
						<div>{post.voteScore}</div>
						<div>{timestamp}</div>

						<VoteScore
							score={post.voteScore}
							voteUp={() => this.props.voteUp(post.id)}
							voteDown={() => this.props.voteDown(post.id)} />

						<button
							onClick={this.editPost}>edit</button>

						<button
							onClick={this.deletePost}>delete</button>

						<CommentsList
							postId={id} />
					</div>
				)
		);
	}
}

const mapStateToProps = state => {
	return {
		post: (state.post || {})//,
		//allCategories: (state.allCategories || [])
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
