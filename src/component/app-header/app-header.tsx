import React from 'react';
import styles from './app-header.module.css';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

const AppHeader = (): JSX.Element => {
	const user = useSelector((store: any) => store.user.user);
	const getButtonColor = (isActive: boolean) =>
		isActive ? 'primary' : 'secondary';
	const getTextColor = (isActive: boolean) =>
		isActive ? null : 'text_color_inactive';
	return (
		<header className={styles.header}>
			<nav className={styles.navbar}>
				<ul className={styles.menu__list}>
					<NavLink
						to='/'
						end
						style={({ isActive }) =>
							isActive ? { color: '#f2f2f3' } : undefined
						}>
						{({ isActive }) => (
							<div className={`${styles.menu__item} pt-4 pb-4 pl-5 pr-5`}>
								<BurgerIcon type={getButtonColor(isActive)} />
								<p
									className={`${getTextColor(
										isActive
									)} text text_type_main-default`}>
									Конструктор
								</p>
							</div>
						)}
					</NavLink>
					<NavLink
						to='/feed'
						end
						style={({ isActive }) =>
							isActive ? { color: '#f2f2f3' } : undefined
						}>
						{({ isActive }) => (
							<div className={`${styles.menu__item} pt-4 pb-4 pl-5 pr-5`}>
								<ListIcon type={getButtonColor(isActive)} />
								<p
									className={`${getTextColor(
										isActive
									)} text text_type_main-default`}>
									Лента заказов
								</p>
							</div>
						)}
					</NavLink>
				</ul>
				<NavLink to='/'>
					<Logo />
				</NavLink>
				<ul className={styles.menu__list}>
					<NavLink
						to='/profile'
						end
						style={({ isActive }) =>
							isActive ? { color: '#f2f2f3' } : undefined
						}>
						{({ isActive }) => (
							<div className={`${styles.menu__item} pt-4 pb-4 pl-5 pr-5`}>
								<ProfileIcon type={getButtonColor(isActive)} />
								<p
									className={`${getTextColor(
										isActive
									)} text text_type_main-default`}>
									{user ? user.name : 'Личный Кабинет'}
								</p>
							</div>
						)}
					</NavLink>
				</ul>
			</nav>
		</header>
	);
};

export default AppHeader;
