import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button } from 'muicss/react';

const getTimestamp = (dt = new Date()) => dt.getTime();

class CommentEditForm extends Component {

	static propTypes = {
		isNew: PropTypes.bool,
		comment: PropTypes.object.isRequired,
		saveComment: PropTypes.func.isRequired,
		cancelEditComment: PropTypes.func.isRequired,
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

		const { comment, saveComment } = this.props;
		const { author, body } = this.state;

		saveComment({
			...comment,
			author: author || comment.author,
			body: body || comment.body,
			timestamp: getTimestamp()
		});

		event.preventDefault();
	};

	render() {

		const { isNew, comment } = this.props;
		const { cancelEditComment } = this.props;

		return (
			<Form onSubmit={this.onSubmit} className='form-inline'>

				{isNew && (
					<div>
						<label htmlFor='author'>Author</label>
						<Input placeholder='author' id='author' type='text' name='author' defaultValue={comment.author} onChange={this.onChange} />
					</div>
				)}

				<div>
					<label htmlFor='body'>Comment</label>
					<Textarea placeholder='comment' id='body' name='body' defaultValue={comment.body} onChange={this.onChange} />
				</div>

				<Button variant='flat'
					onClick={cancelEditComment}>
					<span >cancel</span>
				</Button>

				<Button variant='raised' color="primary"
					type='submit'>
					<span >save</span>
				</Button>

			</Form>
		);
	}
}

export default CommentEditForm;
