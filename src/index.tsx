import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './component/app/app';
import './styles.css';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from './services/store';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
	<StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</StrictMode>
);
