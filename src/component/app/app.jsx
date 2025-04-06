import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { getIngredients } from '../../services/actions/burger-ingredients';

export const App = () => {
	const dispatch = useDispatch();
	const { data, dataRequest, dataError } = useSelector(
		(state) => state.ingredients
	);

	React.useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />
			<DndProvider backend={HTML5Backend}>
				{dataRequest ? (
					<div className={styles.whole__screen}>
						<p className='text text_type_main-medium'>Загрузка...</p>
					</div>
				) : dataError ? (
					<div className={styles.whole__screen}>
						<p className='text text_type_main-medium'>Ошибка при загрузке!</p>
					</div>
				) : (
					data.length > 0 && (
						<main className={`${styles.main__block} pl-5 pr-5`}>
							<BurgerIngredients />
							<BurgerConstructor />
						</main>
					)
				)}
			</DndProvider>
		</div>
	);
};
