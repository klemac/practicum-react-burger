import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './home.module.css';
import BurgerIngredients from '../../component/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../component/burger-constructor/burger-constructor';

export const Home = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.container}>
				<BurgerIngredients />
				<BurgerConstructor />
			</div>
		</DndProvider>
	);
};
