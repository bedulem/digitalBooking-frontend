import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layouts';
import { Details } from './pages/Details';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { MsgProductOk } from './pages/MsgProductOk';
import { MsgReservationOk } from './pages/MsgReservationOk';
import { CreateProduct } from './pages/CreateProduct';
import { MyReservations } from './pages/MyReservations';
import { MyFavorites } from './pages/MyFavorites';
import { RegisterPage } from './pages/Register';
import { Reservation } from './pages/Reservation';
import { Cancel } from './pages/Cancel';
import { Admin } from './pages/Admin';
import Eliminar from './pages/Eliminar/Eliminar';
import { useSessionContext } from './context/AuthContext';

const RoutesComponent = () => {
    const {session } = useSessionContext();
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="iniciar-sesion" element={<LoginPage />} />
                <Route path="registro" element={<RegisterPage />} />
                <Route path="producto">
                    <Route index element={<Navigate to='/' replace />} />
                    <Route path=":idProduct" element={<Details />} />
                    {/* solo logged */}
                    {session ?
                        <>
                            <Route path=":idProduct/reserva" element={<Reservation />} />
                            <Route path="gracias" element={<MsgReservationOk/>}/>
                        </>
                        :
                        <>
                            <Route path=":idProduct/reserva" element={<Navigate to='/' replace />} />
                            <Route path="gracias" element={<Navigate to='/' replace />} />
                        </>
                    }
                </Route>
                <Route path="error" element={<h1>Error en la reserva!!</h1>} />
                {/* solo logged */}
                {session ?
                    <Route path="reservas">
                        <Route index element={<MyReservations/>}/>
                        <Route path="cancelar/:idReservation" element={<Cancel/>}/>
                    </Route>
                    :
                    <Route path="reservas/*" element={<Navigate to='/' replace />}/>
                }
                {/* solo logged */}
                {session ?
                    <Route path="favoritos" element={<MyFavorites/>}/>
                    :
                    <Route path="favoritos" element={<Navigate to='/' replace />}/>
                }
                {/* solo admin */}
                {session?.role.id === 2 ?
                    <Route path="admin">
                        <Route index element={<Admin/>}/>
                        <Route path="crear_producto" element={<CreateProduct/>}/>
                        <Route path="eliminar/:idProducto" element={<Eliminar/>}/>
                        <Route path="producto_ok" element={<MsgProductOk/>}/>
                        {/* <Route path=":idProduct/editar" element={<EditProduct />} /> */}
                    </Route>
                    :
                    <Route path="admin/*" element={<Navigate to='/' replace />}/>
                }
                
            </Route>
            <Route path="*" element={<h1>Error!!</h1>} />
        </Routes>
    )
}
export default RoutesComponent;