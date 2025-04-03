import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, header, onClose }) => {
	React.useEffect(() => {
		const handleEscClose = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscClose);

		return () => {
			document.removeEventListener('keydown', handleEscClose);
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<>
			<div className={`${styles.modal__body} p-10`}>
				<div className={styles.modal__header}>
					<p className={`${styles.header__text} text text_type_main-large`}>
						{header}
					</p>
					<CloseIcon
						type='primary'
						onClick={onClose}
						className={styles.modal__close}
					/>
				</div>
				{children}
			</div>
			<ModalOverlay onClose={onClose} />
		</>,
		modalRoot
	);
};

Modal.propType = {
	header: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
