import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/categories.css';

class CategoriesList extends Component {

	static propTypes = {
		categories: PropTypes.array.isRequired
	};

	render() {
		return (
			<div className='categories-list-container'>
				<h2 className='sr-only'>Categories</h2>

				<ul id='categories-list'>
					{!this.props.match || !this.props.match.params.category ?
						<li>All Categories</li> :
						<li key={-1}>
							<Link to={'/'}>All Categories</Link>
						</li>
					}
					{this.props.categories.map(category =>
						<li key={category.name}>
							{!this.props.match || this.props.match.params.category === category.name ?
								category.name :
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
