import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const getTimestamp = (dt = new Date()) => dt.getTime();

class PostEditForm extends Component {

	static propTypes = {
		isNew: PropTypes.bool,
		allCategories: PropTypes.array,

		post: PropTypes.object.isRequired,
		savePost: PropTypes.func.isRequired,
		cancelEditPost: PropTypes.func.isRequired,
	};

	state = {
		isEditing: false
	};

	onChange = (event) => {
		// https://reactjs.org/docs/forms.html
		const target = event.target || {};
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[target.name]: value
		});
	};

	onSubmit = (event) => {

		const { post, savePost } = this.props;
		const { category, author, title, body } = this.state;

		savePost({
			...post,
			category: category || post.category,
			author: author || post.author,
			title: title || post.title,
			body: body || post.body,
			timestamp: getTimestamp()
		});

		event.preventDefault();
	};

	render() {
		const { isNew, allCategories, post } = this.props;
		const { cancelEditPost } = this.props;

		return (
			<form onSubmit={this.onSubmit}>

				{isNew && (
				<div>

				<div>
					<label htmlFor='category'>Category</label>
					<select id='category' name='category' defaultValue={post.category} onChange={this.onChange}>
						{allCategories.map(category =>
							<option key={category.path} value={category.path} >
								{category.name}
							</option>
						)}
					</select>
				</div>

				<div>
					<label htmlFor='author'>author</label>
					<input id='author' type='text' name='author' defaultValue={post.author} onChange={this.onChange} />
				</div>

				</div>
				)}

				<div>
					<label htmlFor='title'>Title</label>
					<input id='title' type='text' name='title' defaultValue={post.title} onChange={this.onChange} />
				</div>

				<div>
					<label htmlFor='body'>Content</label>
					<textarea id='body' name='body' defaultValue={post.body} onChange={this.onChange} />
				</div>

				<button onClick={cancelEditPost}>cancel</button>

				<button type='submit'>save</button>

			</form>
		);
	}
}

export default PostEditForm;
