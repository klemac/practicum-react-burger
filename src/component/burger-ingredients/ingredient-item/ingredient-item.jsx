import React from 'react';
import styles from './ingredient-item.module.css';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

const IngredientItem = ({ item }) => {
	const [openedModal, setOpenedModal] = React.useState(false);

	const handleOpenModal = () => {
		setOpenedModal(true);
	};

	const handleCloseModal = () => {
		setOpenedModal(false);
	};

	return (
		<>
			{openedModal && (
				<Modal header={'Детали ингредиента'} onClose={handleCloseModal}>
					<IngredientDetails ingredient={item} />
				</Modal>
			)}
			<div
				className={`${styles.item__body}`}
				onClick={handleOpenModal}
				aria-hidden='true'>
				<Counter count={1} size='default' />
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
