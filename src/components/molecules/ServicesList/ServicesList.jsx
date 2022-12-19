import PropTypes from 'prop-types';
import { faDumbbell, faMartiniGlass, faParking, faPaw, faPersonSwimming, faSnowflake, faUtensils, faWifi, faKitchenSet, faTv, faElevator } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ServicesList.css';
import setClassName from '../../../utils/setClassName';
import { ICONS, SERVICE_ICONS } from '../../../constants/icons';


const ServicesList = (props) => {
    const { services, className, noLabels, variant } = props;
    return (
        <ul className={setClassName(className, 'services-list', { 'services-list__noLabels': noLabels })}>
            {
                services?.map((service, idx) => {
                    return (
                        <li key={idx} className='services-list__item'>
                            <span className="tooltip" >
                                {

                                    service.iconId && <FontAwesomeIcon
                                        icon={ICONS[`icon-${service.iconId}`].icon}
                                        className={
                                            setClassName({
                                                'fc-primary': variant === 'primary',
                                                'fc-secondary': variant === 'secondary'
                                            })}
                                    />
                                }
                                {noLabels && <span className="tooltiptext">{service.name}</span>}
                            </span>

                            {!noLabels && <span >{service.name}</span>}

                        </li>
                    )
                })
            }
        </ul>
    )
}

ServicesList.propTypes = {
    services: PropTypes.arrayOf(PropTypes.object)
}

ServicesList.defaultProps = {
    variant: 'primary'
}

export default ServicesList;