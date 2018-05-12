import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCommentsForPost, addComment, deleteComment, updateComment } from '../actions/comments';
import CommentsCount from './CommentsCount';
import CommentDetail from './CommentDetail';

class CommentsList extends Component {

	static propTypes = {
		postId: PropTypes.string.isRequired
	};

	componentWillMount() {
		const { fetchCommentsForPost, postId } = this.props;

		fetchCommentsForPost(
			postId);
	}

	addComment = () => {
		// TODO: 
	};

	render() {

		const { postId, comments } = this.props;

		return (
			<div>
				<h3>Comments</h3>

				<CommentsCount
					postId={postId} />

				<button
					onClick={this.addComment}>add</button>

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
