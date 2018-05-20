import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class VoteScore extends Component {

	static propTypes = {
		score: PropTypes.number,
		voteUp: PropTypes.func.isRequired,
		voteDown: PropTypes.func.isRequired,
		direction: PropTypes.string
	};

	render() {

		const { score, voteUp, voteDown, direction = 'row' } = this.props;

		return (
			<div className='vote-score-container' style={{ flexDirection: direction }}>

				<Button onClick={voteUp} variant='flat' className='vote-btn' >
					<FontAwesomeIcon icon='thumbs-up' />
					<span className='sr-only'>vote for</span>
				</Button>

				<span>{score} votes</span>

				<Button onClick={voteDown} variant='flat' className='vote-btn' >
					<FontAwesomeIcon icon='thumbs-down' className='vote-btn' />
					<span className='sr-only'>vote against</span>
				</Button>

			</div>
		);
	}
}

export default VoteScore;
