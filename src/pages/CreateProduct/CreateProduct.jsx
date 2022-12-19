import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, CustomSelect, Input, Paper, Select, Textarea } from '../../components/atoms';
import { ICONS, SERVICE_ICONS } from '../../constants/icons';
import { authorizedFetch } from '../../utils/authorizedFetch';
import './CreateProduct.css';

const optionsList = Object.values(ICONS).map(({ id, icon }) => ({
    value: id,
    icon,
}));

const CreateProduct = () => {
    const [imagesUrls, setImagesUrls] = useState([]);
    const [errors, setErrors] = useState(null);
    const [errorRequest, setErrorRequest] = useState(null);
    const [errorsImages, setErrorsImages] = useState(null);
    const [listAttributes, setListAttributes] = useState([]);
    const [dataResponse, setDataResponse] = useState({
        categories: [],
        cities: [],
        features: [],
    });
    const [attributes, setAttributes] = useState([]);
    const [policies, setPolicies] = useState({
        rule: [],
        health: [],
        cancellation: [],
    });
    const navigate = useNavigate();
    const inputImageRef = useRef(null);
    const inputTitleRef = useRef(null);
    const inputRuleRef = useRef(null);
    const inputHealthRef = useRef(null);
    const inputCancellationRef = useRef(null);

    const inputNameRef = useRef(null);
    const selectIconRef = useRef({
        value: 0
    });
    const selectDefinedRef = useRef({
        value: 0
    });

    const getData = useCallback(async () => {
        try {
            const categories = await fetch(process.env.REACT_APP_API_BACK + '/categories/')
            const categoriesJson = await categories.json()
            const cities = await fetch(process.env.REACT_APP_API_BACK + '/cities/')
            const cititesJson = await cities.json()
            const features = await fetch(process.env.REACT_APP_API_BACK + '/features/')
            const featuresJson = await features.json()
            setListAttributes(featuresJson.map(({ id, name, iconId }) => (
                {
                    value: id,
                    label: name,
                    icon: ICONS[`icon-${iconId}`].icon,
                })))
            setDataResponse({
                categories: categoriesJson,
                cities: cititesJson,
                features: featuresJson,
            })
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getData()
    }, [getData])


    const addImage = () => {
        const image = inputImageRef.current.value;
        const title = inputTitleRef.current.value;
        const isFormatValid = image.match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i) != null;
        if (!isFormatValid) {
            setErrorsImages('Por favor agregue una url de imagen valida');
            return;
        }
        if (image && title) {
            setImagesUrls([...imagesUrls, {
                title,
                url: image
            }]);
            inputImageRef.current.value = '';
            inputTitleRef.current.value = '';
            setErrorsImages(null);
            if (imagesUrls.length >= 4) {
                setErrors({
                    ...errors,
                    images: undefined
                })
            }
        } else {
            setErrorsImages('Please fill all fields');
        }
    }

    const removeImage = (index) => {
        setImagesUrls(imagesUrls.filter((_, i) => i !== index));
    }

    const addPolicy = (type) => {
        if (type === 'rule') {
            const rule = inputRuleRef.current.value;
            if (rule) {
                setPolicies({
                    ...policies,
                    rule: [...policies.rule, rule]
                });
                inputRuleRef.current.value = '';
                setErrors({
                    ...errors,
                    rule: undefined
                })
            }
        } else if (type === 'health') {
            const health = inputHealthRef.current.value;
            if (health) {
                setPolicies({
                    ...policies,
                    health: [...policies.health, health]
                });
                inputHealthRef.current.value = '';
                setErrors({
                    ...errors,
                    health: undefined
                })
            }
        }
        else if (type === 'cancellation') {
            const cancellation = inputCancellationRef.current.value;
            if (cancellation) {
                setPolicies({
                    ...policies,
                    cancellation: [...policies.cancellation, cancellation]
                });
                inputCancellationRef.current.value = '';
                setErrors({
                    ...errors,
                    policies: undefined
                })
            }
        }
    }

    const addAttr = () => {
        const name = inputNameRef.current.value;
        const icon = selectIconRef.current.value;
        const isExist = attributes.find(attr => attr.name.toLowerCase() === name.toLowerCase());
        const isDefault = dataResponse.features.find(attr => attr.name.toLowerCase() === name.toLowerCase());
        if (isExist || isDefault) {
            setErrors({
                ...errors,
                attributes: 'Ya existe un atributo con ese nombre'
            });
            return;
        }
        if (name && icon) {
            setAttributes([...attributes, {
                name,
                iconId: icon
            }]);
            inputNameRef.current.value = '';
            setErrors({
                ...errors,
                attributes: undefined
            });
        }
    }

    const removePolicy = (type, index) => {
        if (type === 'rule') {
            const newRule = policies.rule.filter((_, i) => i !== index);
            setPolicies({
                ...policies,
                rule: newRule
            });
            if (newRule.length < 1) {
                setErrors({
                    ...errors,
                    rule: 'Por favor agrega al menos 1 política'
                });
            }
        } else if (type === 'health') {
            const newHealth = policies.health.filter((_, i) => i !== index);
            setPolicies({
                ...policies,
                health: newHealth
            });
            if (newHealth.length < 1) {
                setErrors({
                    ...errors,
                    health: 'Por favor agrega al menos 1 política'
                });
            }
        }
        else if (type === 'cancellation') {
            const newCancellation = policies.cancellation.filter((_, i) => i !== index);
            setPolicies({
                ...policies,
                cancellation: newCancellation
            });
            if (newCancellation.length < 1) {
                setErrors({
                    ...errors,
                    policies: 'Por favor agrega al menos 1 política'
                });
            }
        }
    }


    const addDefaultAttr = () => {
        const id = selectDefinedRef.current.value;
        const selected = dataResponse.features.find((attr) => attr.id === id);
        const isExist = attributes.find(attr => attr.name.toLowerCase() === selected.name.toLowerCase());
        if (isExist) {
            setErrors({
                ...errors,
                attributes: 'Ya existe un atributo con ese nombre'
            });
            return;
        }
        if (id && selected) {
            setAttributes([...attributes, {
                id: selected.id,
                name: selected.name,
                iconId: selected.iconId
            }]);
            setErrors({
                ...errors,
                attributes: undefined
            });
        }
    }

    const removeAttr = (index) => {
        const newAttributes = attributes.filter((_, i) => i !== index);
        setAttributes(newAttributes);
        if (newAttributes.length < 1) {
            setErrors({
                ...errors,
                attributes: 'Por favor agrega al menos 1 atributo'
            });
        }
    }

    const validateData = (formData) => {
        const values = Object.fromEntries(formData.entries());
        const currentErrors = {};
        Object.keys(values).forEach((key) => {
            if (values[key] === '') {
                currentErrors[key] = 'Este campo es requerido';
            }
        });
        if (imagesUrls.length < 5) {
            currentErrors.images = 'Por favor sube al menos 5 imágenes';
        }
        if (attributes.length < 1) {
            currentErrors.attributes = 'Por favor agrega al menos 1 atributo';
        }
        if (policies.rule.length < 1) {
            currentErrors.rule = 'Por favor agrega al menos 1 politica';
        }
        if (policies.health.length < 1) {
            currentErrors.health = 'Por favor agrega al menos 1 politica';
        }
        if (policies.cancellation.length < 1) {
            currentErrors.policies = 'Por favor agrega al menos 1 politica';
        }

        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const isValid = validateData(formData);
        if (!isValid) {
            return;
        }
        const { category, city, ...others } = Object.fromEntries(formData.entries());
        const data = {
            ...others,
            images: imagesUrls,
            category: {
                id: +category,
            },
            city: {
                id: +city,
            },
            healthSecurity: policies.health.map((item) => ({
                description: item
            })),
            policies: policies.cancellation.map((item) => ({
                description: item
            })),
            rules: policies.rule.map((item) => ({
                description: item,
            })),
            features: attributes
        };
        try {
            const res = await authorizedFetch(
                `${process.env.REACT_APP_API_BACK}/products`,
                { body: JSON.stringify(data), method: 'POST' }
            )
            if (!res.ok) {
                throw new Error('Error al crear propiedad');
            }
            navigate('/admin/producto_ok');
        } catch (error) {
            setErrorRequest("No se pudo crear la propiedad, por favor intenta más tarde");
        }
    }

    const handleResetError = (e) => {
        setErrors({
            ...errors,
            [e.target.name]: undefined,
        });
    }

    return (
        <>
            <Container className="product-header">
                <h1>Administración de Productos</h1>
                <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft} size="2x" /></button>
            </Container>
            <Container>
                <h2 className='create-subtitle'>Crear Propiedad</h2>
                <form id="form-create" onSubmit={handleSubmit}>
                    <Paper>
                        <div className='create-grid'>
                            <Input type='text' onChange={handleResetError} error={!!errors?.title} helperText={errors?.title} placeholder="Hotel name" label='Nombre de la propiedad' name="title" required />
                            <Select defaultValue="" change={handleResetError} error={!!errors?.category} helperText={errors?.category} label='Categoria' name="category" fullWidth required>
                                <option value="" hidden>Seleccione</option>
                                {
                                    dataResponse && dataResponse.categories?.map(({ id, title }) => (
                                        <option key={id} value={id}>{title}</option>
                                    ))
                                }
                            </Select>
                            <Input type='text' onChange={handleResetError} placeholder="Av. Colón 1643" error={!!errors?.address} helperText={errors?.address} label='Dirección' name="address" required />
                            <Select defaultValue="" label='Ciudad' change={handleResetError} error={!!errors?.city} helperText={errors?.city} name="city" fullWidth required>
                                <option value="" hidden>Seleccione</option>
                                {
                                    dataResponse && dataResponse.cities?.map(({ id, name, country }) => (
                                        <option key={id} value={id}>{`${name}, ${country}`}</option>
                                    ))
                                }
                            </Select>
                            <Input type='text' onChange={handleResetError} placeholder="A 900m del centro" error={!!errors?.nearLocation} helperText={errors?.nearLocation} label='Lugares cerca' name="nearLocation" required />
                            <Select defaultValue="" change={handleResetError} label="Estrellas" name="stars" fullWidth required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Select>
                            <Input onChange={handleResetError} type='text' error={!!errors?.latitude} helperText={errors?.latitude} label='Latitud' name="latitude" required />
                            <Input onChange={handleResetError} type='text' error={!!errors?.longitude} helperText={errors?.longitude} label='Longitud' name="longitude" required />
                            <Input onChange={handleResetError} className="span-2" type='text' error={!!errors?.slogan} helperText={errors?.slogan} label='Slogan' name="slogan" required />
                            <Textarea className="span-2" onChange={handleResetError} error={!!errors?.description} helperText={errors?.description} label='Descripción' name="description" fullWidth required />
                        </div>
                        <h2 className='create-subtitle'>Agregar atributos</h2>
                        <div className="sub-container">
                            <h3 className='title-3'>Predefinidos</h3>
                            <div className='defined-grid'>
                                <CustomSelect selectRef={selectDefinedRef} label="Nombre" optionsList={listAttributes} required />
                                <Button onClick={addDefaultAttr} className="btn-add" fullWidth onlyIcon><FontAwesomeIcon icon={faPlus} size="2x" /></Button>
                            </div>
                            <h3 className='title-3'>Nuevo atributo</h3>
                            <div className='attr-grid'>
                                <Input refInput={inputNameRef} type='text' label='Nombre' required />
                                <CustomSelect selectRef={selectIconRef} label="Icono" optionsList={optionsList} required />
                                <Button onClick={addAttr} className="btn-add" fullWidth onlyIcon><FontAwesomeIcon icon={faPlus} size="2x" /></Button>
                            </div>
                            <div className='container-badge'>
                                {attributes.map(({ name, iconId }, index) => (
                                    <div key={index} className='item-badge'>
                                        <div className='text-badge'>
                                            <FontAwesomeIcon icon={ICONS[`icon-${iconId}`]?.icon} />
                                            <p>{name}</p>
                                        </div>
                                        <span onClick={() => removeAttr(index)} className='close-badge'>x</span>
                                    </div>
                                ))}
                            </div>
                            {errors && errors?.attributes && <Alert type="danger">{errors?.attributes}</Alert>}

                        </div>
                        <h2 className='create-subtitle'>Politicas del producto</h2>
                        <div className="sub-container">
                            <div className='policies-grid'>
                                <div>
                                    <h3 className='title-3'>Normas de la casa</h3>
                                    <div className='group-policy'>
                                        <Textarea inputRef={inputRuleRef} rows={2} fullWidth label='Descripción' />
                                        <Button onClick={() => addPolicy('rule')} className="btn-add" onlyIcon><FontAwesomeIcon icon={faPlus} size="2x" /></Button>
                                    </div>
                                    {
                                        policies.rule.length > 0 &&
                                        <ul>
                                            {policies.rule.map((item, index) => (
                                                <li key={index}>{item} <span onClick={() => removePolicy('rule', index)} className='list-close'>x</span></li>
                                            ))}
                                        </ul>
                                    }
                                    {errors && errors?.rule && <Alert type="danger">{errors?.rule}</Alert>}

                                </div>
                                <div>
                                    <h3 className='title-3'>Salud y seguridad</h3>
                                    <div className='group-policy'>
                                        <Textarea inputRef={inputHealthRef} rows={2} fullWidth label='Descripción' />
                                        <Button onClick={() => addPolicy('health')} className="btn-add" onlyIcon><FontAwesomeIcon icon={faPlus} size="2x" /></Button>
                                    </div>
                                    {
                                        policies.health.length > 0 &&
                                        <ul>
                                            {policies.health.map((item, index) => (
                                                <li key={index}>{item} <span onClick={() => removePolicy('health', index)} className='list-close'>x</span></li>
                                            ))}
                                        </ul>
                                    }
                                    {errors && errors?.health && <Alert type="danger">{errors?.health}</Alert>}

                                </div>
                                <div>
                                    <h3 className='title-3'>Política de cancelación</h3>
                                    <div className='group-policy'>
                                        <Textarea inputRef={inputCancellationRef} rows={2} fullWidth label='Descripción' />
                                        <Button onClick={() => addPolicy('cancellation')} className="btn-add" onlyIcon><FontAwesomeIcon icon={faPlus} size="2x" /></Button>
                                    </div>
                                    {
                                        policies.cancellation.length > 0 &&
                                        <ul>
                                            {policies.cancellation.map((item, index) => (
                                                <li key={index}>{item} <span onClick={() => removePolicy('cancellation', index)} className='list-close'>x</span></li>
                                            ))}
                                        </ul>
                                    }
                                    {errors && errors?.policies && <Alert type="danger">{errors?.policies}</Alert>}

                                </div>
                            </div>
                        </div>
                        <h2 className='create-subtitle'>Cargar Imagenes</h2>
                        <div className="sub-container">
                            <div className='img-grid'>
                                <Input refInput={inputTitleRef} type='text' label='Titulo' required />
                                <Input refInput={inputImageRef} type='text' placeholder="https://" label='Enlace' required />
                                <Button onClick={addImage} className="btn-add" fullWidth onlyIcon><FontAwesomeIcon icon={faPlus} size="2x" /></Button>
                            </div>
                            {errorsImages && <Alert type="danger">{errorsImages}</Alert>}
                            {errors && errors?.images && <Alert type="danger">{errors?.images}</Alert>}
                            <div className='img-container'>
                                {imagesUrls?.map(({ url, title }, index) => (
                                    <div key={index} className='img-item'><img src={url} alt="Imagen" /><span onClick={() => removeImage(index)}>x</span><p>{title}</p></div>
                                ))}
                            </div>
                        </div>
                        <div className='btn-center'>
                            <Button type="submit" form="form-create">Crear</Button>
                            {errorRequest && <Alert type="danger">{errorRequest}</Alert>}
                        </div>
                    </Paper>
                </form>
            </Container>
        </>

    )
};
export default CreateProduct;
