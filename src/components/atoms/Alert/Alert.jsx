import PropTypes from 'prop-types';
import setClassName from '../../../utils/setClassName';
import './Alert.css'

const Alert = ({ children, className, type }) => {
    return (<div className={setClassName(`alert alert-${type}`, className)}>
        {children}
    </div>)
}

Alert.propTypes = {
    type: PropTypes.oneOf(['success', 'danger', 'warning', 'info'])
}

Alert.defaultProps = {
    type: 'info'
}

export default Alert;