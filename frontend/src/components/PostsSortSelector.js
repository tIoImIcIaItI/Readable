import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostsSortSelector extends Component {

	static propTypes = {
		criteria: PropTypes.array.isRequired,
		setSort: PropTypes.func.isRequired
	};

	render() {
		return (
			<div>
				{(this.props.criteria || []).map(c =>
					<div key={c.field}>
						<button
							onClick={() => this.props.setSort(c.field, true)}>{c.label} ASC</button>
						<button
							onClick={() => this.props.setSort(c.field, false)}>{c.label} DESC</button>
					</div>
				)}
			</div>
		);
	}
}

export default PostsSortSelector;
