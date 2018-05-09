import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers';

export default function configureStore(initialState) {

	const loggerMiddleware = 
		createLogger();

	const composeEnhancers = 
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || 
		compose;

	return createStore(
		rootReducer,
		initialState,
		composeEnhancers(
			applyMiddleware(thunk, loggerMiddleware)
		)
	);
}