import { useCallback, useEffect, useState } from 'react';
import { CardReservations } from '../../components/molecules';
import { useSessionContext } from '../../context/AuthContext';
import './MyReservations.css';

const MyReservations = () => {

    const {session}= useSessionContext();

    const [data, setData] = useState([])


    const buildUrl = useCallback(()=>{
        let path= process.env.REACT_APP_API_BACK+'/bookings/users/'
        if(session){
            return path + session.id
        }
    },[session])

    const getData = useCallback(async()=>{
        try{
            const res = await fetch(buildUrl())
            const response = await res.json()
            setData(response)
        }
        catch(error){
            console.log(error)
        }
    }, [buildUrl])

    

    useEffect(() => {
        getData()
    },[ getData])

    return (
        <div className="secction-reservation">
            <h2>Mis Reservas</h2>
            <div className='reservas'>
            {
                data.length>0?
                data.map((card, idx) => (
                    <CardReservations key={idx} item={card}  />
                )):
                <div className="section-no-reserv">
                    <img src="/images/icons/close.svg" alt="Cruz" />
                    <h3>Todavía no tienes reservas.</h3>
                </div>
            }
            </div>
        </div>

    )
};
export default MyReservations;
