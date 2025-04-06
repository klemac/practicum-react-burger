import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import styles from './ingredient-item.module.css';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import {
	CLEAR_INGREDIENT_DETAILS,
	SET_INGREDIENT_DETAILS,
} from '../../../services/actions/ingredient-details';

const IngredientItem = ({ item }) => {
	const dispatch = useDispatch();
	const { ingredient } = useSelector((store) => store.ingredientDetails);
	const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

	const ingredientCount = useMemo(() => {
		if (item.type === 'bun') {
			return bun?._id === item._id ? 2 : 0;
		} else {
			return ingredients.filter((elem) => elem._id === item._id).length;
		}
	}, [bun, ingredients]);

	const handleOpenModal = useCallback(
		(item) => {
			dispatch({ type: SET_INGREDIENT_DETAILS, ingredient: item });
		},
		[dispatch]
	);

	const handleCloseModal = () => {
		dispatch({ type: CLEAR_INGREDIENT_DETAILS });
	};

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ItemDragDrop',
		item: item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}));

	return (
		<>
			{ingredient && (
				<Modal header={'Детали ингредиента'} onClose={handleCloseModal}>
					<IngredientDetails ingredient={item} />
				</Modal>
			)}
			<div
				className={`${styles.item__body} ${isDragging && styles.item__drag}`}
				onClick={() => handleOpenModal(item)}
				aria-hidden='true'
				ref={drag}>
				<Counter count={ingredientCount} size='default' />
				<img
					className={`${styles.item__image}`}
					src={item.image}
					alt={item.name}></img>
				<div className={`${styles.item__price}`}>
					<p className='text text_type_digits-default'>{item.price}</p>
					<CurrencyIcon />
				</div>
				<p className={`${styles.item__name} text text_type_main-small`}>
					{item.name}
				</p>
			</div>
		</>
	);
};

IngredientItem.propTypes = {
	item: ingredientPropType.isRequired,
};

export default IngredientItem;
