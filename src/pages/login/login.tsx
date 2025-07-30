import React, { useState, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch } from '../../services/hooks';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/user';
import { useForm } from '../../utils/useForm';
import { TUserLogin } from '../../utils/types';

export const Login = (): JSX.Element => {
	const dispatch = useDispatch();
	const [formData, onChange] = useForm<TUserLogin>({
		email: '',
		password: '',
	});

	const [isHidden, setHidden] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handlePasswordIcon = () => {
		setHidden(!isHidden);
		inputRef.current?.focus();
	};

	const formSubmit = (e: FormEvent<HTMLFormElement>) => {
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
