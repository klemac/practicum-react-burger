import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export function NotFound(): JSX.Element {
	return (
		<div className={styles.page__container}>
			<h1 className='text text_type_main-large'>
				Страница по данному адресу не существует или перемещена
			</h1>
			<p>
				<Link
					to='/'
					className='text text_type_main-default text_color_inactive'>
					Главная страница
				</Link>
			</p>
		</div>
	);
}
