import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { votePostUp, votePostDown, deletePost } from '../actions/posts';
import VoteScore from './VoteScore';
import CommentsCount from './CommentsCount';

class PostListItem extends Component {

	static propTypes = {
		post: PropTypes.object.isRequired
	};

	render() {
		const { post, voteUp, voteDown, deletePost } = this.props;

		return (
			<div>
				<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
				<div>{post.author}</div>
				<div>{new Date(post.timestamp).toString()}</div>

				<CommentsCount
					postId={post.id} />

				<VoteScore
					score={post.voteScore}
					voteUp={voteUp}
					voteDown={voteDown} />

				<button>
					TODO: edit post
				</button>

				<button
					onClick={deletePost}>
					delete post
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = {
	voteUp: votePostUp,
	voteDown: votePostDown,
	deletePost
};

export default connect(
	null, mapDispatchToProps
)(PostListItem);
