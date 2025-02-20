import React from 'react';
import styles from './ingredient-item.module.css';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types';

const IngredientItem = ({ item }) => {
	return (
		<div className={`${styles.item__body}`}>
			<Counter count={1} size='default' />
			<img className={`${styles.item__image}`} src={item.image} alt=''></img>
			<div className={`${styles.item__price}`}>
				<p className='text text_type_digits-default'>{item.price}</p>
				<CurrencyIcon />
			</div>
			<p className={`${styles.item__name} text text_type_main-small`}>
				{item.name}
			</p>
		</div>
	);
};

IngredientItem.propTypes = {
	item: ingredientPropType.isRequired,
};

export default IngredientItem;
