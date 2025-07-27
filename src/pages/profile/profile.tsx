import React from 'react';
import { useDispatch } from '../../services/hooks';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './profile.module.css';
import { logout } from '../../services/actions/user';

export const Profile = (): JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const isOrderInfoPage = /^\/profile\/orders\/.+$/.test(location.pathname);

	return (
		<div className={styles.profile__container}>
			{!isOrderInfoPage && (
				<div className={styles.profile__body}>
					<nav className={styles.profile__nav}>
						<NavLink
							to='/profile'
							className='text text_type_main-medium text_color_inactive'
							style={({ isActive }) =>
								isActive ? { color: '#f2f2f3' } : undefined
							}
							end>
							Профиль
						</NavLink>
						<NavLink
							to='orders'
							className='text text_type_main-medium text_color_inactive'
							style={({ isActive }) =>
								isActive ? { color: '#f2f2f3' } : undefined
							}
							state={{ order: true }}
							end>
							История заказов
						</NavLink>
						<NavLink
							to='#'
							onClick={() => dispatch(logout() as any)}
							className='text text_type_main-medium text_color_inactive'>
							Выход
						</NavLink>
					</nav>
					<p
						className={`text text_type_main-small text_color_inactive mt-15 ${''}`}>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>
			)}
			<Outlet />
		</div>
	);
};
