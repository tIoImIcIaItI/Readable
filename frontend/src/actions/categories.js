/*eslint dot-location: ["error", "object"]*/
import { api, headers } from '../config';

export const CATEGORIES_LOADED = 'CATEGORIES_LOADED';

export const fetchCategories = () => dispatch => (
	fetch(`http://${api}/categories`,
		{
			headers: headers
		}).
		then(res => {
			if (res.ok)
				return res.json();

			console.log(res);
			throw new Error('TODO');
		}).
		then(json => {
			dispatch(
				categoriesLoaded(
					json.categories));
		}).
		catch(console.error)
);

export function categoriesLoaded(categories) {
	return {
		type: CATEGORIES_LOADED,
		categories
	};
}
