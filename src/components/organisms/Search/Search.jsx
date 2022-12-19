

import Button from '../../atoms/Button';
import {InputSearchCity, InputSearchDate} from '../../molecules';
import './Search.css'
import {useRef} from 'react';
import {useConfigContext} from '../../../context/ConfigContext'



const Search = () => {
    const inputRefCity = useRef();
    const inputRefDate = useRef();

    const {setValues} = useConfigContext(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if(inputRefCity.current.value){
            setValues({"dates": inputRefDate.current.value, "city": inputRefCity.current.value==='all' ? null : inputRefCity.current.value });
        }

    }
    return (
        <div className="content-search">
            <h1 className="fc-white fw-700">Busca ofertas en hoteles, casas y mucho más</h1>
            <form className="input-container" onSubmit={onSubmit}>
                <InputSearchCity inputRef={inputRefCity} />
                <InputSearchDate inputRef={inputRefDate} />
                <Button type="submit" variant="filled">Buscar</Button>
            </form>
        </div>
    )
}



export default Search;
