import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import { Button } from 'muicss/react';
import { getTimestamp, notEmpty, setPropertyFromEitherOf, isValid } from '../formUtils';

class CommentEditForm extends Component {

	static propTypes = {
		isNew: PropTypes.bool,
		comment: PropTypes.object.isRequired,
		saveComment: PropTypes.func.isRequired,
		cancelEditComment: PropTypes.func.isRequired,
	};

	state = {
		isValid: false
	};

	formFields = [
		{ name: 'author', rule: notEmpty },
		{ name: 'body', rule: notEmpty }
	];

	componentWillMount() {

		// Ensure we copy any existing form field values into our state,
		// to simplify validation and submission logic

		const copyFieldFromStateOrProp = (obj, name) => 
			setPropertyFromEitherOf(
				obj, name, this.state, this.props.comment);

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

		const { comment, saveComment } = this.props;
		const { author, body } = this.state;

		saveComment({
			...comment,
			author,	body,
			timestamp: getTimestamp()
		});

		event.preventDefault();
	};

	render() {

		const { isNew, comment, cancelEditComment } = this.props;

		const isNotValid = !isValid(this.formFields, this.state);

		return (
			<Form onSubmit={this.onSubmit} className='form-inline'>

				{isNew && (
					<div>
						<label htmlFor='author'>Author</label>
						<Input placeholder='author' id='author' type='text' name='author' 
							defaultValue={comment.author} onChange={this.onChange} />
					</div>
				)}

				<div>
					<label htmlFor='body'>Comment</label>
					<Textarea placeholder='comment' id='body' name='body' 
						defaultValue={comment.body} onChange={this.onChange} />
				</div>

				<Button variant='flat'
					onClick={cancelEditComment}>
					<span >cancel</span>
				</Button>

				<Button variant='raised' color="primary" disabled={isNotValid} type='submit'>
					<span >save</span>
				</Button>

			</Form>
		);
	}
}

export default CommentEditForm;
