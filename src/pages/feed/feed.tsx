import React, { useEffect } from 'react';
import styles from './feed.module.css';
import { FeedItem } from '../../component/feed-item/feed-item';
import { OrderStatusTable } from '../../component/order-status-table/order-status-table';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsConnect, wsDisconnect } from '../../services/feed/actions';
import { WebsocketStatus } from '../../services/feed/feed';
import { Link, useLocation } from 'react-router-dom';
import { WSS_API_URL } from '../../utils/api';

export const Feed = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const { orders, status } = useSelector((state) => state.feed);
	let location = useLocation();

	useEffect(() => {
		dispatch(wsConnect(WSS_API_URL + '/all'));
		return () => {
			dispatch(wsDisconnect());
		};
	}, []);

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
		<section className={styles.feed_container}>
			<h1
				className={`${styles.feed__header} pt-10 pb-5 text text_type_main-large main`}>
				Лента заказов
			</h1>
			<div className={styles.feed__body}>
				<div className={styles.feed__column}>
					<div className={`${styles.feed__scroll}`}>
						{orders.orders.map((item) => (
							<Link
								key={item._id}
								to={`/feed/${item.number}`}
								state={{ background: location }}
								className={styles.link}>
								<FeedItem order={item} key={item._id} />
							</Link>
						))}
					</div>
				</div>

				<div className={styles.feed__column}>
					<OrderStatusTable />
				</div>
			</div>
		</section>
	);
};
