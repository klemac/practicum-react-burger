import React from 'react';
import { useSelector } from 'react-redux';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetails = (): JSX.Element => {
	const { order, orderRequest, orderError } = useSelector(
		(store: any) => store.order
	);

	return (
		<>
			{orderRequest ? (
				<div className={styles.order__request}>Подтверждение заказа...</div>
			) : orderError ? (
				<div className={styles.order__error}>
					<p>Ошибка при подтверждении заказа</p>
					<p>{orderError}</p>
				</div>
			) : (
				<div className={`${styles.details__body} pb-20 pt-10`}>
					<p className='text text_type_digits-large'>{order}</p>
					<p className='text text_type_main-medium pt-8'>
						идентификатор заказа
					</p>
					<CheckMarkIcon
						className={`${styles.details__icon} pt-15`}
						type='primary'
					/>
					<p className='text text_type_main-default pt-15'>
						Ваш заказ начали готовить
					</p>
					<p className='text text_type_main-default text_color_inactive pt-2'>
						Дождитесь готовности на орбитальной станции
					</p>
				</div>
			)}
		</>
	);
};
