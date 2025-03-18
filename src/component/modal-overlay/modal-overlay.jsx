import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
	return (
		<div
			onClick={onClose}
			className={styles.modal__overlay}
			aria-hidden='true'></div>
	);
};

ModalOverlay.propType = {
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
