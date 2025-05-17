import React, { ChangeEvent } from 'react';

type TUseForm<T> = [
	formData: T,
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
];

export const useForm = <T>(initialState: T): TUseForm<T> => {
	const [formData, setFormData] = React.useState<T>(initialState);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return [formData, onChange];
};
