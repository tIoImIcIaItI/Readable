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
				CategoriesList
				list all available categories, which should link to a category view for that category
				<ul>
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
