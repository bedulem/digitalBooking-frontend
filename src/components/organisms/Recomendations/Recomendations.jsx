import React, { useCallback, useEffect, useState } from "react";
// import useFetch from "../../../useFetch";
import { CardDetails } from "../../molecules";
import './Recomendations.css';
import {useConfigContext} from '../../../context/ConfigContext'
import {useSessionContext} from '../../../context/AuthContext'

const Recomendations = () => {

    const {config}= useConfigContext();
    const {session}= useSessionContext();

    const [data, setData] = useState([])
    const [favourites, setFavourites] = useState([])
    const [load, setLoad] = useState(true)
    


    const buildUrl = useCallback(()=>{
        let path= process.env.REACT_APP_API_BACK+'/products'
        const dates= config?.dates?.split(' ~ ')
        const params = []
        if(!config && !session){
            return path+'?order=random'
        }else{
            if(config?.city){
                params.push('city='+config.city)
                if(config?.dates && dates.length > 0){
                    params.push('checkIn='+dates[0]+'&checkOut='+dates[1])
                }
            }
            if(config?.category){
                params.push('category='+config.category)
            }
            return params.length === 0 ? path : path+'?'+params.join('&')
        }
        
        
    },[config, session])

    const getData = useCallback(async()=>{
        try{
            const res = await fetch(buildUrl())
            const response = await res.json()
            setData(response)
            !session && setLoad(false)
        }
        catch(error){
            console.log(error)
        }
    }, [buildUrl, session])

    const getFavourites = useCallback(async()=>{
        try{
            const res =  await fetch(process.env.REACT_APP_API_BACK+'/favourites/'+session.id)
            const response = await res.json()
            const fav= response.map((e)=>e.id)
            setFavourites(fav)
            setLoad(false)
        }
        catch(error){
            console.log(error)
        }

    }, [session])


    useEffect(() => {
        getData()
        session && getFavourites()
        
    },[ config, getData, getFavourites, session ])

    

    return (
        <section className=' conteiner2 '>
            <h2>Recomendaciones</h2>
            <div className='recomendations'>
            {
                !load &&
                data.map((card, idx) => (
                    <CardDetails key={idx} item={card} favourite={favourites?.includes(card.id)} />
                ))
            }
            </div>
        </section>
    )
};

export default Recomendations;