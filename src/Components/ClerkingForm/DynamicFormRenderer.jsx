import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { useEffect, useRef } from 'react';

const DynamicFormRenderer = ({specialtyId, formFields, onSubmit, defaultValues, isLoading}) => {
    const {
        register, 
        handleSubmit, 
        formState: {errors}, 
        clearErrors,
        unregister,
        watch,
        reset
    } = useForm({defaultValues});

    const prevSpecialtyId = useRef();

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const formValues = watch();

    useEffect(() => {
        // Only reset form when specialty changes, not on mount
        if (prevSpecialtyId.current && prevSpecialtyId.current !== specialtyId) {
            formFields.forEach(field => {
                unregister(field.name);
            });
            clearErrors();
            reset({}); // Clear all form field values
        }
        prevSpecialtyId.current = specialtyId;
    }, [specialtyId, formFields, clearErrors, unregister, reset]);

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
                    specialtyId={specialtyId}
                />
            ))}
            <button
                type="submit"
                disabled={isLoading}
                className="max-w-xs mx-auto py-3 px-5 bg-gradient-to-r from-blue-700 to-blue-800 
                        text-white font-medium text-base tracking-wide
                        rounded-lg shadow hover:from-blue-800 hover:to-blue-900 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50
                        active:scale-[0.98] transform transition-all duration-200
                        disabled:opacity-70 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2 mt-10"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{defaultValues && Object.keys(defaultValues).length > 0 ? 'Updating...' : 'Saving...'}</span>
                    </>
                ) : (
                    <>
                        <span>{defaultValues && Object.keys(defaultValues).length > 0 ? 'Update Clerking Note' : 'Save Clerking Note'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                    </>
                )}
            </button>
        </form>
    )
}

export default DynamicFormRenderer;