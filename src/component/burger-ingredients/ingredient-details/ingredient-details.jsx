import { React, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import { useLocation, useParams } from 'react-router-dom';

export const IngredientDetails = () => {
	const { ingredientId } = useParams();
	const ingredients = useSelector((state) => state.ingredients.data);
	const ingredient = useMemo(
		() => ingredients.find((item) => item._id === ingredientId),
		[ingredientId, ingredients]
	);
	console.log(ingredient);
	const { state } = useLocation();

	return ingredient ? (
		<div className={`${styles.details__body}`}>
			{!state?.background && (
				<p className={`${styles.header__text} text text_type_main-large`}>
					Детали ингредиента
				</p>
			)}
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
	) : (
		<p className={`${styles.details__error} text text_type_main-default`}>
			Данные об ингрединте не найдены
		</p>
	);
};
