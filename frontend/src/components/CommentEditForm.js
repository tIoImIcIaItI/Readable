import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const getTimestamp = (dt = new Date()) => dt.getTime();

class CommentEditForm extends Component {

	static propTypes = {
		comment: PropTypes.object.isRequired,
		saveComment: PropTypes.func.isRequired,
		cancelEditComment: PropTypes.func.isRequired,
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

		const { comment, saveComment } = this.props;
		const { body } = this.state;

		saveComment({
			...comment,
			body: body || comment.body,
			timestamp: getTimestamp()
		});

		event.preventDefault();
	};

	render() {
		const { comment } = this.props;
		const { cancelEditComment } = this.props;

		return (
			<form onSubmit={this.onSubmit}>

				<div>
					<label htmlFor='body'>Content</label>
					<textarea id='body' name='body' defaultValue={comment.body} onChange={this.onChange} />
				</div>

				<button onClick={cancelEditComment}>cancel</button>

				<button type='submit'>save</button>

			</form>
		);
	}
}

export default CommentEditForm;
