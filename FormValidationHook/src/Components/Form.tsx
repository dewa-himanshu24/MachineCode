import React from 'react';
import useFormValidation from '../Hooks/FormValidation';

type ValidationRule = (formData: Record<string, any>) => string | null;

type ValidationSchema = {
  [key: string]: ValidationRule | ValidationRule[];
};

// Demo Component
function FormDemo() {
  // Validation schema with various validation rules
  const validationSchema: ValidationSchema = {
    username: [
      (data) => data.username ? null : 'Username is required',
      (data) => data.username && data.username.length >= 3 ? null : 'Username must be at least 3 characters',
      (data) => /^[a-zA-Z0-9_]+$/.test(data.username) ? null : 'Username can only contain letters, numbers, and underscores'
    ],
    email: [
      (data) => data.email ? null : 'Email is required',
      (data) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? null : 'Invalid email format'
    ],
    password: [
      (data) => data.password ? null : 'Password is required',
      (data) => data.password && data.password.length >= 8 ? null : 'Password must be at least 8 characters'
    ],
    confirmPassword: [
      (data) => data.confirmPassword ? null : 'Please confirm your password',
      (data) => data.password === data.confirmPassword ? null : 'Passwords do not match'
    ],
    age: [
      (data) => data.age ? null : 'Age is required',
      (data) => data.age >= 18 ? null : 'Must be at least 18 years old'
    ],
    terms: [
      (data) => data.terms ? null : 'You must accept the terms and conditions'
    ]
  };

  const {
    register,
    formData,
    errors,
    validate,
    isSubmitting,
    setIsSubmitting,
    reset
  } = useFormValidation({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      terms: false,
      bio: ''
    },
    validationSchema,
    // mode: 'onBlur'
  });

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const isValid = validate();
    
    if (isValid) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
      
      setIsSubmitting(false);
      reset();
    } else {
      console.log('Form has errors:', errors);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h1 style={styles.title}>Form Validation Hook Demo</h1>
        <p style={styles.subtitle}>Complete form with validation on blur</p>
        
        <div style={styles.formWrapper}>
          {/* Username */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Username *</label>
            <input
              {...register('username')}
              type="text"
              style={{
                ...styles.input,
                ...(errors.username ? styles.inputError : {})
              }}
              placeholder="Enter username"
            />
            {errors.username && (
              <p style={styles.errorText}>{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              {...register('email')}
              type="email"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {})
              }}
              placeholder="Enter email"
            />
            {errors.email && (
              <p style={styles.errorText}>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password *</label>
            <input
              {...register('password')}
              type="password"
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {})
              }}
              placeholder="Enter password"
            />
            {errors.password && (
              <p style={styles.errorText}>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password *</label>
            <input
              {...register('confirmPassword')}
              type="password"
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {})
              }}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p style={styles.errorText}>{errors.confirmPassword}</p>
            )}
          </div>

          {/* Age */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Age *</label>
            <input
              {...register('age')}
              type="number"
              style={{
                ...styles.input,
                ...(errors.age ? styles.inputError : {})
              }}
              placeholder="Enter age"
            />
            {errors.age && (
              <p style={styles.errorText}>{errors.age}</p>
            )}
          </div>

          {/* Bio (using ref for performance - no validation) */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Bio (Optional - Using Ref)</label>
            <textarea
              {...register('bio', { useRef: true })}
              rows={4}
              style={styles.textarea}
              placeholder="Tell us about yourself..."
            />
            <p style={styles.helperText}>
              This field uses ref-based approach for better performance
            </p>
          </div>

          {/* Terms checkbox */}
          <div style={styles.checkboxGroup}>
            <input
              {...register('terms')}
              type="checkbox"
              style={styles.checkbox}
            />
            <label style={styles.checkboxLabel}>
              I accept the terms and conditions *
            </label>
          </div>
          {errors.terms && (
            <p style={styles.errorText}>{errors.terms}</p>
          )}

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.buttonDisabled : {})
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              style={styles.resetButton}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Debug Info */}
        <div style={styles.debugContainer}>
          <h3 style={styles.debugTitle}>Form Data:</h3>
          <pre style={styles.debugPre}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  formCard: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '0.5rem',
    marginTop: 0
  },
  subtitle: {
    color: '#718096',
    marginBottom: '2rem',
    marginTop: 0
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#ef4444'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  errorText: {
    marginTop: '0.25rem',
    fontSize: '0.875rem',
    color: '#ef4444',
    margin: '0.25rem 0 0 0'
  },
  helperText: {
    marginTop: '0.25rem',
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: '0.25rem 0 0 0'
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  checkbox: {
    marginTop: '0.25rem',
    height: '1rem',
    width: '1rem',
    cursor: 'pointer'
  },
  checkboxLabel: {
    marginLeft: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    paddingTop: '1rem'
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  },
  resetButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontWeight: '500',
    color: '#374151',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  debugContainer: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  debugTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
    marginTop: 0,
    fontSize: '1rem'
  },
  debugPre: {
    fontSize: '0.75rem',
    backgroundColor: 'white',
    padding: '0.75rem',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '12rem',
    margin: 0
  }
};

export default FormDemo;