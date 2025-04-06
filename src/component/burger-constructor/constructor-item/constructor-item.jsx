import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-item.module.css';
import {
	deleteItem,
	moveItem,
} from '../../../services/actions/burger-constructor';
import { ingredientPropType } from '@utils/prop-types';
import PropTypes from 'prop-types';

const ConstructorItem = ({ element, id, index }) => {
	const dispatch = useDispatch();
	const itemRef = useRef(null);

	const deleteElement = (item) => {
		dispatch(deleteItem(item));
	};

	const [{ handlerId }, drop] = useDrop({
		accept: 'ItemSwap',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!itemRef.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			dispatch(moveItem(dragIndex, hoverIndex));

			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'ItemSwap',
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(itemRef));

	return (
		<li
			key={element._id}
			className={`${styles.order__element} ${
				isDragging && styles.dragging__element
			}`}
			ref={itemRef}
			data-handler-id={handlerId}>
			<DragIcon />
			<ConstructorElement
				text={element.name}
				thumbnail={element.image}
				price={element.price}
				handleClose={() => deleteElement(element)}
			/>
		</li>
	);
};

ConstructorItem.propTypes = {
	element: ingredientPropType.isRequired,
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
};

export default ConstructorItem;
