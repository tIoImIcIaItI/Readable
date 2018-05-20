import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

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

						<button							onClick={() => this.props.setSort(c.field, true)}>
							<FontAwesomeIcon icon='sort-down' />
							{c.label}
							<span className='sr-only'>ascending</span>
						</button>

						<button							onClick={() => this.props.setSort(c.field, false)}>
							<FontAwesomeIcon icon='sort-up' />
							{c.label}
							<span className='sr-only'>descending</span>
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default PostsSortSelector;
