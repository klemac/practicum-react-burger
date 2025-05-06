import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/user';
import { useForm } from '../../utils/useForm';

export const Login = () => {
	const dispatch = useDispatch();
	const [formData, onChange] = useForm({ email: '', password: '' });

	const [isHidden, setHidden] = useState(true);
	const inputRef = useRef(null);

	const handlePasswordIcon = () => {
		setHidden(!isHidden);
		inputRef.current.focus();
	};

	const formSubmit = (e) => {
		e.preventDefault();
		dispatch(login(formData));
	};

	return (
		<div className={styles.form__container}>
			<p className='text text_type_main-medium'>Вход</p>
			<form onSubmit={formSubmit}>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					onChange={onChange}
					value={formData.email}
					name={'email'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mt-6'
				/>
				<Input
					type={isHidden ? 'password' : 'text'}
					placeholder={'Пароль'}
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
				<div className='mt-6 mb-20'>
					<Button htmlType='submit' type='primary' size='large'>
						Войти
					</Button>
				</div>
			</form>
			<p className='text_color_inactive'>
				Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
			</p>
			<p className='text_color_inactive'>
				Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
			</p>
		</div>
	);
};
