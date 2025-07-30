import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import {
	wsClose,
	wsConnecting,
	wsError,
	wsMessage,
	wsOpen,
} from './feed/slice';
import { socketMiddleware } from './middleware/socket';
import { wsConnect, wsDisconnect } from './feed/actions';
import { FeedActions } from './feed/feed';
import { rootReducer } from './reducers/reducers';
import { thunk } from 'redux-thunk';

const feedMiddleware = socketMiddleware<FeedActions, unknown>({
	connect: wsConnect,
	disconnect: wsDisconnect,
	onConnecting: wsConnecting,
	onOpen: wsOpen,
	onClose: wsClose,
	onError: wsError,
	onMessage: wsMessage as any, // Не смог побороть ошибку здесь...
});

const composeEnhancers =
	typeof window === 'object' &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, feedMiddleware));

export const store = createStore(rootReducer, enhancer);
