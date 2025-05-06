import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile-details.module.css';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';
import { useForm } from '../../utils/useForm';

export const ProfileDetails = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const [initialForm, setInitialForm] = useState(user);
	const [formData, onChange] = useForm(initialForm);
	const [isHidden, setHidden] = useState(true);

	const handlePasswordIcon = () => {
		setHidden(!isHidden);
		inputRef.current.focus();
	};

	const formSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUser(formData));
	};

	const inputRef = useRef(null);

	const handleCancelChange = () => {
		setInitialForm(user);
	};

	useEffect(() => {
		if (user) {
			setInitialForm(user);
		}
	}, [user]);

	return (
		<form onSubmit={formSubmit} className={styles.form__body}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={onChange}
				icon={'EditIcon'}
				value={formData.name}
				name={'name'}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
			/>
			<Input
				type={'email'}
				placeholder={'Логин'}
				onChange={onChange}
				icon={'EditIcon'}
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
				value={formData.password || ''}
				name={'password'}
				error={false}
				ref={inputRef}
				onIconClick={handlePasswordIcon}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mt-6'
			/>
			{JSON.stringify(user) !== JSON.stringify(formData) ? (
				<div className={`${styles.buttons__block} mt-6 mb-20`}>
					<Button
						htmlType='button'
						type='secondary'
						size='large'
						onClick={handleCancelChange}>
						Отменить
					</Button>
					<Button htmlType='submit' type='primary' size='large'>
						Сохранить
					</Button>
				</div>
			) : null}
		</form>
	);
};
