import './InputSearchDate.css'
import { DateRange } from 'react-date-range';
import { Button, Paper } from '../../atoms';
import { useEffect, useRef, useState } from 'react';
import { getBreakpoint } from '../../../utils/getBreakpoint';
import {useConfigContext} from '../../../context/ConfigContext'

const breakpointColumn = ['xs', 'sm', 'md'];

const InputSearchDate = ({inputRef}) => {
    const {config, setValue}= useConfigContext();

    const [isOpen, setIsOpen] = useState(false);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);


    const [breakpoint, setBreakpoint] = useState(0);
    useEffect(() => {
        const setResized = () => {
            setBreakpoint(getBreakpoint());
        }
        if(config?.dates){
            setValue(`${config.dates}`)
            inputRef.current.value = `${config.dates}`
            const dataDate = config?.dates.split(' ~ ')
            setState([
                {
                    startDate: new Date(dataDate[0]),
                    endDate: new Date(dataDate[1]),
                    key: 'selection'
                }
            ])
        }

        setResized();
        window.addEventListener('resize', setResized, false);

        return () => {
            window.removeEventListener('resize', setResized, false);
        }
    }, [])

    const containerRefDate = useRef(null);
    useEffect(() => {
        window.addEventListener("click", (e)=> {
            if(!containerRefDate?.current?.contains(e.target)) {
                setIsOpen(false);
            }
        })
    }, []);
    

    useEffect(() => {
        setStart(state[0].startDate.toISOString().split('T')[0])
        setEnd(state[0].endDate.toISOString().split('T')[0])

    },[state])


    const handleOpen = ()=>{
        !isOpen ? setIsOpen(true): setIsOpen(false);
    }
    const handleClose = ()=>{
        if(state[0].endDate > state[0].startDate){
            inputRef.current.value = `${start} ~ ${end}`
        }
        setIsOpen(false);
    }

    return (
        <div className="input-box" ref={containerRefDate}>
            <div  className="conteiner-date" onClick={!isOpen ? handleOpen : handleClose}>
                <div className='input-icon' >
                    <img src='/images/icons/calendar.svg' alt='buscar fecha' />
                </div>
                <input  type="text" className="input-date"  placeholder="Check in - Check out" ref={inputRef} readOnly />
            </div>
            {isOpen && 

                <div className="calendar">
                    <DateRange
                        onChange={item => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        months={breakpointColumn.includes(breakpoint) ? 1 : 2}
                        ranges={state}
                        minDate={new Date()}
                        direction="horizontal"
                        preventSnapRefocus={true}
                        showMonthAndYearPickers={false}
                        rangeColors={['#1DBEB4']}
                        showDateDisplay={false}
                    />
                    {/* <Button onClick={handleClean}> borrar fechas </Button> */}
                    <Button onClick={handleClose} className="btn-calendar"> Aplicar </Button>
                </div>
            }
        </div>
    )
}


export default InputSearchDate;
