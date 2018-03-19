/*eslint dot-location: ["error", "object"]*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { fetchCategories } from './actions/categories';
import { fetchPosts } from './actions/posts';
import App from './App';
import './index.css';

const store = configureStore();

store.dispatch(fetchCategories());
store.dispatch(fetchPosts());

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));

//registerServiceWorker();
