import { useState } from 'react';

export const useFormEdit = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const setInitialForm = (initialForm) => {
        setFormState(initialForm);
    };

    const onInputEditChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return {
        formState,
        setInitialForm,
        onInputEditChange
    };
};
