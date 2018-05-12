/*eslint dot-location: ["error", "object"]*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { addPost } from '../actions/posts';
import PostsSortSelector from './PostsSortSelector';
import PostListItem from './PostListItem';
import PostEditForm from './PostEditForm';

const orderBy = (arr, prop) => (arr || []).sort((x, y) => x[prop] - y[prop]);
const orderByDescending = (arr, prop) => (arr || []).sort((x, y) => y[prop] - x[prop]);
const sortBy = (arr, prop, ascending) => ascending ? orderBy(arr, prop) : orderByDescending(arr, prop);
const filterBy = (arr, prop, value) => (arr || []).filter(x => !value || x[prop] === value);

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
		],
		isCreatingPost: false
	};

	filterByCategory = (posts, category) => filterBy(posts, 'category', category);

	sortPosts = (field, ascending) => {
		this.setState({
			sortField: field,
			sortAscending: ascending
		});
	};

	newEntity = () => ({
		id: uuidv1(),
		category: 'udacity', // TODO: 
		author: '',
		title: '',
		body: ''
	});

	createNewEntity = () => {
		this.setState({
			isCreatingEntity: true
		});
	};

	saveNewEntity = (post) => {

		this.props.addPost(post);

		this.setState({
			isCreatingEntity: false
		});
	};

	cancelNewEntity = () => {
		this.setState({
			isCreatingEntity: false
		});
	};

	deleteEntity = (id) => {
		this.props.deletePost(id);
	};

	render() {

		const { isCreatingEntity, sortField, sortAscending } = this.state;
		const { match, posts, allCategories } = this.props;

		const selectedCategory = match ? match.params.category : null;

		// TODO: fetch posts by category or all, herein
		const postsToDisplay = sortBy(
			this.filterByCategory(posts, selectedCategory),
			sortField, sortAscending);

		return (
			<div>
				<h2>Posts</h2>

				<PostsSortSelector
					criteria={this.state.sortCriteria}
					setSort={this.sortPosts} />

				{isCreatingEntity ? (
					<PostEditForm
						isNew={true}
						allCategories={allCategories}
						post={this.newEntity()}
						savePost={this.saveNewEntity}
						cancelEditPost={this.cancelNewEntity} />
				) : (
						<button
							onClick={this.createNewEntity}>new post</button>
					)}

				<ul>
					{postsToDisplay.map(post =>
						<li key={post.id}>
							<PostListItem
								post={post} />
						</li>
					)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		allCategories: (state.allCategories || []),
		posts: (state.allPosts || [])
	}
};

const mapDispatchToProps = {
	addPost
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(PostsList);

