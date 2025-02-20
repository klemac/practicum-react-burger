import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group';
import '../../styles.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types';

const BurgerIngredients = ({ listOfIngredients }) => {
	return (
		<section className={`${styles.main__section}`}>
			<p className={`${styles.title__left} text text_type_main-large pt-8`}>
				Соберите бургер
			</p>
			<nav style={{ display: 'flex' }} className='pt-4'>
				<Tab value='bun'>Булки</Tab>
				<Tab value='sauce'>Соусы</Tab>
				<Tab value='main'>Начинки</Tab>
			</nav>
			<ul className={`${styles.ingredients__scroll} custom-scroll`}>
				<IngredientsGroup
					groupName={'Булки'}
					ingredients={listOfIngredients.filter((el) => el.type === 'bun')}
				/>
				<IngredientsGroup
					groupName={'Соусы'}
					ingredients={listOfIngredients.filter((el) => el.type === 'sauce')}
				/>
				<IngredientsGroup
					groupName={'Начинки'}
					ingredients={listOfIngredients.filter((el) => el.type === 'main')}
				/>
			</ul>
		</section>
	);
};

BurgerIngredients.propType = {
	listOfIngredients: PropTypes.arrayOf(ingredientPropType.isRequired)
		.isRequired,
};

export default BurgerIngredients;
