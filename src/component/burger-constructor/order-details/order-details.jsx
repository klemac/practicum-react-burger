import React from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const OrderDetails = ({ orderNumber }) => {
	return (
		<div className={`${styles.details__body} pb-20 pt-10`}>
			<p className='text text_type_digits-large'>{orderNumber}</p>
			<p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
			<CheckMarkIcon className={`${styles.details__icon} pt-15`} />
			<p className='text text_type_main-default pt-15'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive pt-2'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

OrderDetails.propType = {
	orderNumber: PropTypes.number.isRequired,
};
