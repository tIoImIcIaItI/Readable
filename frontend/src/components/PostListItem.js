import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Panel from 'muicss/lib/react/panel';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
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
		const timestamp = post.timestamp ? moment(post.timestamp).fromNow() : '';

		return isEditingPost ? (
			<PostEditForm
				allCategories={allCategories}
				post={post}
				savePost={this.savePost}
				cancelEditPost={this.cancelEditPost} />
			) : (
				<Panel>
					<article className='post-item-container'>
						<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>

						<div>{post.author}</div>

						<div className='post-ts'>{timestamp}</div>

						<CommentsCount
							postId={post.id} />

						<VoteScore
							score={post.voteScore}
							voteUp={() => voteUp(post.id)}
							voteDown={() => voteDown(post.id)} />

						<button onClick={this.editPost}>
							<FontAwesomeIcon icon='pencil-alt' />
							<span className='sr-only'>edit post</span>
						</button>

						<button onClick={() => deletePost(post.id)}>
							<FontAwesomeIcon icon='trash-alt' />
							<span className='sr-only'>delete post</span>
						</button>

					</article>
				</Panel>
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
