import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSessionContext } from "../../../context/AuthContext";
import { authorizedFetch } from "../../../utils/authorizedFetch";
import { Button, Rate, TextRate } from "../../atoms";
import ServicesList from "../ServicesList";
import './CardDetails.css';

const CardDetails = ({ item, favourite }) => {
    const [heart, setHeart] = useState(favourite)
    const {session}= useSessionContext();
    const navigate = useNavigate();

    const handelFavorites=(idProd)=>{
        const path = process.env.REACT_APP_API_BACK+'/favourites'
        if(session){
            if(!heart){
                setHeart(true);
                const data = {id:idProd}
                try {
                    authorizedFetch(path, { body: JSON.stringify(data), method: 'POST' })
                } catch (error) {
                    console.log(error);
                }
                
            }else{
                setHeart(false);
                try {
                    authorizedFetch(path+'/'+idProd, {  method: 'DELETE' })
                } catch (error) {
                    console.log(error);
                }
            }
        }else{
            navigate(`/iniciar-sesion`)
        }
    }

    useEffect(() => {

    },[heart])


    return (
        <div className="card-details">
            <div className="card-details__image">
                <img className="img-heart img-black"  src={heart?'/images/icons/full-heart.svg':'/images/icons/heart.svg'} alt="heart"/>
                <img className="img-heart"  src={heart?'/images/icons/full-heart.svg':'/images/icons/heart.svg'} alt="heart" onClick={()=>handelFavorites(item.id)}/>
                <img className="img-product" src={item.images[0]?.url} alt="hotel" />
            </div>
            <div className="card-details__body">
                <div className="card-details__info">
                    <div className="body-section__container">
                        <div>
                            <span className='rate-text'>{item.category.title}</span>
                            <Rate starts={item.stars} />
                            <h2 className="card-details__title">{item.title}</h2>
                        </div>
                        <TextRate rate={item.rate} />
                    </div>
                    <div className="card-details__location">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{item.nearLocation}</span>
                        <span className="card-details__link">MOSTRAR EN EL MAPA</span></div>
                    <ServicesList services={item.features} noLabels />
                    <div className="card-details__description">
                        <p>
                            {item.description}
                        </p>
                    </div>
                </div>
                <div>
                    <Link to={`/producto/${item.id}`} ><Button fullWidth>Ver más</Button></Link>
                </div>
            </div>
        </div>
    )
};

export default CardDetails;
