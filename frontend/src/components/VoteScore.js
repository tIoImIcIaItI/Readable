import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class VoteScore extends Component {

	static propTypes = {
		score: PropTypes.number,
		voteUp: PropTypes.func.isRequired,
		voteDown: PropTypes.func.isRequired
	};

	render() {

		const { score, voteUp, voteDown } = this.props;

		return (
			<div>
				<button onClick={voteUp}>
					<FontAwesomeIcon icon='thumbs-up' />
					<span className='sr-only'>vote for</span>				
				</button>

				<button onClick={voteDown}>
					<FontAwesomeIcon icon='thumbs-down' />
					<span className='sr-only'>vote against</span>				
				</button>

				<span>{score} votes</span>

			</div>
		);
	}
}

export default VoteScore;
