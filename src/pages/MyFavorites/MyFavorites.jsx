import { useCallback, useEffect, useState } from 'react';
import { CardDetails } from '../../components/molecules';
import { useSessionContext } from '../../context/AuthContext';
import './MyFavorites.css';

const MyFavorites = () => {
    const {session}= useSessionContext();

    const [data, setData] = useState([])
    const [favourites, setFavourites] = useState([])
    const [load, setLoad] = useState(true)

    const buildUrl = useCallback(()=>{
        let path= process.env.REACT_APP_API_BACK+'/favourites'
        if(session){
            return path + '/' + session.id
        }
        
        
    },[ session])


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
        getFavourites()
    },[ getData, getFavourites])


    return (
        <section className=' conteiner'>
            <h2>Mis Favoritos</h2>
            <div className='my_favorites'>
            {
                !load &&
                data.length>0?
                data.map((card, idx) => (
                    <CardDetails key={idx} item={card}  favourite={favourites?.includes(card.id)}  />
                )):
                <div className="section-no-reserv">
                    <img src="/images/icons/close.svg" alt="Cruz" />
                    <h3>Todavía no tienes favoritos.</h3>
                </div>
            }
            </div>
        </section>

    )
};
export default MyFavorites;
