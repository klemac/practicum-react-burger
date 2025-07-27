import React, { useMemo } from 'react';
import { useSelector } from '../../../services/hooks';
import { useDrag } from 'react-dnd';
import styles from './ingredient-item.module.css';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';
import { TIngredientItemType } from '../../../utils/types';

type TIngredientItemProps = { item: TIngredientItemType };

const IngredientItem = ({ item }: TIngredientItemProps): JSX.Element => {
	const { bun, ingredients } = useSelector(
		(store: any) => store.burgerConstructor
	);

	const location = useLocation();

	const ingredientCount = useMemo(() => {
		if (item.type === 'bun') {
			return bun?._id === item._id ? 2 : 0;
		} else {
			return ingredients.filter(
				(element: TIngredientItemType) => element._id === item._id
			).length;
		}
	}, [bun, ingredients]);

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ItemDragDrop',
		item: item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}));

	return (
		<Link
			key={item._id}
			to={`/ingredients/${item._id}`}
			state={{ background: location }}
			className={styles.item__link}>
			<div
				className={`${styles.item__body} ${isDragging && styles.item__drag}`}
				aria-hidden='true'
				ref={drag}>
				<Counter count={ingredientCount} size='default' />
				<img
					className={`${styles.item__image}`}
					src={item.image}
					alt={item.name}></img>
				<div className={`${styles.item__price}`}>
					<p className='text text_type_digits-default'>{item.price}</p>
					<CurrencyIcon type='primary' />
				</div>
				<p className={`${styles.item__name} text text_type_main-small`}>
					{item.name}
				</p>
			</div>
		</Link>
	);
};

export default IngredientItem;
