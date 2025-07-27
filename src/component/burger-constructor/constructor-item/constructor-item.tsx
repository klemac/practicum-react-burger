import React, { useRef } from 'react';
import { useDispatch } from '../../../services/hooks';
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
import {
	TConstructorItem,
	TDragCollectedProps,
	TDragObject,
	TDropCollectedProps,
} from '../../../utils/types';

const ConstructorItem = ({
	element,
	id,
	index,
}: TConstructorItem): JSX.Element => {
	const dispatch = useDispatch();
	const itemRef = useRef<HTMLLIElement>(null);

	const [{ handlerId }, drop] = useDrop<
		TDragObject,
		unknown,
		TDropCollectedProps
	>({
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
			if (!clientOffset) {
				return;
			}
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			dispatch(moveItem(Number(dragIndex), Number(hoverIndex)) as any);

			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag<
		TDragObject,
		unknown,
		TDragCollectedProps
	>({
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
			<DragIcon type='primary' />
			<ConstructorElement
				text={element.name}
				thumbnail={element.image}
				price={element.price}
				handleClose={() => deleteItem(element)}
			/>
		</li>
	);
};

export default ConstructorItem;
