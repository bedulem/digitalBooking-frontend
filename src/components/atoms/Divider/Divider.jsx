import setClassName from "../../../utils/setClassName";
import './Divider.css';

const Divider = ({ className, ...props }) => {
    return (
        <hr {...props} className={setClassName(className, 'divider')} />
    )
};
export default Divider;