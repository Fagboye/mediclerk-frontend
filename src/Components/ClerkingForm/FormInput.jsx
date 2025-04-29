/**
 * FormInput Component - A reusable form input component that renders either a textarea or input field
 * with optional AI-powered suggestions.
 * 
 * @param {string} label - Label text for the form field
 * @param {string} name - Name/id of the form field
 * @param {string} type - Type of input ('text', 'textarea', etc)
 * @param {number} rows - Number of rows for textarea
 * @param {string} placeholder - Placeholder text
 * @param {string} error - Error message to display
 * @param {boolean} required - Whether field is required
 * @param {function} register - React Hook Form register function
 * @param {object} validation - Validation rules for the field
 * @param {object} formValues - All form values
 * @param {boolean} showAiSuggestions - Whether to show AI suggestions
 */
import { useState } from 'react';
import api from '../../api/axios';

const FormInput = ({
    label,
    name, 
    type,
    rows,
    placeholder,
    error,
    required = false,
    register,
    validation,
    formValues,
    showAiSuggestions = true
  }) => {
    // State for managing AI suggestions loading and results
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState(null);

    /**
     * Fetches AI-powered suggestions based on the field name and form context
     * Handles loading state and error cases
     */
    const getAiSuggestions = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            const response = await api.post('/api/suggestions', {
                field: name,
                formContext: formValues
            });
            setSuggestions(response.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error getting AI suggestions:', err);
        }
    };

    /**
     * Clears the current AI suggestions from state
     */
    const clearSuggestions = () => {
        setSuggestions(null);
    };

    return (
      <div className="mb-6 relative">
        {/* Field label with required asterisk if needed */}
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <div className="relative">
          {/* Render textarea or input based on type prop */}
          {type === 'textarea' ? (
            <textarea
              id={name}
              {...register(name, validation)}
              name={name}
              rows={rows}
              placeholder={placeholder}
              className={`
                w-full px-3 py-2 rounded-md border
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${error ? 'border-red-500' : 'border-gray-300'}
                ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
                ${showAiSuggestions ? 'pr-10' : ''} 
              `}
              required={required}
            />
          ) : (
            <input
              id={name}
              {...register(name, validation)}
              name={name}
              type={type}
              placeholder={placeholder}
              className={`
                w-full px-3 py-2 rounded-md border
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${error ? 'border-red-500' : 'border-gray-300'}
                ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
                ${showAiSuggestions ? 'pr-10' : ''}
              `}
              required={required}
            />
          )}

          {/* AI Suggestions Icon - only show for allowed fields */}
          {showAiSuggestions && !suggestions && (
            <button
              type="button"
              onClick={getAiSuggestions}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-blue-600 transition-colors z-10"
              disabled={isLoading}
            >
              {/* Loading spinner animation */}
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              ) : (
                /* Lightbulb icon for AI suggestions */
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Error message display */}
        {error && (
          <div className="mt-1">
            <span className="text-sm text-red-500">
              {error}
            </span>
          </div>
        )}

        {/* AI Suggestions Panel - shows when suggestions are available */}
        {suggestions && showAiSuggestions && (
          <div className="mt-2 p-3 bg-blue-50 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-blue-800">Suggested Questions:</h4>
              {/* Close button for suggestions panel */}
              <button
                type="button"
                onClick={clearSuggestions}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Clear suggestions"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* List of AI-generated suggestions */}
            <ul className="list-disc pl-4 text-sm text-blue-700">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
}

export default FormInput;