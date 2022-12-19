import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/atoms";
import './Eliminar.css'

const Eliminar = () => {
    const [product, setProduct] = useState(null);
    
    const navigate = useNavigate();
    const { idProducto } = useParams();
    const path = process.env.REACT_APP_API_BACK+'/products/'+idProducto


    const deleteProduct = async()=>{
        try{
            await fetch(path, {
                method:'DELETE'
            })
            navigate('/admin');
        }
        catch(error){
            console.log(error)
        }
    }
    const loadInfo = useCallback(async ()=>{
        try {
            const request =await fetch(path);
            const info = await request.json();
            setProduct(info);

        } catch (error) { }

    })

    useEffect(()=>{
        loadInfo();
    },[loadInfo])

    return (
        <div className="msg-reservation-ok">
            <div className="content">
                <img src="/images/icons/exclamation.svg" alt="Cruz" />
                <p className="fw-700">¿Estas seguro que deseas ELIMINAR El prodcuto {product?.title}?</p>
                <div className="button_box">
                    <Button variant="filled"  onClick={() => navigate(-1)}>no</Button>
                    <Button variant="filled" onClick={deleteProduct}>si</Button>
                </div>
            </div>
        </div>
    )
}

export default Eliminar;