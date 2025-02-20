import React from 'react';
import styles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';

const IngredientsGroup = (props) => {
	console.log(props.ingredients);
	return (
		<div className={`${styles.group__body} pt-10`}>
			<p className={`${styles.title__left} text text_type_main-medium`}>
				{props.groupName}
			</p>
			<ul className={`${styles.group__list} pt-6 pl-4 pt-4`}>
				{props.ingredients.map((element) => (
					<li key={element._id}>
						<IngredientItem item={element} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default IngredientsGroup;
