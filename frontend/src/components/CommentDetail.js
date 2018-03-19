import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: Posts and comments, in all views where they are displayed, 
// should display their current score and should have controls to increment or decrement the voteScore for the object. 

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

				<button
					onClick={this.editComment}>edit</button>

				<button
					onClick={this.props.deleteComment}>delete</button>

			</div>
		);
	}
}

export default CommentDetail;