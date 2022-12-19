import { useEffect, useState } from 'react';
import {useConfigContext} from '../../../context/ConfigContext'
import useFetch from '../../../useFetch';
import setClassName from '../../../utils/setClassName';

function Card(props){

    const{ name, image, id }= props


    const {setValue } = useConfigContext(null);
    const {config}= useConfigContext();

    const [activeCard, setActiveCard] = useState(config?.category === id)

    
    const filterCategory = (id)=>{
        if(config?.category === id){
            setValue("category", null)
        }else{
            setValue("category", id);

        }
    }

    useEffect(()=>{
        setActiveCard(config?.category === id)
    },[config, id])

    const dataProduct = useFetch(process.env.REACT_APP_API_BACK+'/products?category='+id)
        

    return (
        <div className={setClassName('card', {'active': activeCard})} onClick={()=>filterCategory(id)}>
            <img src={image} className="img-card" alt="foto" />
            <div className="header-card fc-primary-dark fw-700">
                <h4 >{name}</h4>
                <p > {dataProduct.length} {name}</p>
            </div>
        </div>
    )
}

export default Card