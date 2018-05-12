import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import { fetchCommentsForPost, addComment, deleteComment, updateComment } from '../actions/comments';
import CommentsCount from './CommentsCount';
import CommentDetail from './CommentDetail';
import CommentEditForm from './CommentEditForm';

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

		return (
			<div>
				<h3>Comments</h3>

				<CommentsCount
					postId={postId} />

				{isCreatingEntity ? (
				<CommentEditForm
					isNew={true}
					comment={this.newEntity(postId)}
					saveComment={this.saveNewEntity}
					cancelEditComment={this.cancelNewEntity} />
				) : (
				<button
					onClick={this.createNewEntity}>new comment</button>
				)}

				<ul>
					{comments.map(comment => (
						<li key={comment.id}>
							<CommentDetail
								comment={comment} />
						</li>
					))}
				</ul>

			</div>
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
