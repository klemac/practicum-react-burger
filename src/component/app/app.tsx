import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export const App = () => {
	const [burgerData, setBurgerData] = React.useState([]);
	const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

	const getBurgerData = () => {
		fetch(API_URL)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Error: ${res.status}`);
			})
			.then((data) => {
				setBurgerData(data.data);
			})
			.catch((err) => {
				console.error('Error fetching burger data:', err);
			});
	};

	React.useEffect(() => {
		getBurgerData();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			{burgerData.length > 0 && (
				<main className={`${styles.main__block} pl-5 pr-5`}>
					<BurgerIngredients listOfIngredients={burgerData} />
					<BurgerConstructor constructorIngredients={burgerData} />
				</main>
			)}
		</div>
	);
};
