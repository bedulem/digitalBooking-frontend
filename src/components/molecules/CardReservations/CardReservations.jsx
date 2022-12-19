
import { useNavigate } from "react-router-dom";
import { Button, Rate } from "../../atoms"
import './CardReservations.css';


function CardReservations({ item }){
    const navigate = useNavigate();
    const idReservation = item.id
    const deleteReservation = ()=>{
        navigate('cancelar/'+idReservation);
    }

    
    return(
        <div className="card-reservation">
            <div className="card-reservation__image">
                <img className="img-product" src={item.product.images[0]?.url} alt="foto" />
            </div>
            <div className="card-reservation__body">
                <div>
                    <span className="rate-text">{item.product.category.title}</span>
                    <Rate starts={item.product.stars} />
                    <h2 className="card-reservation__title">{item.product.title}</h2>
                </div>
                <div>
                    <p>{item.product.city.name}, {item.product.city.country}</p> 
                    <p>Check-in: {item.checkIn}</p> 
                    <p>Check-out: {item.checkOut}</p>
                </div>
                <Button  variant="filled" onClick={deleteReservation}>Cancelar</Button>
            </div>
            
        </div>
    )

}

export default CardReservations