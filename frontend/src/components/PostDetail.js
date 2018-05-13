import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostById, updatePost, deletePost } from '../actions/posts';
import CommentsList from './CommentsList';
import VoteScore from './VoteScore';
import { votePostUp, votePostDown } from '../actions/posts';
import PostEditForm from './PostEditForm';

class PostDetail extends Component {

	state = {
		isEditing: false,
		redirect: false
	};

	editPost = () => {
		this.setState({
			isEditing: true
		});
	};

	savePost = (post) => {
		this.props.updatePost(post);

		this.setState({
			isEditing: false
		});
	};

	cancelEditPost = () => {
		this.setState({
			isEditing: false
		});
	};

	deletePost = (id) => {
		this.props.deletePost(id);

		this.setState({
			isEditing: false,
			redirect: '/'
		});
	};

	componentWillMount() {
		const { match, fetchPostById } = this.props;

		const id = match ? match.params.id : -1;

		fetchPostById(id);
	}

	render() {

		if (this.state.redirect)
			return <Redirect to={this.state.redirect} />

		const { post } = this.props;

		if (post.id === undefined)
			return (<div>...</div>);

		if (post.deleted)
			return <Redirect to='/app/error/not-found' />

		if (post.error)
			return (<div>An error occurred fetching the requested content</div>);

		const { isEditing } = this.state;
		const { allCategories, voteUp, voteDown } = this.props;

		const id = this.props.match ? this.props.match.params.id : -1;
		const timestamp = post.timestamp ? new Date(post.timestamp).toString() : '';

		return (
			<div>
				<h2>{post.title}</h2>

				<div>{post.author}</div>

				<div>{timestamp}</div>

				<div>{post.category}</div>

				{isEditing ? (
					<PostEditForm
						allCategories={allCategories}
						post={post}
						savePost={this.savePost}
						cancelEditPost={this.cancelEditPost} />
				) : (
						<div>
							<div>{post.title}</div>
							<div>{post.body}</div>

							<button onClick={this.editPost}>edit post</button>

							<button onClick={() => this.deletePost(post.id)}>delete post</button>
						</div>
					)}

				{/*<div>{post.id}</div>
				<div>{post.voteScore}</div>*/}

				<VoteScore
					score={post.voteScore}
					voteUp={() => voteUp(post.id)}
					voteDown={() => voteDown(post.id)} />

				< CommentsList
					postId={id} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		post: (state.post || {}),
		allCategories: (state.allCategories || [])
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
