import PropTypes from 'prop-types';
import setClassName from '../../../utils/setClassName';
import './Rate.css'

const Rate = ({ starts }) => {
    return (
        <span className='rate-container'>
            {
                Array.from({ length: 5 }, (_, i) =>
                    <i key={i} className={setClassName('rate', { 'rate-fill': starts > i, 'rate-empty': starts <= i })}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.9506 0.820416L8.5978 5.65281L13.8854 5.63834L9.61582 8.63939L11.263 13.4718L6.97708 10.4941L2.7075 13.4952L4.32822 8.65386L0.0422864 5.67622L5.32988 5.66175L6.9506 0.820416Z" />
                        </svg>
                    </i>)
            }
        </span>
    )
}

Rate.propTypes = {
    starts: PropTypes.number
}

Rate.defaultProps = {
    starts: 0
}

export default Rate;