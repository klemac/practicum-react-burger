import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './component/app/app';
import './styles.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
