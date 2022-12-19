import setClassName from '../../../utils/setClassName';
import './Select.css';

const Select = (props) => {
    const { children, label, id = "select-custom", fullWidth, required, error, helperText, change, ...others } = props;
    return (
        <div className='select-container'>
            {label && <label className='select-label' htmlFor={id}>{label} {required && <span className='required'>*</span>}</label>}
            <select {...others} id={id} onChange={change} className={setClassName("select-input", { fullWidth }, { error })}>
                {children}
            </select>
            {error && <span className='error-text'>{helperText}</span>}
        </div>

    )
}
export default Select;