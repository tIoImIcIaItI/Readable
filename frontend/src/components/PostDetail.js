import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Button from 'muicss/lib/react/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { fetchPostById, updatePost, deletePost } from '../actions/posts';
import CommentsList from './CommentsList';
import VoteScore from './VoteScore';
import { votePostUp, votePostDown } from '../actions/posts';
import PostEditForm from './PostEditForm';

const authorTag = (entity) => ((entity.author || '')[0] || '').toUpperCase();

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
		const timestamp = post.timestamp ? moment(post.timestamp).fromNow() : '';
		const tag = authorTag(post);

		return (
			<article className='post-detail-container'>

				<header>
					<h2>{post.title}</h2>

					<div className='post-subheader'>
						<div className='post-author-widget'>
							<span className='post-author-tag author-tag'>{tag}</span>
							<span className='post-author-name'>{post.author}</span>
						</div>

						<div className='post-ts'>{timestamp}</div>
					</div>

					{/*<div>{post.category}</div>*/}
				</header>

				{isEditing ? (
					<PostEditForm
						allCategories={allCategories}
						post={post}
						savePost={this.savePost}
						cancelEditPost={this.cancelEditPost} />
				) : (
					<div>
						<div className='post-content'>

							<VoteScore
								direction='column'
								score={post.voteScore}
								voteUp={() => voteUp(post.id)}
								voteDown={() => voteDown(post.id)} />

							<div className='post-body'>{post.body}</div>

							<div className='post-toolbar'>
								<Button onClick={this.editPost}>
									<FontAwesomeIcon icon='pencil-alt' />
									<span className='sr-only'>edit post</span>
								</Button>

								<Button onClick={() => deletePost(post.id)}>
									<FontAwesomeIcon icon='trash-alt' />
									<span className='sr-only'>delete post</span>
								</Button>
							</div>

						</div>

						<CommentsList
							postId={id} />
					</div>
				)}

			</article>
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
