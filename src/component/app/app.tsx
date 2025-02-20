import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { burgerData } from '../../utils/data';

export const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={`${styles.main__block} pl-5 pr-5`}>
				<BurgerIngredients listOfIngredients={burgerData} />
				<BurgerConstructor constructorIngredients={burgerData} />
			</main>
		</div>
	);
};
