import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

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
			<form onSubmit={this.onSubmit}>

				{isNew && (
				<div>
					<label htmlFor='author'>author</label>
					<input id='author'  type='text' name='author' defaultValue={comment.author} onChange={this.onChange} />
				</div>
				)}

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
