
import { Link, useNavigate } from "react-router-dom";
import { useSessionContext } from "../../../context/AuthContext";
import MenuPrivate from "../MenuPrivate/MenuPrivate";
import './HeaderPrivate.css';



const HeaderPrivate = () => {
    const { session: user, logout } = useSessionContext();
    const avatar = (user?.name[0] + user?.lastName[0]).toUpperCase();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }
    

    return (
        <header className='header-container'>
            <div className='header-box'>
                
                <Link to="/"  className='logo-container'>
                    <img src="/images/db-logo.svg" alt="logo"/>
                    <p>Sentite como en tu hogar</p>
                </Link>

                <div className="menu-desktop">
                    {
                        user.role.id===2 ? 
                        <Link to="/admin"> <p className="menu-text">Administración</p></Link>:
                        <div className="extra-functions">
                            <Link to="/reservas"> <p className="menu-text">Mis Reservas</p></Link>
                            <Link to="/favoritos"> <p className="menu-text">Mis Favoritos</p></Link>
                        </div>
                    }
                    <div className='logged-container'>
                        <div className="avatar fc-white fw-700"><p>{avatar}</p></div>
                        <p className="user-name fw-700">Hola, <br /> <span>{user?.name} {user?.lastName}</span></p>
                        <img src="/images/icons/exit.svg" alt="salir" onClick={handleLogout} />
                    </div>
                </div>
                <MenuPrivate firstName={user?.name} lastName={user?.lastName} logout={logout} inicialesName={avatar} rolID={user.role.id} />
            </div>
        </header>
    )
};
export default HeaderPrivate;