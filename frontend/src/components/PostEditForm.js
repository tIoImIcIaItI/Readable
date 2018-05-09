import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchPostById, updatePost, deletePost } from '../actions/posts';
// import CommentsList from './CommentsList';
// import VoteScore from './VoteScore';
// import { votePostUp, votePostDown } from '../actions/posts';

class PostEditForm extends Component {

	state = {
		isEditing: false
	};

	render() {
		// const id = this.props.match ? this.props.match.params.id : -1;
		const {post, savePost, cancelEditPost} = this.props;

		return (
			<div>
				
                <div>
                    <input type='text' value={post.title} />
                    
                    <input type='text' value={post.body} />
                </div>

				<button
					onClick={savePost}>save</button>

				<button
					onClick={cancelEditPost}>cancel</button>

			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// post: (state.post || {})
	}
};

const mapDispatchToProps = {
	// cancelEditPost, savePost
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(PostEditForm);
