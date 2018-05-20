import React from 'react';
// import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../styles/stat.css';

const Stat = (props) => {

	const { icon, label, value, direction, display } = props;

	return (
		<div className='stat-widget' style={{ flexDirection: direction }}>

			<span className='sr-only'>{label}</span>
			{display.label && <span className='stat-label'>{label}</span>}

			<span className='stat-count'>{value}</span>

			{display.icon && <FontAwesomeIcon aria-hidden className='stat-icon' icon={icon} />}
		</div>
	);
}

export default Stat;
