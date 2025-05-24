import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from './order-details/order-details';
import { Modal } from '../modal/modal';
import ConstructorItem from './constructor-item/constructor-item';
import { CLEAR_ORDER, createOrder } from '../../services/actions/order-details';
import {
	CLEAR_ITEMS,
	addItem,
} from '../../services/actions/burger-constructor';
import { useNavigate } from 'react-router-dom';
import {
	TDropCollectedIngredientProps,
	TIngredientItemType,
} from '../../utils/types';

const BurgerConstructor = (): JSX.Element => {
	const dispatch = useDispatch();
	const { bun, ingredients } = useSelector(
		(store: any) => store.burgerConstructor
	);
	const { order, orderRequest, orderError } = useSelector(
		(store: any) => store.order
	);
	const { user } = useSelector((store: any) => store.user);

	const navigate = useNavigate();
	const navigateToLogin = () => navigate('/login');

	const handleCloseModal = () => {
		dispatch({ type: CLEAR_ORDER });
		dispatch({ type: CLEAR_ITEMS });
	};

	const price = useMemo(() => {
		const price = bun ? bun.price * 2 : 0;
		if (ingredients?.length > 0) {
			return ingredients.reduce(
				(acc: number, ingredient: TIngredientItemType) =>
					acc + ingredient.price,
				price
			);
		} else {
			return price;
		}
	}, [bun, ingredients]);

	const placeAnOrder = () => {
		user ? dispatch(createOrder(bun, ingredients) as any) : navigateToLogin();
	};

	console.log(bun);

	const [{ canDropIngredient, canDropBun, isOverIngredient, isOverBun }, drop] =
		useDrop<TIngredientItemType, unknown, TDropCollectedIngredientProps>(
			() => ({
				accept: 'ItemDragDrop',
				drop: (item) => dispatch(addItem(item) as any),
				collect: (monitor) => ({
					canDropIngredient:
						monitor.getItem()?.type !== 'bun' && monitor.canDrop(),
					canDropBun: monitor.getItem()?.type === 'bun' && monitor.canDrop(),

					isOverIngredient:
						monitor.getItem()?.type !== 'bun' && monitor.isOver(),
					isOverBun: monitor.getItem()?.type === 'bun' && monitor.isOver(),
				}),
			})
		);

	return (
		<>
			{(order || orderRequest || orderError) && (
				<Modal header={''} onClose={handleCloseModal}>
					<OrderDetails />
				</Modal>
			)}
			<section
				className={`${styles.burger__constructor} pt-25 pb-10`}
				ref={drop}>
				{bun ? (
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
						extraClass={`${styles.startend__element}`}
					/>
				) : (
					<div
						className={`${styles.emptyburger__top} ${
							canDropBun && styles.drop__bun
						} ${isOverBun && styles.over__bun} text text_type_main-default`}>
						Выберите булочку
					</div>
				)}
				{ingredients.length > 0 ? (
					<ul className={`${styles.order__list} custom__scrollbar`}>
						{ingredients.map((element: TIngredientItemType, index: string) => (
							<ConstructorItem
								element={element}
								key={element.key}
								id={element.key ?? ''}
								index={index}
							/>
						))}
					</ul>
				) : (
					<div
						className={`${styles.empty__order} ${
							canDropIngredient && styles.drop__bun
						} ${
							isOverIngredient && styles.over__bun
						} text text_type_main-default`}>
						<p className='text text_type_main-default'>
							Выберите начинку для бургера
						</p>
					</div>
				)}
				{bun ? (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
						extraClass={`${styles.startend__element}`}
					/>
				) : (
					<div
						className={`${styles.emptyburger__bottom} ${
							canDropBun && styles.drop__bun
						} ${isOverBun && styles.over__bun} text text_type_main-default`}>
						Выберите булочку
					</div>
				)}
				<div className={`${styles.order__submit} pt-10`}>
					<div className={`${styles.item__price}`}>
						<p className='text text_type_digits-medium'>{price}</p>
						<CurrencyIcon type='primary' />
					</div>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						disabled={ingredients.length === 0 || !bun}
						onClick={placeAnOrder}>
						Оформить заказ
					</Button>
				</div>
			</section>
		</>
	);
};

export default BurgerConstructor;
