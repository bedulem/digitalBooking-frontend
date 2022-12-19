import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../components/atoms';
import { CardAdminProduct } from '../../components/molecules';
import './Admin.css'


function Admin() {
    const [data, setData] = useState([])
    const[searchValue, setSearchValue] =useState("")
    const handelChange =(event)=>{
        setSearchValue(event.target.value)
    }
    const buildUrl = useCallback(()=>{
        let path= process.env.REACT_APP_API_BACK+'/products'
        if(searchValue){
            return path + '/'+ searchValue
        }
        else{
            return path
        }
    },[searchValue])

    const getData = useCallback(async()=>{
        try{
            const res = await fetch(buildUrl())
            const response = await res.json()
            if(Array.isArray(response)){
                setData(response)
            }else{
                setData([response])
            }
        }
        catch(error){
            setData([])
        }
    }, [buildUrl])


    useEffect(() => {
        console.log(searchValue)
        getData()
    }, [searchValue, getData])

    return (
        <>
            <Container className="product-header">
                <h1>Administración de Productos</h1>
            </Container>
            <Container className="product-location product-filter">
                <input  type="text" className="search-product"  placeholder="Buscar Producto por ID" value={searchValue} onChange={handelChange}/>
                <Link to='crear_producto'><Button variant="outlined">Crear Producto</Button></Link>
            </Container>
            <div className='productos'>
            {
                data.length>0?
                data.map((card, idx) => (
                    <CardAdminProduct key={idx} item={card} />
                )):
                <div className="section-no-reserv">
                    <img src="/images/icons/close.svg" alt="Cruz" />
                    <h3>Todavía no hay productos cargados.</h3>
                </div>
            }
            </div>
        </>

    );
}

export default Admin;