import { Link } from 'react-router-dom';
import './MenuPrivate.css';

const MenuPrivate = ({firstName, lastName,rolID, logout, inicialesName})=>{

    const disableScroll=()=>{  
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function(){ window.scrollTo(x, y) };
    }
    const enableScroll=()=>{  
        window.onscroll = null;
    }
    const open= ()=>{
        document.querySelector('.menu-burger').classList.add('hidden')
        document.querySelector('.menu-open').classList.remove('hidden')
        disableScroll()
    }
    const close= ()=>{
        document.querySelector('.menu-burger').classList.remove('hidden')
        document.querySelector('.menu-open').classList.add('hidden')
        enableScroll()
    }
    return(
        <div className="menu menu-private" >
            <img src="/images/icons/menu.svg" className="menu-burger" alt="menu desplegable" onClick={open} />
            <div className="menu-open hidden">
                <div className="menu-open-view">
                    <div className="header-menu">
                        <img src="/images/icons/exit.svg" className="menu-exit " alt="cerrar menu" onClick={close} />
                        <div className='logged-container-burger'>
                            <div className="avatar fc-primary-dark fw-700"><p>{inicialesName}</p></div>
                            <p className="user-name fc-white fw-700">Hola, <br /> <span className="fc-primary-dark">{firstName} {lastName}</span></p>
                        </div>
                    </div>
                    <div className="body-menu">
                        <div className="menu-guide">
                        {
                            rolID===2 ? 
                            <Link to="/admin"  onClick={close}> <p className="menu-text">Administración</p></Link>:
                            <div className="extra-functions">
                                <Link to="/reservas" onClick={close}> <p className="menu-text">Mis Reservas</p></Link>
                                <Link to="/favoritos" onClick={close}> <p className="menu-text">Mis Favoritos</p></Link>
                            </div>
                        }
                            
                        </div>
                        <p>¿Deseas <span  onClick={logout} >cerrar sesión</span> ?</p>
                    </div>
                    <ul className="footer-menu">
                        <li><img src="/images/icons/facebook.svg" alt="facebook" /></li>
                        <li><img src="/images/icons/linkedin.svg" alt="linkedin" /></li>
                        <li><img src="/images/icons/twitter.svg" alt="twitter" /></li>
                        <li><img src="/images/icons/instagram.svg" alt="instagram" /></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
export default MenuPrivate