/*eslint dot-location: ["error", "object"]*/

export const getTimestamp = (dt = new Date()) => 
	dt.getTime();

export const notEmpty = (value) => 
	value && value.length > 0;

export const setPropertyFromEitherOf = (obj, name, s1, s2) => 
	obj[name] = s1[name] || s2[name];

export const getValidityOf = (f, state) => ({
	name: f.name,
	isValid: f.rule ? f.rule(state[f.name]) : true
});

export const isValid = (formFields, state) => // TODO: provide field-level validation UI
	(formFields || []).
		map(f => getValidityOf(f, state)).
		every(v => v.isValid);
