import PropTypes from 'prop-types';
import setClassName from '../../../utils/setClassName';
import './Button.css'

const VARIANTS = {
    filled: 'filled',
    outlined: 'outlined',
}

const Button = ({ children, className, variant, fullWidth, onlyIcon, type = "button", ...others }) => {
    return (
        <button
            {...others}
            type={type}
            className={
                setClassName(
                    {
                        'btn-filled': variant === VARIANTS.filled,
                        'btn-outlined': variant === VARIANTS.outlined
                    },
                    { 'fullWidth': fullWidth },
                    { 'btn-padding': !onlyIcon },
                    className
                )
            }
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['filled', 'outlined']),
    fullWidth: PropTypes.bool,
}

Button.defaultProps = {
    variant: 'filled'
}

export default Button;