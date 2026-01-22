import React, { useRef, useState, useCallback } from 'react';

// Type definitionsas
type ValidationRule = (formData: Record<string, any>) => string | null;

type ValidationSchema = {
  [key: string]: ValidationRule | ValidationRule[];
};

type RegisterOptions = {
  useRef?: boolean; // Use ref-based approach for performance
};

type useFormValidationOptions = {
  initialValues?: Record<string, any>;
  validationSchema?: ValidationSchema;
  mode?: 'onChange' | 'onBlur' | 'onSubmit'; // When to validate
};

// Custom hook
function useFormValidation(options: useFormValidationOptions = {}) {
  const {
    initialValues = {},
    validationSchema = {},
    mode = 'onSubmit'
  } = options;

  // State for controlled approach
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Refs for uncontrolled approach
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>>({});
  const useRefMode = useRef<Record<string, boolean>>({});

  // Get current form data (combining state and refs)
  const getFormData = useCallback(() => {
    const data: Record<string, any> = { ...formData };
    
    // Add ref-based field values
    Object.keys(fieldRefs.current).forEach(name => {
      if (useRefMode.current[name]) {
        const element = fieldRefs.current[name];
        if (element) {
          data[name] = element.type === 'checkbox' 
            ? (element as HTMLInputElement).checked 
            : element.value;
        }
      }
    });
    
    return data;
  }, [formData]);

  // Validate a single field
  const validateField = useCallback((name: string, value: any, allData: Record<string, any>) => {
    const rules = validationSchema[name];
    if (!rules) return null;

    const ruleArray = Array.isArray(rules) ? rules : [rules];
    
    for (const rule of ruleArray) {
      const error = rule(allData);
      if (error) return error;
    }
    
    return null;
  }, [validationSchema]);

  // Validate entire form
  const validate = useCallback(() => {
    const currentData = getFormData();
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(fieldName => {
      const error = validateField(fieldName, currentData[fieldName], currentData);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationSchema, validateField, getFormData]);

  // Handle field change
  const handleChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate on change if mode is onChange
    if (mode === 'onChange' || (mode === 'onBlur' && touchedFields[name])) {
      const currentData = { ...getFormData(), [name]: value };
      const error = validateField(name, value, currentData);
      
      setErrors(prev => {
        if (error) {
          return { ...prev, [name]: error };
        } else {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
      });
    }
  }, [mode, touchedFields, validateField, getFormData]);

  // Handle field blur
  const handleBlur = useCallback((name: string) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    if (mode === 'onBlur') {
      const currentData = getFormData();
      const error = validateField(name, currentData[name], currentData);
      
      setErrors(prev => {
        if (error) {
          return { ...prev, [name]: error };
        } else {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
      });
    }
  }, [mode, validateField, getFormData]);

  // Register input field
  const register = useCallback((name: string, options: RegisterOptions = {}) => {
    const { useRef: shouldUseRef = false } = options;
    useRefMode.current[name] = shouldUseRef;

    if (shouldUseRef) {
      // Uncontrolled approach using refs
      return {
        name,
        ref: (el: any) => {
          if (el) {
            fieldRefs.current[name] = el;
            // Set initial value
            if (initialValues[name] !== undefined) {
              if (el.type === 'checkbox') {
                el.checked = initialValues[name];
              } else {
                el.value = initialValues[name];
              }
            }
          }
        },
        onBlur: () => handleBlur(name)
      };
    } else {
      // Controlled approach using state
      return {
        name,
        value: formData[name] || '',
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          const value = e.target.type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : e.target.value;
          handleChange(name, value);
        },
        onBlur: () => handleBlur(name)
      };
    }
  }, [formData, initialValues, handleChange, handleBlur]);

  // Set error manually
  const setError = useCallback((name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // Clear errors
  const clearErrors = useCallback((name?: string) => {
    if (name) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setErrors({});
    }
  }, []);

  // Reset form
  const reset = useCallback((values?: Record<string, any>) => {
    const resetValues = values || initialValues;
    setFormData(resetValues);
    setErrors({});
    setTouchedFields({});
    setIsSubmitting(false);

    // Reset ref-based fields
    Object.keys(fieldRefs.current).forEach(name => {
      const element = fieldRefs.current[name];
      if (element && useRefMode.current[name]) {
        if (element.type === 'checkbox') {
          (element as HTMLInputElement).checked = resetValues[name] || false;
        } else {
          element.value = resetValues[name] || '';
        }
      }
    });
  }, [initialValues]);

  return {
    register,
    formData: getFormData(),
    setFormData,
    errors,
    setError,
    clearErrors,
    validate,
    isSubmitting,
    setIsSubmitting,
    reset,
    touchedFields
  };
}

export default useFormValidation;
