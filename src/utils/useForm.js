import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [formData, setFormData] = useState(initialState);

	const onChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return [formData, onChange];
};
