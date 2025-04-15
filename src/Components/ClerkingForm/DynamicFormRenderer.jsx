import {useForm} from 'react-hook-form';
import FormInput from './FormInput';
import { useEffect } from 'react';

const DynamicFormRenderer = ({SpecialtyId, formFields, onSubmit}) => {
    const {
        register, 
        handleSubmit, 
        formState: {errors}, 
        clearErrors,
        unregister
    } = useForm();

    useEffect(() => {
        formFields.forEach(field => {
            unregister(field.name);
        });
        clearErrors();
    }, [SpecialtyId, formFields, clearErrors, unregister]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((field) => (
                <FormInput
                    key={field.id}  
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    rows={field.rows}
                    placeholder={field.placeholder}
                    required={field.required}
                    register={register}
                    validation={field.validation}
                    error={errors[field.name]?.message}
                />
            ))}
            <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium 
                        rounded-md hover:bg-blue-700 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                        transition-colors duration-200"
            >
                Submit
            </button>
        </form>
    )
}

export default DynamicFormRenderer;