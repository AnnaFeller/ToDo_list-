import styles from './Button.module.scss';

const Button = (props) => {
    const {
        className = '',
        type = 'button',
        variant = 'primary',
        size = 'md',
        children,
        onClick,
        isDisabled,
        ...restProps
    } = props;

    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={buttonClasses}
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default Button;