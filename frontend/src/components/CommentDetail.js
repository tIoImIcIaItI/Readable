import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import VoteScore from './VoteScore';
import CommentEditForm from './CommentEditForm';
import { updateComment, deleteComment, voteCommentUp, voteCommentDown } from '../actions/comments';

const authorTag = (entity) => ((entity.author || '')[0] || '').toUpperCase();

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

		const { comment } = this.props;

		if (comment.id === undefined)
			return (<div>...</div>);

		const { isEditing } = this.state;
		const { voteUp, voteDown, deleteComment } = this.props;

		const timestamp = comment.timestamp ? moment(comment.timestamp).fromNow() : '';
		const tag = authorTag(comment);

		return (
			<article className='comment'>
				{/*<h2>Comment</h2>*/}

				{isEditing ? (
					<CommentEditForm
						comment={comment}
						saveComment={this.saveComment}
						cancelEditComment={this.cancelEditComment} />
				) : (
					<div>
						<div className='comment-subheader'>
							<div className='comment-author-widget'>
								<span className='comment-author-tag'>{tag}</span>
								<span className='comment-author-name'>{comment.author}</span>
							</div>

							<div className='comment-ts'>{timestamp}</div>
						</div>

						<div>{comment.body}</div>

						<button onClick={this.editComment}>
							<FontAwesomeIcon icon='pencil-alt' />
							<span className='sr-only'>edit comment</span>
						</button>

						<button onClick={() => deleteComment(comment.id)}>
							<FontAwesomeIcon icon='trash-alt' />
							<span className='sr-only'>delete comment</span>
						</button>

						<VoteScore
							score={comment.voteScore}
							voteUp={() => voteUp(comment.id)}
							voteDown={() => voteDown(comment.id)} />

					</div>
				)}

			</article>
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
