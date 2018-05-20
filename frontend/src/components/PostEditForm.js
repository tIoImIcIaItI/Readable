import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import { Button } from 'muicss/react';

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
			<Form onSubmit={this.onSubmit} className='form-inline'>

				{isNew && (
					<div>

						<div>
							<label htmlFor='category'>Category</label>
							<Select id='category' name='category' defaultValue={post.category} onChange={this.onChange}>
								{allCategories.map(category =>
									<Option key={category.path} value={category.path} label={category.name} />
								)}
							</Select>
						</div>

						<div>
							<label htmlFor='author'>Author</label>
							<Input placeholder="author" id='author' type='text' name='author' defaultValue={post.author} onChange={this.onChange} />
						</div>

					</div>
				)}

				<div>
					<label htmlFor='title'>Title</label>
					<Input placeholder="title" id='title' type='text' name='title' defaultValue={post.title} onChange={this.onChange} />
				</div>

				<div>
					<label htmlFor='body'>Content</label>
					<Textarea placeholder="content" id='body' name='body' defaultValue={post.body} onChange={this.onChange} />
				</div>

				<Button variant='flat'
				onClick={cancelEditPost}>
					{/*<FontAwesomeIcon icon='ban' />*/}
					<span >cancel</span>
				</Button>

				<Button variant='raised' color="primary"
				type='submit'>
					{/*<FontAwesomeIcon icon='save' />*/}
					<span >save</span>
				</Button>

			</Form>
		);
	}
}

export default PostEditForm;
