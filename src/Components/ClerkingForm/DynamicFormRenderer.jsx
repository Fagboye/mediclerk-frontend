import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { useEffect } from 'react';

const DynamicFormRenderer = ({SpecialtyId, formFields, onSubmit, defaultValues = {drug_history: "ampicillin"}}) => {
    const {
        register, 
        handleSubmit, 
        formState: {errors}, 
        clearErrors,
        unregister,
        watch,
        reset
    } = useForm({defaultValues});

    const formValues = watch();

    useEffect(() => {
        reset(defaultValues);
        formFields.forEach(field => {
            unregister(field.name);
        });
        clearErrors();
    }, [SpecialtyId, formFields, clearErrors, unregister, defaultValues, reset]);

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
                    formValues={formValues}
                    showAiSuggestions={field.showAiSuggestions}
                />
            ))}
            <button
                type="submit"
                className="max-w-xs mx-auto py-3 px-5 bg-gradient-to-r from-blue-600 to-blue-700 
                        text-white font-medium text-base tracking-wide
                        rounded-lg shadow hover:from-blue-700 hover:to-blue-800 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50
                        active:scale-[0.98] transform transition-all duration-200
                        disabled:opacity-70 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2 mt-10"
            >
                <span>{defaultValues && Object.keys(defaultValues).length > 0 ? 'Update Clerking Note' : 'Save Clerking Note'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
            </button>
        </form>
    )
}

export default DynamicFormRenderer;