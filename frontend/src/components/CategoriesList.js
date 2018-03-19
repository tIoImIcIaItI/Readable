import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CategoriesList extends Component {

	static propTypes = {
		categories: PropTypes.array.isRequired
	};

	render() {
		return (
			<div>
				<h1>Categories</h1>
				<ul>
					{!this.props.match || !this.props.match.params.category ?
						<p>All Categories</p> :
						<li key={-1}>
							<Link to={'/'}>All Categories</Link>
						</li>
					}
					{this.props.categories.map(category =>
						<li key={category.name}>
							{!this.props.match || this.props.match.params.category === category.name ?
								<p>{category.name}</p> :
								<Link to={`/${category.path}`}>{category.name}</Link>
							}
						</li>
					)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.allCategories || []
	}
};

export default connect(
	mapStateToProps
)(CategoriesList);
