import PropTypes from 'prop-types';
import './TextRate.css';

const TEXT_RATE = {
    'Muy malo': [1, 2],
    'Malo': [3, 4],
    'Regular': [5],
    'Bueno': [6, 7],
    'Muy bueno': [8, 9, 10]
}

const TextRate = ({ rate }) => {
    return (
        <div className='text-rate'>
            <div className='text-rate__number'><span>{rate}</span></div>
            <div className='text-rate__string'>
                <span>
                    {
                        Object.keys(TEXT_RATE).find(key => TEXT_RATE[key].includes(rate))
                    }
                </span>
            </div>
        </div>
    )
};

TextRate.propTypes = {
    rate: PropTypes.number
}

TextRate.defaultProps = {
    rate: 1
}

export default TextRate;