import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { countCommentsForPost } from '../actions/comments';
import Stat from './Stat';

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

		const { postId, commentCounts } = this.props;
		const count = commentCounts[postId] || 0;

		return (
			<Stat 
				icon='comments'
				label={count !== 1 ? 'comments' : 'comment'}
				value={count}
				direction='column-reverse'
				display={{icon: true, label: false}} />
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
