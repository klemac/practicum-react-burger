import React, { useEffect } from 'react';
import styles from './orders.module.css';
import { WebsocketStatus } from '../../services/feed/feed';
import { useDispatch, useSelector } from '../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { wsConnect, wsDisconnect } from '../../services/feed/actions';
import { FeedItem } from '../feed-item/feed-item';
import { WSS_API_URL } from '../../utils/api';

export const Orders = (): React.JSX.Element => {
	const dispatch = useDispatch();
	let location = useLocation();

	useEffect(() => {
		dispatch(
			wsConnect(
				WSS_API_URL + '?token=' + localStorage.getItem('accessToken')?.slice(7)
			)
		);
		return () => {
			dispatch(wsDisconnect());
		};
	}, []);

	const { orders, status } = useSelector((state) => state.feed);

	if (orders?.orders?.length == 0) {
		if (status === WebsocketStatus.CONNECTING) {
			return (
				<p className='text text_type_main-default text_color_inactive'>
					Поиск...
				</p>
			);
		} else if (status === WebsocketStatus.OFFLINE) {
			return (
				<p className='text text_type_main-default text_color_inactive'>
					Ожидание...
				</p>
			);
		} else {
			return (
				<p className='text text_type_main-default text_color_inactive'>
					Нет данных о заказах
				</p>
			);
		}
	}

	return (
		<div className={styles.orders__container}>
			<div className={`${styles.orders__scroll}`}>
				{orders?.orders
					?.map((item) => (
						<Link
							key={item._id}
							to={`/profile/orders/${item.number}`}
							state={{ background: location }}
							className={styles.link}>
							<FeedItem order={item} key={item._id} />
						</Link>
					))
					.reverse()}
			</div>
		</div>
	);
};
