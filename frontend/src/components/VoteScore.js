import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
				<span>{score}</span>

				<button
					onClick={voteUp}>+1</button>

				<button
					onClick={voteDown}>-1</button>

			</div>
		);
	}
}

export default VoteScore;
