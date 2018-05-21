import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../styles/sort.css';

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

						<span className='sort-label'>{c.label}</span>

						<Button
							onClick={() => this.props.setSort(c.field, true)}>
							<FontAwesomeIcon icon='sort-up' />
							{/*{c.label}*/}
							<span className='sr-only'>ascending</span>
						</Button>

						<Button
							onClick={() => this.props.setSort(c.field, false)}>
							<FontAwesomeIcon icon='sort-down' />
							{/*{c.label}*/}
							<span className='sr-only'>descending</span>
						</Button>
					</div>
				)}
			</div>
		);
	}
}

export default PostsSortSelector;
