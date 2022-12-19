import { faChevronLeft, faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Divider, Paper, Rate, TextRate } from "../../components/atoms";
import './Details.css';
import { ServicesList } from "../../components/molecules";
import { DateRange } from 'react-date-range';
import { getBreakpoint } from "../../utils/getBreakpoint";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useSessionContext } from "../../context/AuthContext";
import { getDatesRange } from "../../utils/getDatesRange";
import { useConfigContext } from "../../context/ConfigContext";
import { authorizedFetch } from "../../utils/authorizedFetch";

const breakpointColumn = ['xs', 'sm', 'md'];

const Details = () => {
    const { idProduct } = useParams();
    const { session } = useSessionContext();
    const {config, setValue}= useConfigContext();
    const [product, setProduct] = useState(null);
    const [breakpoint, setBreakpoint] = useState(0);
    const [disabledDates, setDisabledDates] = useState([]);
    const [openGalery, setOpenGalery] = useState(false);
    const navigate = useNavigate();
    const [heart, setHeart] = useState(false)
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    

    async function loadInfo() {
        try {
            const request = await fetch(`${process.env.REACT_APP_API_BACK}/products/${idProduct}`);
            const info = await request.json();


            setProduct(info);
            session && getFavourites()

        } catch (error) { }

    }
    const getFavourites = useCallback(async()=>{
        try{
            const res =  await fetch(process.env.REACT_APP_API_BACK+'/favourites/'+session.id)
            const response = await res.json()
            const fav= response.map((e)=>e.id)
            setHeart(fav?.includes(+idProduct))
        }
        catch(error){
            console.log(error)
        }

    }, [session,idProduct])

    const handelFavorites=(idProd)=>{
        const path = process.env.REACT_APP_API_BACK+'/favourites'
        if(session){
            if(!heart){
                setHeart(true);
                const data = {id:idProd}
                try {
                    authorizedFetch(path, { body: JSON.stringify(data), method: 'POST' })
                } catch (error) {
                    console.log(error);
                }
                
            }else{
                setHeart(false);
                try {
                    authorizedFetch(path+'/'+idProd, {  method: 'DELETE' })
                } catch (error) {
                    console.log(error);
                }
            }
        }else{
            navigate(`/iniciar-sesion`)
        }
    }
    const handleReservation = (start,end) => {
        if(state[0].endDate > state[0].startDate){
            setValue("dates", `${start} ~ ${end}`);
        }
        if (session) {
            navigate('reserva');
        } else {
            navigate(`/iniciar-sesion?redirect=/producto/${idProduct}/reserva`);
        }
    }
    

    useEffect(() => {
        const setResized = () => {
            setBreakpoint(getBreakpoint());
        }
        loadInfo();

        setResized();
        window.addEventListener('resize', setResized, false);

        if(config?.dates){
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
    }, [])

    useEffect(() => {
        const newDisabledDates = [];
        product?.bookings.forEach(booking => {
            const dates = getDatesRange(booking.checkIn, booking.checkOut);
            newDisabledDates.push(...dates);
        });
        setDisabledDates(newDisabledDates);
    }, [product])


    const handleOpenGallery = () => {
        setOpenGalery(!openGalery);
    }

    useEffect(() => {
        setStart(state[0].startDate.toISOString().split('T')[0])
        setEnd(state[0].endDate.toISOString().split('T')[0])

    },[state])

    useEffect(() => {

    },[heart])


    return (
        <div>
            <Container className="product-header">
                <div>
                    <p>{product?.category.title} <Rate starts={product?.stars} /></p>
                    <h1>{product?.title}</h1>
                </div>
                <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft} size="2x" /></button>
            </Container>
            <Container className="product-location">
                <div className="product-location__info">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <div>
                        <p>{product?.city.name}, {product?.city.country}</p>
                        {product?.nearLocation ? <p>{product.nearLocation}</p> : null}
                    </div>
                </div>
                <TextRate rate={product?.rate} />
            </Container>
            <Container className="product-content">
                <div className="product-content__actions">
                    <img src="/images/icons/share.svg" alt="compartir" size='2x' />
                    <img src={heart?'/images/icons/full-heart.svg':'/images/icons/heart.svg'} alt="heart" size='2x'   onClick={()=>handelFavorites(product.id)}/>
                </div>

                {
                    !breakpointColumn.includes(breakpoint) ?
                        <div className="product-content__gallery">

                            <div className="product-content__gallery-images">
                                {
                                    product?.images?.map((img, index)=>{
                                        return index <= 4 ?
                                        <img key={index} src={img.url} alt={img.title} />
                                        : <></>
                                    })
                                }
                                <button onClick={handleOpenGallery}>Ver más</button>
                            </div>
                        </div>
                        :
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                type: "fraction",
                            }}
                            style={{ maxHeight: '300px', width: '100%', borderRadius: '10px', color: 'white' }}
                        >
                            {
                                product?.images?.map((img, index)=>{
                                    return <SwiperSlide><img key={index} src={img.url} alt={img.title} className="img-swip" /></SwiperSlide>
                                })
                            }
                        </Swiper>
                }
            </Container >
            <Container className="product-description">
                <h2 className="subtitle">{product?.slogan}</h2>
                <p>{product?.description}</p>
            </Container>
            <Container className="product-services">
                <h2 className="subtitle">¿Qué ofrece este lugar?</h2>
            </Container>
            <Divider />
            <Container className="Product-services__container">
                <ServicesList services={product?.features} className="product-services__items" variant="secondary" />
            </Container>
            <Container className="product-dates">
                <h2 className="subtitle">Fechas disponibles</h2>
                <div className="product-dates__container">
                    <div>
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
                    <Paper shadow="lg" className="card-btn-reservation">
                        <p>Agregá tus fechas de viaje para obtener precios exactos</p>
                        <Button variant="filled" fullWidth onClick={()=>handleReservation(start,end)}>Iniciar reserva</Button>
                    </Paper>
                </div>
            </Container>
            <Container className="product-services">
                <h2 className="subtitle">¿Dónde vas a estar?</h2>
            </Container>
            <Divider />
            <Container>
                <p>{product?.city.name} {product?.city.country}</p>
                {product?.title && <iframe
                    frameBorder="0"
                    title="map"
                    className="product-map"
                    referrerPolicy="no-referrer-when-downgrade"
                    // TODO LAT & LON : &location=46.414382,10.013988
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${product.title},${product.city.name}`}
                    allowFullScreen>
                </iframe>
                }
            </Container>
            <Container className="product-services">
                <h2 className="subtitle">¿Qué tenés que saber?</h2>
            </Container>
            <Divider />
            <Container className="product-feat">
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
            {
                openGalery && <div className="lightbox">
                    <div className="lightbox__container">
                        <span className="lightbox__close" onClick={handleOpenGallery}>X</span>
                        <Swiper
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation, Thumbs, FreeMode]}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            className="lightbox__gallery"
                            pagination={{
                                type: "fraction",
                            }}
                        >
                            {
                                product?.images?.map((img, index)=>{
                                    return <SwiperSlide><img key={index} src={img.url} alt={img.title}  className="img-swip" /></SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            }
        </div >
    )
};
export default Details;
