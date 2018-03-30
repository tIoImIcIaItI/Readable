import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VoteScore from './VoteScore';
import { voteCommentUp, voteCommentDown } from '../actions/comments';

class CommentDetail extends Component {

	static propTypes = {
		comment: PropTypes.object.isRequired,
		deleteComment: PropTypes.func.isRequired
	};

	state = {
		isEditing: false
	};

	editComment = () => {
		this.setState({
			isEditing: true
		});
	};

	render() {

		const comment = this.props.comment;

		return (
			<div>
				<h4>Comment</h4>

				{this.state.isEditing ? 'editing' : 'not editing'}

				<div>{comment.id}</div>
				<div>{comment.parentId}</div>
				<div>{comment.timestamp}</div>
				<div>{comment.body}</div>
				<div>{comment.author}</div>


				<VoteScore
					score={comment.voteScore}
					voteUp={this.props.voteUp}
					voteDown={this.props.voteDown} />
				<button
					onClick={this.editComment}>edit</button>

				<button
					onClick={this.props.deleteComment}>delete</button>

			</div>
		);
	}
}

const mapDispatchToProps = {
	voteUp: voteCommentUp,
	voteDown: voteCommentDown
};

export default connect(
	null, mapDispatchToProps
)(CommentDetail);
