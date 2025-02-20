import React from 'react';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	Button,
	DragIcon,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ constructorIngredients }) => {
	const filteredIngredients = constructorIngredients.filter(
		(el) => el.type !== 'bun'
	);
	const bun = constructorIngredients.find((el) => el.type === 'bun');
	return (
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
				<Button htmlType='button' type='primary' size='medium'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

export default BurgerConstructor;
