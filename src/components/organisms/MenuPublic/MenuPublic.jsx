import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import './MenuPublic.css';

const MenuPublic = (props)=>{

    const {isLogin,isRegister} = props

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
        <div className="menu" >
            <img src="/images/icons/menu.svg" className="menu-burger" alt="menu desplegable" onClick={open} />
            <div className="menu-open hidden">
                <div className="menu-open-view">
                    <div className="header-menu">
                        <img src="/images/icons/exit.svg" className="menu-exit " alt="cerrar menu" onClick={close} />
                        <h3 className="fc-white">Menú</h3>
                    </div>
                    <div className="body-menu">
                        { !isRegister && <Link to="/registro"  onClick={close}><Button variant="outlined">Crear cuenta</Button></Link>}
                        { !isLogin && <Link to="/iniciar-sesion"  onClick={close}><Button variant="outlined">Iniciar sesión</Button></Link>}
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
export default MenuPublic