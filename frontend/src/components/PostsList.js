/*eslint dot-location: ["error", "object"]*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostsSortSelector from './PostsSortSelector';

const orderBy = (arr, prop) => (arr || []).sort((x, y) => x[prop] - y[prop]);
const orderByDescending = (arr, prop) => (arr || []).sort((x, y) => y[prop] - x[prop]);
const sortBy = (arr, prop, ascending) => ascending ? orderBy(arr, prop) : orderByDescending(arr, prop);
const filterBy = (arr, prop, value) => (arr || []).filter(x => !value || x[prop] === value);

// TODO: Posts and comments, in all views where they are displayed, 
// should display their current score and should have controls to increment or decrement the voteScore for the object. 
// Posts should display the number of comments associated with the post.

class PostsList extends Component {

	state = {
		sortField: 'timestamp',
		sortAscending: true,
		sortCriteria: [
			{
				label: 'Date',
				field: 'timestamp',
			},
			{
				label: 'Score',
				field: 'voteScore'
			},
		]
	};

	filterByCategory = (posts, category) => filterBy(posts, 'category', category);

	sortPosts = (field, ascending) => {
		this.setState({
			sortField: field,
			sortAscending: ascending
		});
	};

	createNewPost = () => {
		// TODO: 
	};

	render() {
		const selectedCategory =
			this.props.match ? this.props.match.params.category : null;

		const posts =
			sortBy(
				this.filterByCategory(this.props.posts, selectedCategory),
				this.state.sortField, this.state.sortAscending);

		return (
			<div>
				<h2>Posts</h2>				

				<PostsSortSelector
					criteria={this.state.sortCriteria}
					setSort={this.sortPosts} />

				<button
					onClick={this.createNewPost}>new post</button>

				<ul>
					{posts.map(post =>
						<li key={post.id}>
							<Link to={`/posts/${post.id}`}>{post.title}</Link>
							<span>{new Date(post.timestamp).toString()}</span>
							<p>{post.voteScore}</p>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: state.allPosts
	}
};

export default connect(
	mapStateToProps
)(PostsList);

