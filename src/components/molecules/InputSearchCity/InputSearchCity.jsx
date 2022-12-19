import './InputSearchCity.css'
// import Cities from '../../../constants/cities.json'
import { useEffect, useRef, useState } from 'react';
import useFetch from '../../../useFetch';
import {useConfigContext} from '../../../context/ConfigContext'

const InputSearchCity = ({inputRef}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [valueInput, setValueInput] = useState("¿A dónde vamos?");

    const {config}= useConfigContext();

    const buildUrl = ()=>{
        let path= process.env.REACT_APP_API_BACK+'/cities'
        
        return path
    }

    const data =useFetch(buildUrl())

    const containerRef = useRef(null);

    const selectOut = (e)=> {
        if(!containerRef.current && !containerRef.current?.contains(e.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener("click", (e)=> {
            if(!containerRef.current?.contains(e.target)) {
                setIsOpen(false);
            }
        })
        return () => {
            window.removeEventListener("click", selectOut)
        }
    }, []);

    useEffect(()=>{
        if(config?.city && data.length>0){
            const city = data.find(c => c.id === parseInt(config.city))
            setValueInput(`${city.name}, ${city.country}`)
            inputRef.current.value = city.id
        }
    }, [data, config, inputRef]);

    const cities = data.map((valueInput) => 
        <div key={valueInput.id} id={valueInput.id -1} className="content-city" onClick={(e)=>handleClickSelector(e, valueInput.id)}>
            <div className='select-icon'>
                <img src='/images/icons/localizadorSelect.svg' alt='buscar fecha' />
            </div>
            <div>
                <p className='select-city fw-700'>{valueInput.name}</p>
                <p className='select-country fw-700'>{valueInput.country}</p>
            </div>
        </div>
    );

    function handleClickOpen() {
        window.addEventListener("click", selectOut)
        setIsOpen(!isOpen)
    }

    function  handleClickSelector(e, id) {
        const valueId = e.currentTarget.id;

        inputRef.current.value = id
        setValueInput(`${data[valueId].name}, ${data[valueId].country}`)
        setIsOpen(false);
    }
    function  handleClickSelectorAll() {
        inputRef.current.value = 'all'
        setValueInput("¿A dónde vamos?")
        setIsOpen(false);
    }


    return (
    <div ref={containerRef} className="input-box">
        <div className="select-conteiner" onClick={handleClickOpen} >
            <input  type="text" value={valueInput}  readOnly />
            <input type="text"  ref={inputRef}  hidden/>
            <div className='input-icon'>
                <img src='/images/icons/localizador.svg' alt='buscar fecha' />
            </div>
        </div> 

        {isOpen ? 
        <div className='card-select'>
            <div className={isOpen? "card-select-cities": ""}>
                <div  className="content-city" onClick={handleClickSelectorAll}>
                    <div className='select-icon'>
                        <img src='/images/icons/localizadorSelect.svg' alt='buscar fecha' />
                    </div>
                    <div>
                        <p className='select-city fw-700'>Todos</p>
                    </div>
                </div>
                {cities}
            </div> 
        </div> : ""}

    </div>
    )
}


export default InputSearchCity;
