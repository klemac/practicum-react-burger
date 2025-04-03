import React from 'react';
import styles from './app-header.module.css';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.navbar}>
				<ul className={styles.menu__list}>
					<li className={`${styles.menu__item} pt-4 pb-4 pl-5 pr-5`}>
						<BurgerIcon type='secondary' />
						<p className='text text_type_main-default text_color_inactive'>
							Конструктор
						</p>
					</li>
					<li className={`${styles.menu__item} pt-4 pb-4 pl-5 pr-5`}>
						<ListIcon type='secondary' />
						<p className='text text_type_main-default text_color_inactive'>
							Лента заказов
						</p>
					</li>
				</ul>
				<Logo />
				<ul className={styles.menu__list}>
					<li className={`${styles.menu__item} pt-4 pb-4 pl-5 pr-5`}>
						<ProfileIcon type='secondary' />
						<p className='text text_type_main-default text_color_inactive'>
							Личный кабинет
						</p>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default AppHeader;
