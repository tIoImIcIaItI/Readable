/*eslint dot-location: ["error", "object"]*/
export const CATEGORIES_LOADED = 'CATEGORIES_LOADED';

export const fetchCategories = () => dispatch => (
	fetch('http://127.0.0.1:3001/categories',
		{
			headers: { 'Authorization': 'whatever-you-want' }
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
