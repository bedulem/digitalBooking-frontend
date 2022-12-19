import setClassName from "../../../utils/setClassName"
import PropTypes from "prop-types"
import './Paper.css'

const Paper = ({ children, className, ...props }) => {
    return (
        <div
            {...props}
            className={setClassName('paper', {
                'paper--shadow-sm': props.shadow === 'sm',
                'paper--shadow-md': props.shadow === 'md',
                'paper--shadow-lg': props.shadow === 'lg'
            }, className)}
        >
            {children}
        </div>
    )
}

Paper.propTypes = {
    shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
}

Paper.defaultProps = {
    shadow: 'sm'
}

export default Paper;