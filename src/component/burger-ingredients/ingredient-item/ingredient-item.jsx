import React from 'react';
import styles from './ingredient-item.module.css';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientItem = (props) => {
	return (
		<div className={`${styles.item__body}`}>
			<Counter count={1} size='default' />
			<img
				className={`${styles.item__image}`}
				src={props.item.image}
				alt=''></img>
			<div className={`${styles.item__price}`}>
				<p className='text text_type_digits-default'>{props.item.price}</p>
				<CurrencyIcon />
			</div>
			<p className={`${styles.item__name} text text_type_main-small`}>
				{props.item.name}
			</p>
		</div>
	);
};

export default IngredientItem;
