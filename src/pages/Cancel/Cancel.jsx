import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/atoms";
import useFetch from "../../useFetch";
import './Cancel.css'

const Cancel = () => {
    const [reservation, setReservation] = useState(null);
    
    const navigate = useNavigate();
    const { idReservation } = useParams();
    const path = process.env.REACT_APP_API_BACK+'/bookings/'+idReservation


    const deleteReservation = async()=>{
        try{
            await fetch(path, {
                method:'DELETE'
            })
            navigate('/reservas');
        }
        catch(error){
            console.log(error)
        }
    }
    const loadInfo = useCallback(async ()=>{
        try {
            const request =await fetch(path);
            const info = await request.json();
            setReservation(info);

        } catch (error) { }

    })

    useEffect(()=>{
        loadInfo();
    },[loadInfo])

    return (
        <div className="msg-reservation-ok">
            <div className="content">
                <img src="/images/icons/exclamation.svg" alt="Cruz" />
                <p className="fw-700">¿Estas seguro que deseas CANCELAR la reserva del {reservation?.product.title} para el {reservation?.checkIn}?</p>
                <div className="button_box">
                    <Button variant="filled"  onClick={() => navigate(-1)}>no</Button>
                    <Button variant="filled" onClick={deleteReservation}>si</Button>
                </div>
            </div>
        </div>
    )
}

export default Cancel;