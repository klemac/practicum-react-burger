import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './component/app/app';
import './styles.css';

import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/reducers';
import { thunk } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
