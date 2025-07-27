import styles from './order-info.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { TFeedItem, TIngredientItemType } from '../../utils/types';
import { getOrderByNumber } from '../../utils/api';
import { useEffect, useMemo, useState } from 'react';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderInfo = (): React.JSX.Element => {
	const { orders } = useSelector((state) => state.feed);
	const { ingredientsMap } = useSelector((state) => state.ingredients);
	const [order, setOrder] = useState<TFeedItem | null | undefined>();
	const { number } = useParams();

	useEffect(() => {
		let order = null;
		if (number) {
			order = orders?.orders?.find((item) => item.number.toString() === number);
			if (!order) {
				getOrderByNumber(number)
					.then((res) => setOrder(res.orders[0]))
					.catch((err) => console.log(err.message));
			}
		}
		setOrder(order);
	}, []);

	const orderIngredients = useMemo<TIngredientItemType[]>(
		() =>
			order?.ingredients
				.map((i) => ingredientsMap.get(i))
				.filter((elem): elem is TIngredientItemType => !!elem) ?? [],
		[order]
	);

	const totalPrice = useMemo(
		() =>
			orderIngredients?.reduce(
				(accumulator: number, current: TIngredientItemType) =>
					accumulator + current.price,
				0
			),
		[orderIngredients]
	);

	if (!order) {
		return (
			<p className='text text_type_main-default text_color_inactive'>
				Заказ не найден
			</p>
		);
	}

	return (
		<div className={`${styles.container} pl-5 pr-5`}>
			<p className={`text text_type_digits-default ${styles.text__centered}}`}>
				#{order?.number}
			</p>
			<div className='pt-10'>
				<p className={`text text_type_main-medium pb-3 ${styles.text__left}`}>
					{order?.name}
				</p>
			</div>
			<div>
				<p className={`${styles.text__green} text text_type_main-small`}>
					{order?.status === 'done' ? 'Выполнен' : 'В работе'}
				</p>
			</div>

			<p className='text text_type_main-medium pt-15 pb-6'>Состав:</p>
			<div className={styles.line__list}>
				{[...new Set(orderIngredients)].map((item) => (
					<div className={`${styles.line__centered} pb-4 pr-2`} key={item._id}>
						<div className={`${styles.line__centered}`}>
							<img
								src={item.image_mobile}
								alt={item.name}
								key={item._id}
								className={styles.image}
							/>
							<p className='text text_type_main-default pl-4'>{item.name}</p>
						</div>
						<div className={styles.line__block}>
							<p className='text text_type_digits-default'>
								{
									orderIngredients?.filter((elem) => item._id === elem._id)
										.length
								}
							</p>
							<p className='text text_type_main-default'>x</p>
							<p className='text text_type_digits-default pr-2'>{item.price}</p>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				))}
			</div>
			<div className={`${styles.line__block} pt-10 pb-5`}>
				<p className='text text_type_main-default text_color_inactive'>
					<FormattedDate
						date={
							new Date(order?.updatedAt ? order?.updatedAt : order?.createdAt)
						}
					/>
				</p>
				<div className={styles.line__block}>
					<p className='text text_type_digits-default pr-2'>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
