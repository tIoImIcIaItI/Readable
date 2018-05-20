import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import uuidv1 from 'uuid/v1';
import { fetchCommentsForPost, addComment, deleteComment, updateComment } from '../actions/comments';
import CommentsCount from './CommentsCount';
import CommentDetail from './CommentDetail';
import CommentEditForm from './CommentEditForm';
import Stat from './Stat';

class CommentsList extends Component {

	static propTypes = {
		postId: PropTypes.string.isRequired
	};

	state = {
		isCreatingPost: false
	};

	componentWillMount() {
		const { fetchCommentsForPost, postId } = this.props;

		fetchCommentsForPost(
			postId);
	}

	newEntity = (postId) => ({
		id: uuidv1(),
		parentId: postId,
		author: '',
		body: ''
	});

	createNewEntity = () => {
		this.setState({
			isCreatingEntity: true
		});
	};

	saveNewEntity = (post) => {

		this.props.addComment(post);

		this.setState({
			isCreatingEntity: false
		});
	};

	cancelNewEntity = () => {
		this.setState({
			isCreatingEntity: false
		});
	};

	deleteEntity = (id) => {
		this.props.deleteComment(id);
	};

	render() {

		const { isCreatingEntity } = this.state;
		const { postId, comments } = this.props;

		const sortedComments = comments.slice().sort((a,b) => b.timestamp - a.timestamp);
		const authorCount = [...new Set(comments.map(c => c.author))].length;

		return (
			<section className='comments-list-container'>

				<h1 className='sr-only'>Comments</h1>

				{isCreatingEntity ? (
					<CommentEditForm
						isNew={true}
						comment={this.newEntity(postId)}
						saveComment={this.saveNewEntity}
						cancelEditComment={this.cancelNewEntity} />
				) : (
					<div>
						<div className='comments-toolbar toolbar'>

							<CommentsCount
								postId={postId} />

							<Stat
								icon='users'
								label={authorCount !== 1 ? 'authors' : 'author'}
								value={authorCount} 
								direction='column-reverse'
								display={{icon: true, label: true}}/>

							<Button variant="fab" color="accent"
								onClick={this.createNewEntity}>
								<span aria-hidden>+</span>
								<span className='sr-only'>new comment</span>
							</Button>

						</div>

						<ul>
							{sortedComments.map(comment => (
								<li key={comment.id}>
									<CommentDetail
										comment={comment} />
								</li>
							))}
						</ul>
					</div>
				)}

			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		comments: (state.comments || []).filter(c => !c.deleted && !c.parentDeleted)
	}
};

const mapDispatchToProps = {
	fetchCommentsForPost,
	addComment, updateComment, deleteComment
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(CommentsList);
