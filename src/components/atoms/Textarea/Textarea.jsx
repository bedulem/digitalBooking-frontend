import PropTypes from 'prop-types';
import setClassName from '../../../utils/setClassName';
import './Textarea.css'

const Input = (props) => {
    const { label, id, className, fullWidth, error, helperText, rows=3, inputRef,required, ...others } = props;

    return (
        <div className={setClassName('input-container', className)}>
            {label && <label htmlFor={id}>{label} {required && <span className='required'>*</span>}</label>}
            <textarea
                {...others}
                id={id}
                ref={inputRef}
                rows={rows}
                className={setClassName('input-base', { fullWidth }, { error })}
            />
            {error && <span className='error-text'>{helperText}</span>}
        </div>
    )
}

Input.propTypes = {
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
}

Input.defaultProps = {
    helperText: 'Este campo es requerido',
}

export default Input;