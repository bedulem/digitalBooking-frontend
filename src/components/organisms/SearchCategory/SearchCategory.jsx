import { Card } from '../../molecules';
import './SearchCategory.css'
import useFetch from "../../../useFetch";
import Skeleton from 'react-loading-skeleton'
import { useEffect, useState } from 'react';



function SearchCategory(){


    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            fetch(process.env.REACT_APP_API_BACK+'/categories')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            });
        } catch (error) {
            console.log(error)
        }
    },[])

    const loader=()=>{
        return(
            <section className="conteiner1">
            <h2>Buscar por tipo de alojamiento</h2>
            <div className="card-container">
                <div className='card'>
                    <Skeleton height={250}/>
                </div>
                <div className='card'>
                    <Skeleton height={250}/>
                </div>
                <div className='card'>
                    <Skeleton height={250}/>
                </div>
                <div className='card'>
                    <Skeleton height={250}/>
                </div>
            </div>
        </section>
        )
    }
    if(loading){
        return(
            loader()
        )
    }else{
        return(
            <section className="conteiner1">
                <h2>Buscar por tipo de alojamiento</h2>
                <div className="card-container">
                    {data.map((category) =>
                        <Card key={category.id} name={category.title} image={category.urlImage} id={category.id} />
                        )
                    }
                </div>
            </section>
        );
    }

}
export default SearchCategory;