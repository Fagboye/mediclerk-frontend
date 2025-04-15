/**
 * FormInput Component - A reusable form input component that renders either a textarea or input field
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
 */
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
  }) => {
    return (
      <div className="mb-4">
        {/* Field label with required asterisk if needed */}
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

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
            `}
            required={required}
          />
        )}

        {/* Error message display */}
        {error && (
          <span className="text-sm text-red-500 mt-1">
            {error}
          </span>
        )}
      </div>
    );
  };

export default FormInput;