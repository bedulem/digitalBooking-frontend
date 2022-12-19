import PropTypes from 'prop-types';
import { useState } from 'react';
import setClassName from '../../../utils/setClassName';
import './Input.css'

const Input = (props) => {
    const { refInput, label, id, className, fullWidth, type, error, helperText, required, ...others } = props;
    const [typePwd, setTypePwd] = useState(type);

    const onMouseDown = () => {
        setTypePwd('text');
    }

    const onMouseUp = () => {
        setTypePwd('password');
    }

    return (
        <div className={setClassName('input-container', className)}>
            {label && <label htmlFor={id}>{label} {required && <span className='required'>*</span>}</label>}
            {
                type === 'password' ?
                    <div className='pwd-container'>
                        <input
                            {...others}
                            ref={refInput}
                            type={typePwd}
                            autoComplete="new-password"
                            className={setClassName('input-base', { fullWidth }, { error }, { 'pwd-font': typePwd === 'password' })}
                            id={id}
                        />
                        <span onMouseDown={onMouseDown} onMouseUp={onMouseUp} className='pwd-icon'>
                            <img src="/images/icons/show.svg" alt="show" />
                        </span>
                    </div>
                    :
                    <input
                        {...others}
                        ref={refInput}
                        type={type}
                        className={setClassName('input-base', { fullWidth }, { error })}
                    />
            }
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