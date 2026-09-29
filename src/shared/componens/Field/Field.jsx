import { forwardRef } from 'react';
import styles from './field.module.scss';

const Field = forwardRef((props, ref) => {
    const {
        className = '',
        id,
        label,
        type = 'text',
        value,
        error,
        onInput,
        ...restProps
    } = props;

    return (
        <div className={`${styles.field} ${className}`}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <input
                {...restProps}
                ref={ref}
                className={`${styles.input} ${error ? styles.isInvalid : ''}`}
                id={id}
                placeholder=" "
                value={value}
                autoComplete="off"
                type={type}
                onInput={onInput}
            />
            {error && <span className={styles.error} title={error}>{error}</span>}
        </div>
    );
});

Field.displayName = 'Field';
export default Field;