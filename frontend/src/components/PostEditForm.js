/*eslint dot-location: ["error", "object"]*/
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import { Button } from 'muicss/react';
import { getTimestamp, notEmpty, setPropertyFromEitherOf, isValid } from '../formUtils';

class PostEditForm extends Component {

	static propTypes = {
		isNew: PropTypes.bool,
		allCategories: PropTypes.array,
		post: PropTypes.object.isRequired,
		savePost: PropTypes.func.isRequired,
		cancelEditPost: PropTypes.func.isRequired,
	};

	formFields = [
		{ name: 'category', rule: notEmpty },
		{ name: 'author', rule: notEmpty },
		{ name: 'title', rule: notEmpty },
		{ name: 'body', rule: notEmpty }
	];

	state = {
		isValid: false
	};

	componentWillMount() {

		// Ensure we copy any existing form field values into our state,
		// to simplify validation and submission logic

		const copyFieldFromStateOrProp = (obj, name) => 
			setPropertyFromEitherOf(
				obj, name, this.state, this.props.post);

		const newState = {};

		this.formFields.forEach(f => 
			copyFieldFromStateOrProp(newState, f.name));

		this.setState(newState);
	}

	onChange = (event) => {
		// https://reactjs.org/docs/forms.html
		const target = event.target || {};
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[target.name]: value,
			isValid: isValid(this.formFields, this.state)
		});
	};

	onSubmit = (event) => {

		const { post, savePost } = this.props;
		const { category, author, title, body } = this.state;

		savePost({
			...post,
			category, author, title, body,
			timestamp: getTimestamp()
		});

		event.preventDefault();
	};

	render() {

		const { isNew, allCategories, post, cancelEditPost } = this.props;

		const isNotValid = !isValid(this.formFields, this.state);

		return (
			<Form onSubmit={this.onSubmit} className='form-inline'>

				{isNew && (
					<div>

						<div>
							<label htmlFor='category'>Category</label>
							<Select id='category' name='category' placeholder='category' 
								defaultValue={post.category} onChange={this.onChange}>
								{allCategories.map(category =>
									<Option key={category.path} value={category.path} label={category.name} />
								)}
							</Select>
						</div>

						<div>
							<label htmlFor='author'>Author</label>
							<Input placeholder="author" id='author' type='text' name='author' 
								defaultValue={post.author} onChange={this.onChange} />
						</div>

					</div>
				)}

				<div>
					<label htmlFor='title'>Title</label>
					<Input placeholder="title" id='title' type='text' name='title' 
						defaultValue={post.title} onChange={this.onChange} />
				</div>

				<div>
					<label htmlFor='body'>Content</label>
					<Textarea placeholder="content" id='body' name='body' 
						defaultValue={post.body} onChange={this.onChange} />
				</div>

				<Button variant='flat' onClick={cancelEditPost}>
					<span >cancel</span>
				</Button>

				<Button variant='raised' color="primary" disabled={isNotValid} type='submit'>
					<span >save</span>
				</Button>

			</Form>
		);
	}
}

export default PostEditForm;
