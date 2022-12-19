import { useNavigate } from "react-router-dom";
import { Button, Rate } from "../../atoms"
import './CardAdminProduct.css';


function CardAdminProduct({ item }){
    const navigate = useNavigate();
    const idProducto = item.id
    const deleteProduct = ()=>{
        navigate('eliminar/'+idProducto);
    }
    return(
        <div className="card-reservation">
            <div className="card-reservation__image">
                <img className="img-product" src={item.images[0]?.url} alt="foto" />
            </div>
            <div className="card-reservation__body">
                <div>
                    <span className="rate-text">{item.category.title}</span>
                    <Rate starts={item.stars} />
                    <h2 className="card-reservation__title">{item.title}</h2>
                    <span className="card-id">Id: {item.id}</span>
                </div>
                <div>
                    <p>{item.city.name}, {item.city.country}</p> 
                </div>
                <Button  variant="filled" onClick={deleteProduct}>Eliminar</Button>
            </div>
            
        </div>
    )

}

export default CardAdminProduct