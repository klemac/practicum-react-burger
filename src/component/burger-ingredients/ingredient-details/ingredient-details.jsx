import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
	const { ingredient } = useSelector((state) => state.ingredientDetails);
	return (
		<div className={`${styles.details__body}`}>
			<img
				className={`${styles.details__image}`}
				src={ingredient.image_large}
				alt={ingredient.name}
			/>
			<p className={`${styles.details__name} text text_type_main-medium pt-4`}>
				{ingredient.name}
			</p>
			<ul className={`${styles.ingredient__parameters}`}>
				<li className={`${styles.parameters__item}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive pt-2'>
						{ingredient.calories}
					</p>
				</li>
				<li className={`${styles.parameters__item}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive pt-2'>
						{ingredient.proteins}
					</p>
				</li>
				<li className={`${styles.parameters__item}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive pt-2'>
						{ingredient.fat}
					</p>
				</li>
				<li className={`${styles.parameters__item}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive pt-2'>
						{ingredient.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};
