import React, { useState, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../utils/api';
import { useForm } from '../../utils/useForm';
import { TUserRegister } from '../../utils/types';

export const Register = (): JSX.Element => {
	const [formData, onChange] = useForm<TUserRegister>({
		name: '',
		email: '',
		password: '',
	});
	const [isHidden, setHidden] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);

	const handlePasswordIcon = () => {
		setHidden(!isHidden);
		inputRef.current?.focus();
	};

	const formSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		register(formData);
	};

	return (
		<div className={styles.form__container}>
			<p className='text text_type_main-medium'>Регистрация</p>
			<form onSubmit={formSubmit}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={onChange}
					value={formData.name}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mt-6'
				/>
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
				<div className={`mt-6 mb-20 ${''}`}>
					<Button htmlType='submit' type='primary' size='large'>
						Зарегистрироваться
					</Button>
				</div>
			</form>
			<p className='text_color_inactive'>
				Уже зарегистрированы? <Link to='/login'>Войти</Link>
			</p>
		</div>
	);
};
