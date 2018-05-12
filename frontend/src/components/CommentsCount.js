import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { countCommentsForPost } from '../actions/comments';

class CommentsCount extends Component {

	static propTypes = {
		postId: PropTypes.string.isRequired
	};

	componentWillMount() {
		const { countCommentsForPost, postId } = this.props;

		countCommentsForPost(
			postId);
	}

	render() {
		const count =
			this.props.commentCounts[this.props.postId] || 0;

		return (
			<div>
				CommentsCount: {count}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		commentCounts: (state.commentCounts || {})
	}
};

const mapDispatchToProps = {
	countCommentsForPost
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(CommentsCount);
