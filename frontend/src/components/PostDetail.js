import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PostDetail extends Component {

	static propTypes = {
		allPosts: PropTypes.array.isRequired
	};

	render() {
		const id = this.props.match ? this.props.match.params.id : -1;
		const posts = this.props.allPosts.filter(p => p.id === id);
		const post = posts && posts.length > 0 ? posts[0] : {};
		return (
			<p>PostDetail - {post.title}
			</p>
		);
	}
}

const mapStateToProps = state => {
	return {
		allPosts: state.allPosts || []
	}
};

export default connect(
	mapStateToProps
)(PostDetail);
