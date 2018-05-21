import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Panel from 'muicss/lib/react/panel';
import moment from 'moment';
import Button from 'muicss/lib/react/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { votePostUp, votePostDown, updatePost, deletePost } from '../actions/posts';
import VoteScore from './VoteScore';
import CommentsCount from './CommentsCount';
import PostEditForm from './PostEditForm';
import Stat from './Stat';

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
		const body = (post.body || '').substring(0, 160) + '...';

		return isEditingPost ? (
			<PostEditForm
				allCategories={allCategories}
				post={post}
				savePost={this.savePost}
				cancelEditPost={this.cancelEditPost} />
			) : (
			<Panel>
				<article className='post-item-container'>

					<header className='post-item-header'>

						<h1><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h1>

						<div>
							<Button onClick={this.editPost} variant='flat'>
								<FontAwesomeIcon icon='pencil-alt' />
								<span className='sr-only'>edit post</span>
							</Button>

							<Button onClick={() => deletePost(post.id)} variant='flat'>
								<FontAwesomeIcon icon='trash-alt' />
								<span className='sr-only'>delete post</span>
							</Button>
						</div>

					</header>

					<div className='post-summary'>
						<Stat
							label='author'
							icon='user'
							value={post.author}
							direction='column-reverse'
							display={{ icon: true, label: false }}
						/>

						<Stat
							label='edited'
							icon='calendar'
							value={timestamp}
							direction='column-reverse'
							display={{ icon: true, label: false }}
						/>

						<CommentsCount
							postId={post.id} />
					</div>

					<span className='post-body-preview'>{body}</span>

					<VoteScore
						score={post.voteScore}
						voteUp={() => voteUp(post.id)}
						voteDown={() => voteDown(post.id)} />

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
