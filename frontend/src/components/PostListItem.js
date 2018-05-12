import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { votePostUp, votePostDown, updatePost, deletePost } from '../actions/posts';
import VoteScore from './VoteScore';
import CommentsCount from './CommentsCount';
import PostEditForm from './PostEditForm';

class PostListItem extends Component {

	static propTypes = {
		post: PropTypes.object.isRequired
	};

	state = {
		isEditingPost: false
	};

	editPost = () => {
		this.setState({
			isEditingPost: true
		});
	};

	savePost = (post) => {
		this.props.updatePost(post);

		this.setState({
			isEditingPost: false
		});
	};
	
	cancelEditPost = () => {
		this.setState({
			isEditingPost: false
		});
	};

	render() {

		const { isEditingPost } = this.state;
		const { post, allCategories, voteUp, voteDown, deletePost } = this.props;

		return isEditingPost ? (
			<div>
				<PostEditForm
					allCategories={allCategories}
					post={post}
					savePost={this.savePost}
					cancelEditPost={this.cancelEditPost} />
			</div>
			) : (
			<div>
				<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>

				<div>{post.author}</div>
				<div>{new Date(post.timestamp).toString()}</div>

				<CommentsCount
					postId={post.id} />

				<VoteScore
					score={post.voteScore}
					voteUp={() => voteUp(post.id)}
					voteDown={() => voteDown(post.id)} />

				<button onClick={this.editPost}>
					edit post
				</button>

				<button
					onClick={() => deletePost(post.id)}>delete post
				</button>
				
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		allCategories: (state.allCategories || [])
	}
};

const mapDispatchToProps = {
	voteUp: votePostUp,
	voteDown: votePostDown,
	updatePost, deletePost
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(PostListItem);
