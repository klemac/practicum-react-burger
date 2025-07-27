import { Middleware } from 'redux';
import { RootState } from '../hooks';
import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

export type WSActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<R>;
	sendMessage?: ActionCreatorWithPayload<S>;
};

const RECONNECT_DELAY = 3000;

export const socketMiddleware = <R, S>(
	wsActions: WSActions<R, S>,
	withTokenRefresh: boolean = false
): Middleware<NonNullable<unknown>, RootState> => {
	return (store) => {
		let ws: WebSocket | null = null;
		let url = '';
		let isConnected = false;
		let reconnectTimer = 0;
		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			onMessage,
			sendMessage,
		} = wsActions;

		return (next) => (action) => {
			const { dispatch } = store;

			if (connect.match(action)) {
				ws = new WebSocket(action.payload);
				url = action.payload;
				isConnected = true;
				onConnecting && dispatch(onConnecting());

				ws.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				ws.onerror = () => {
					dispatch(onError('Error'));
				};

				ws.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData = JSON.parse(data);
						dispatch(onMessage(parsedData));
					} catch (err) {
						dispatch(onError((err as Error).message));
					}
				};

				ws.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_DELAY);
					}
				};
			}

			if (ws && sendMessage?.match(action)) {
				try {
					ws.send(JSON.stringify(action.payload));
				} catch (err) {
					dispatch(onError((err as Error).message));
				}
			}

			if (ws && disconnect.match(action)) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				reconnectTimer = 0;
				ws.close();
				ws = null;
			}

			next(action);
		};
	};
};
