import { Outlet } from 'react-router-dom';
import { Footer, HeaderPrivate, HeaderPublic } from '../../organisms';
import './Layout.css';
import { useSessionContext } from '../../../context/AuthContext';
import { ConfigContextProvider } from '../../../context/ConfigContext';

const Layout = () => {
    const { session } = useSessionContext();
    return (
        <ConfigContextProvider>
            <div className='layout'>
                {session ? <HeaderPrivate /> : <HeaderPublic />}
                <main className='main-container'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ConfigContextProvider>
    )
};
export default Layout;