import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VoteScore from './VoteScore';
import CommentEditForm from './CommentEditForm';
import { updateComment, deleteComment, voteCommentUp, voteCommentDown } from '../actions/comments';

class CommentDetail extends Component {

	static propTypes = {
		comment: PropTypes.object.isRequired
	};

	state = {
		isEditing: false
	};

	editComment = () => {
		this.setState({
			isEditing: true
		});
	};

	saveComment = (comment) => {

		this.props.updateComment(comment);

		this.setState({
			isEditing: false
		});
	};

	cancelEditComment = () => {
		this.setState({
			isEditing: false
		});
	};

	render() {

		const { isEditing } = this.state;
		const { comment, voteUp, voteDown, deleteComment } = this.props;
		const timestamp = comment.timestamp ? new Date(comment.timestamp).toString() : '';

		return (
			<div>
				<h4>Comment</h4>

				{/*<div>{comment.id}</div>
				<div>{comment.parentId}</div>
				<div>{comment.timestamp}</div>*/}

				<div>{comment.author}</div>
				<div>{timestamp}</div>

				{isEditing ? (
					<CommentEditForm
						comment={comment}
						saveComment={this.saveComment}
						cancelEditComment={this.cancelEditComment} />
				) : (
						<div>
							<div>{comment.body}</div>

							<button onClick={this.editComment}>edit</button>
							<button onClick={() => deleteComment(comment.id)}>delete</button>
						</div>
					)}

				<VoteScore
					score={comment.voteScore}
					voteUp={() => voteUp(comment.id)}
					voteDown={() => voteDown(comment.id)} />

			</div>
		);
	}
}

const mapDispatchToProps = {
	updateComment, deleteComment,
	voteUp: voteCommentUp,
	voteDown: voteCommentDown
};

export default connect(
	null, mapDispatchToProps
)(CommentDetail);
