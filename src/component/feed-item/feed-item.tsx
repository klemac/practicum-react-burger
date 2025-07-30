import React, { useMemo } from 'react';
import styles from './feed-item.module.css';
import { useSelector } from '../../services/hooks';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	OrderStatusType,
	TIngredientItemType,
	TFeedItem,
} from '../../utils/types';

type TFeedItemProps = {
	order: TFeedItem;
};

export const FeedItem = ({ order }: TFeedItemProps): React.JSX.Element => {
	const { ingredientsMap } = useSelector((state) => state.ingredients);
	const user = useSelector((store) => store.user.user);
	const orderIngredients = useMemo<TIngredientItemType[]>(
		() =>
			order.ingredients
				.map((i) => ingredientsMap.get(i))
				.filter((element): element is TIngredientItemType => !!element),
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

	const distinctOrderIngredients = [
		...new Set(orderIngredients),
	] as TIngredientItemType[];

	return (
		<div className='pt-5 pr-2'>
			<div className={`${styles.item__container} p-5`}>
				<div className={styles.item__topline}>
					<p className='text text_type_digits-default'>#{order?.number}</p>
					<p className='text text_type_main-default text_color_inactive'>
						<FormattedDate
							date={new Date(order?.updatedAt ?? order?.createdAt)}
						/>
					</p>
				</div>
				<p className={`${styles.item__data} text text_type_main-medium pt-6`}>
					{order?.name}
				</p>
				{user && order?.status === OrderStatusType.DONE && (
					<p
						className={`${styles.text__green} ${styles.item__data} text text_type_main-small`}>
						Выполнен
					</p>
				)}
				{user && order?.status === OrderStatusType.PENDING && (
					<p className={`${styles.item__data} text text_type_main-small`}>
						Готовится
					</p>
				)}
				{user && order?.status === OrderStatusType.CREATED && (
					<p className={`${styles.item__data} text text_type_main-small`}>
						Создан
					</p>
				)}
				<div className={`${styles.item__topline} pt-6`}>
					<div className={styles.item__data}>
						{distinctOrderIngredients.slice(0, 6).map((item, i) => (
							<div
								key={i}
								className={styles.image__border}
								style={{ left: -i * 15, zIndex: 100 - i }}>
								<img
									src={item.image}
									alt={item.name}
									key={item._id}
									className={styles.image}
								/>
								{i == 5 && i !== distinctOrderIngredients.length - 1 && (
									<p
										className={`${styles.images__more} text text_type_digits-default`}>
										{'+' + (distinctOrderIngredients.length - 6)}
									</p>
								)}
							</div>
						))}
					</div>
					<div className={styles.item__data}>
						<p className='text text_type_digits-default pr-2'>{totalPrice}</p>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</div>
	);
};
