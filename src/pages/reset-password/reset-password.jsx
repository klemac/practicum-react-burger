import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './reset-password.module.css';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { passwordReset } from '../../utils/api';
import { useForm } from '../../utils/useForm';

export const ResetPassword = () => {
	const [formData, onChange] = useForm({ code: '', password: '' });
	const [isErrorRequest, setErrorRequest] = useState(null);
	const [isHidden, setHidden] = useState(true);
	const inputRef = useRef(null);
	const navigate = useNavigate();

	const handlePasswordIcon = () => {
		setHidden(!isHidden);
		inputRef.current.focus();
	};

	const formSubmit = (e) => {
		e.preventDefault();
		passwordReset(formData)
			.then(() => {
				localStorage.removeItem('resetPassword');
				navigate('/login');
			})
			.catch((error) => setErrorRequest(error?.message));
	};

	if (!localStorage.getItem('resetPassword')) {
		navigate('/forgot-password');
	}

	return (
		<div className={styles.form__container}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<form onSubmit={formSubmit}>
				<Input
					type={isHidden ? 'password' : 'text'}
					placeholder={'Введите новый пароль'}
					onChange={onChange}
					icon={isHidden ? 'ShowIcon' : 'HideIcon'}
					value={formData.password}
					name={'password'}
					error={false}
					ref={inputRef}
					onIconClick={handlePasswordIcon}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mt-6'
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={onChange}
					value={formData.code}
					name={'code'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mt-6'
				/>
				<div className={`mt-6 mb-20 ${''}`}>
					<Button htmlType='submit' type='primary' size='large'>
						Сохранить
					</Button>
				</div>

				{isErrorRequest ? (
					<div className={`mt-5 ${''}`}>
						Ошибка при выполнении запроса: {isErrorRequest}
					</div>
				) : null}
			</form>
			<p className='text_color_inactive'>
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</p>
		</div>
	);
};
