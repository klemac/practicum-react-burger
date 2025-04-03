import React from 'react';
import styles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types';

const IngredientsGroup = ({ groupName, ingredients }) => {
	return (
		<div className={`${styles.group__body} pt-10`}>
			<p className={`${styles.title__left} text text_type_main-medium`}>
				{groupName}
			</p>
			<ul className={`${styles.group__list} pt-6 pl-4 pt-4`}>
				{ingredients.map((element) => (
					<li key={element._id}>
						<IngredientItem item={element} />
					</li>
				))}
			</ul>
		</div>
	);
};

IngredientsGroup.propTypes = {
	groupName: PropTypes.string.isRequired,
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default IngredientsGroup;
