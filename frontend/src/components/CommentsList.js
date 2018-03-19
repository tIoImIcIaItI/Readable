import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCommentsForPost, addComment, deleteComment, updateComment } from '../actions/comments';
import CommentDetail from './CommentDetail';

// TODO: Posts and comments, in all views where they are displayed, 
// should display their current score and should have controls to increment or decrement the voteScore for the object. 
// Posts should display the number of comments associated with the post.

class CommentsList extends Component {

	static propTypes = {
		postId: PropTypes.string.isRequired
	};

	componentWillMount() {
		console.log(this.props.postId);
		this.props.fetchCommentsForPost(this.props.postId);
	}

	addComment = () => {
		// TODO: 
	};

	deleteComment = (id) => {
// TODO: 
		this.props.deleteComment(id);
	};

	render() {

		const comments = this.props.comments;

		return (
			<div>
				<h3>Comments</h3>

				<button
					onClick={this.addComment}>add</button>

				<ul>
					{comments.map(comment => (
						<li key={comment.id}>
							<CommentDetail 
								comment={comment} 
								deleteComment={this.deleteComment}/>
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
	fetchCommentsForPost, addComment, updateComment, deleteComment
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(CommentsList);
