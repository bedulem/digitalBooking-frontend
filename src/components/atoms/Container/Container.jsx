import setClassName from "../../../utils/setClassName";
import './Container.css';

const Container = ({ children, className, ...props }) => {
    return (
        <div {...props} className={setClassName(className, 'container-content')} >
            {children}
        </div>
    );
}

export default Container;