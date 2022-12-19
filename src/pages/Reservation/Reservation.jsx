import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Container, Divider, Input, Paper, Rate, Select } from '../../components/atoms';
import { useSessionContext } from '../../context/AuthContext';
import { authorizedFetch } from '../../utils/authorizedFetch';
import { useConfigContext } from '../../context/ConfigContext';
import { getBreakpoint } from '../../utils/getBreakpoint';
import { getDatesRange } from '../../utils/getDatesRange';
import './Reservation.css';

const breakpointColumn = ['xs', 'sm', 'md', 'lg', 'xl'];

const Reservation = () => {
    const { idProduct } = useParams();
    const { session } = useSessionContext();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [errors, setErrors] = useState(null);
    const [disabledDates, setDisabledDates] = useState([]);
    const [breakpoint, setBreakpoint] = useState(0);
    const { config, setValue } = useConfigContext();
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const loadInfo = async () => {
        try {
            const request = await fetch(`${process.env.REACT_APP_API_BACK}/products/${idProduct}`);
            const info = await request.json();
            setProduct(info);
        } catch (error) {
            console.log(error);
        }

    }
    const isValidData = (formData) => {
        const errorsFields = [];
        if (state[0].startDate >= state[0].endDate) {
            errorsFields.push('El check-out debe ser posterior al check-in');
        }
        if (!formData.get('startTime')) {
            errorsFields.push('Debe seleccionar una hora de check-in');
        }
        setErrors(errorsFields);
        return errorsFields.length <= 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (!isValidData(formData)) {
            return;
        }
        const data = {
            startTime: formData.get('startTime'),
            checkIn: state[0].startDate.toISOString().split('T')[0],
            checkOut: state[0].endDate.toISOString().split('T')[0],
            covidVaccinated: formData.get('covid') === 'on',
            othersComments: formData.get('comment'),
            user: {
                id: session.id
            },
            product: {
                id: +idProduct
            }
        };
        try {
            authorizedFetch(`${process.env.REACT_APP_API_BACK}/bookings`, { body: JSON.stringify(data), method: 'POST' })
            navigate('/producto/gracias');
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }

    useEffect(() => {
        const setResized = () => {
            setBreakpoint(getBreakpoint());
        }
        loadInfo();

        setResized();
        window.addEventListener('resize', setResized, false);
        if (config?.dates) {
            setValue(`${config.dates}`)
            const dataDate = config?.dates.split(' ~ ')
            const startDate = dataDate[0].replace('-','/')
            const endDate = dataDate[1].replace('-','/')
            setState([
                {
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    key: 'selection'
                }
            ])
        }

        return () => {
            window.removeEventListener('resize', setResized, false);
        }
    }, []);

    useEffect(() => {
        const newDisabledDates = [];
        product?.bookings.forEach(booking => {
            const dates = getDatesRange(booking.checkIn, booking.checkOut);
            newDisabledDates.push(...dates);
        });
        setDisabledDates(newDisabledDates);
    }, [product])

    return (
        <form onSubmit={handleSubmit}>
            <Container className="reservation-header">
                <div>
                    <p>{product?.category.title}</p>
                    <h1>{product?.title || 'Loading...'}</h1>
                </div>
                <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft} size="2x" /></button>
            </Container>
            <Container className="section-title">
                <h2 className="reservation-subtitle">Completá tus datos</h2>
            </Container>
            <Container className="reservation-content">
                <div className='content-1'>
                    <Paper className="client-form">
                        <Input label="Nombre" name="name" value={session?.name} disabled />
                        <Input label="Apellido" name="lastName" value={session?.lastName} disabled />
                        <Input label="Correo electrónico" name="email" type="email" value={session?.email} disabled />
                        <Input label="Ciudad" name="city" placeholder="Ingresa tu ciudad de origen" />
                        <div className="covid">
                            <label htmlFor="covid">¿Está vacunado contra el COVID-19?</label>
                            <input type="checkbox" id="covid" name="covid" style={{boxShadow:'none'}}/>
                        </div>
                        <div className="comment">
                            <label htmlFor="comment">Comentarios</label>
                            <textarea name="comment" id="comment" placeholder="Ingresa algun comentario que quieras hacerle al hospedaje."></textarea>
                        </div>
                    </Paper>
                </div>
                <div className='content-2'>
                    <Paper>
                        <h2 className="reservation-subtitle">Detalle de la reserva</h2>
                        <img src={product?.images[0].url} alt={product?.title} className="reservation-img" />
                        <div>
                            <span>{product?.category.title}</span>
                            <h3>{product?.title}</h3>
                            <Rate starts={product?.stars} />
                            <div className="reservation-location">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <div>
                                    <p>{product?.city.name}, {product?.city.country}</p>
                                    {product?.nearLocation ? <p>{product.nearLocation}</p> : null}
                                </div>
                            </div>
                            <Divider />
                            <div className='date-selected'>
                                <p>Check in</p>
                                <p>{state[0].startDate.toLocaleDateString()}</p>
                            </div>
                            <Divider />
                            <div className='date-selected'>
                                <p>Check out</p>
                                <p>{state[0].endDate.toLocaleDateString()}</p>
                            </div>
                            <Divider />
                            <Button fullWidth type="submit">Confirmar reserva</Button>
                            {
                                errors?.length > 0 &&
                                <Alert type="danger">
                                    <ul className="error-list">
                                        {errors?.map((error, index) => (
                                            <li key={index} >{error}</li>
                                        ))}
                                    </ul>
                                </Alert>
                            }
                        </div>
                    </Paper>
                </div>
                <div className='content-3'>
                    <h2 className="reservation-subtitle">Seleccioná tu fecha de reserva</h2>
                    <Paper>
                        <div className="">
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
                                disabledDates={disabledDates}
                            />
                        </div>
                    </Paper>
                </div>
                <div className='content-4'>
                    <h2 className="reservation-subtitle">Tu horario de llegada</h2>
                    <Paper>
                        <p><FontAwesomeIcon icon={faCircleCheck} size="xl" /> Tu habitación va a estar lista para el check-in entre las {"10:00 AM"} y las {"11:00 PM"}</p>
                        <div className='checkin-container'>
                            <Select id="checkin" name="startTime" label="Indicá tu horario estimado de llegada" defaultValue="">
                                <option value="" disabled hidden>Seleccionar hora de llegada</option>
                                {
                                    Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                        <option key={hour} value={`${hour}:00`}>{hour}:00</option>
                                    ))
                                }
                            </Select>
                        </div>
                    </Paper>
                </div>
            </Container>
            <div className='section-about'>
                <Container >
                    <h2 className="reservation-subtitle">¿Qué tenés que saber?</h2>
                </Container>
                <Divider />
                <Container className="reservation-feat">
                    <div>
                        <h4>Normas de la casa</h4>
                        <ul>
                            {
                                product?.rules?.map((rule, index) => (
                                    <li key={index}>{rule.description}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <h4>Salud y seguridad</h4>
                        <ul>
                            {
                                product?.healthSecurity?.map((item, index) => (
                                    <li key={index}>{item.description}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <h4>Politica de cancelación</h4>
                        <ul>
                            <li>Agregá las fechas de tu viaje para obtener los detalles de la cancelación de esta estadia.</li>
                        </ul>
                    </div>
                </Container>
            </div>

        </form >
    )
};
export default Reservation;