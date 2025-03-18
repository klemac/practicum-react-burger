import React from 'react';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	Button,
	DragIcon,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types';
import { OrderDetails } from './order-details/order-details';
import { Modal } from '../modal/modal';

const BurgerConstructor = ({ constructorIngredients }) => {
	const [openedModal, setOpenedModal] = React.useState(false);
	const [orderNumber, setOrderNumber] = React.useState(null);

	const filteredIngredients = constructorIngredients.filter(
		(el) => el.type !== 'bun'
	);
	const bun = constructorIngredients.find((el) => el.type === 'bun');

	const handleOpenModal = () => {
		setOpenedModal(true);
	};

	const handleCloseModal = () => {
		setOpenedModal(false);
	};

	React.useEffect(() => {
		setOrderNumber(123456);
	}, []);

	return (
		<>
			{openedModal && (
				<Modal header={''} onClose={handleCloseModal}>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
			<section className={`${styles.burger__constructor} pt-25 pb-10`}>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.image}
					extraClass={`${styles.startend__element}`}
				/>
				<ul className={`${styles.order__list} custom__scrollbar`}>
					{filteredIngredients.map((element) => (
						<li key={element._id} className={`${styles.order__element}`}>
							<DragIcon />
							<ConstructorElement
								text={element.name}
								thumbnail={element.image}
								price={element.price}
							/>
						</li>
					))}
				</ul>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
					extraClass={`${styles.startend__element}`}
				/>
				<div className={`${styles.order__submit} pt-10`}>
					<div className={`${styles.item__price}`}>
						<p className='text text_type_digits-medium'>{1000}</p>
						<CurrencyIcon />
					</div>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						onClick={handleOpenModal}>
						Оформить заказ
					</Button>
				</div>
			</section>
		</>
	);
};

BurgerConstructor.propType = {
	constructorIngredients: PropTypes.arrayOf(ingredientPropType.isRequired)
		.isRequired,
};

export default BurgerConstructor;
