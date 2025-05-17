import React from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	onClose: () => void;
};

const ModalOverlay = ({ onClose }: TModalOverlayProps): JSX.Element => {
	return (
		<div
			onClick={onClose}
			className={styles.modal__overlay}
			aria-hidden='true'></div>
	);
};

export default ModalOverlay;
