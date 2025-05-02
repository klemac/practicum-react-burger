import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import '../../styles.css';
import IngredientsGroup from './ingredients-group/ingredients-group';

const BurgerIngredients = () => {
	const { data } = useSelector((store) => store.ingredients);
	const [activeTab, setActiveTab] = useState('buns');

	const containerRef = useRef(null);
	const bunsRef = useRef(null);
	const saucesRef = useRef(null);
	const mainsRef = useRef(null);

	const handleTabs = () => {
		const containerCoords =
			containerRef.current?.getBoundingClientRect().top || 0;
		const bunsCoords = bunsRef.current?.getBoundingClientRect().top || 0;
		const saucesCoords = saucesRef.current?.getBoundingClientRect().top || 0;
		const mainsCoords = mainsRef.current?.getBoundingClientRect().top || 0;

		let bunsMargin = Math.abs(containerCoords - bunsCoords);
		let saucesMargin = Math.abs(containerCoords - saucesCoords);
		let mainsMargin = Math.abs(containerCoords - mainsCoords);

		if (bunsMargin < saucesMargin && bunsMargin < mainsMargin) {
			setActiveTab('buns');
		} else if (saucesMargin < mainsMargin) {
			setActiveTab('sauces');
		} else {
			setActiveTab('mains');
		}
	};

	return (
		<section className={`${styles.main__section}`}>
			<p className={`${styles.title__left} text text_type_main-large pt-8`}>
				Соберите бургер
			</p>
			<nav className={`${styles.navbar__flex} pt-4`}>
				<Tab
					value='buns'
					active={activeTab === 'buns'}
					onClick={() => setActiveTab('buns')}>
					Булки
				</Tab>
				<Tab
					value='sauces'
					active={activeTab === 'sauces'}
					onClick={() => setActiveTab('sauces')}>
					Соусы
				</Tab>
				<Tab
					value='mains'
					active={activeTab === 'mains'}
					onClick={() => setActiveTab('mains')}>
					Начинки
				</Tab>
			</nav>
			<ul
				className={`${styles.ingredients__scroll} custom-scroll`}
				ref={containerRef}
				onScroll={handleTabs}>
				<li ref={bunsRef}>
					<IngredientsGroup
						groupName={'Булки'}
						ingredients={data.filter((el) => el.type === 'bun')}
					/>
				</li>
				<li ref={saucesRef}>
					<IngredientsGroup
						groupName={'Соусы'}
						ingredients={data.filter((el) => el.type === 'sauce')}
					/>
				</li>
				<li ref={mainsRef}>
					<IngredientsGroup
						groupName={'Начинки'}
						ingredients={data.filter((el) => el.type === 'main')}
					/>
				</li>
			</ul>
		</section>
	);
};

export default BurgerIngredients;
