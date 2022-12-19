import { Button} from '../../atoms';
import { Link, matchPath, useLocation } from "react-router-dom"
import MenuPublic from '../MenuPublic/MenuPublic';


const HeaderPublic = () => {
    const { pathname } = useLocation();
    const isLogin = matchPath({
        path: "/iniciar-sesion",
        exact: true,
    }, pathname);
    const isRegister = matchPath({
        path: "/registro",
        exact: true,
    }, pathname);

    return (
            <header className="header-container">
                <div className='header-box'>
                    <div className='logo-container'>
                        <Link to="/"><img src="/images/db-logo.svg" alt="logo" /></Link>
                        <p>Sentite como en tu hogar</p>
                    </div>
                    <div className='btn-container'>
                        { !isRegister && <Link to="/registro"><Button variant="outlined">Crear cuenta</Button></Link>}
                        { !isLogin && <Link to="/iniciar-sesion"><Button variant="outlined">Iniciar sesión</Button></Link>}
                    </div>
                    <MenuPublic isLogin={isLogin} isRegister={isRegister} />
                </div>
            </header>
    )
};
export default HeaderPublic;