import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Button, Input } from "../../components/atoms";
import { validationConfirmPassword, validationEmail, validationPassword, validationString } from "../../constants/rules";
import { useSessionContext } from "../../context/AuthContext";
import './Register.css';

const INITIAL_ERRORS = {
    name: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
}

const RegisterPage = () => {
    const [errors, setErrors] = useState(INITIAL_ERRORS)
    const navigate = useNavigate();
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [searchParams] = useSearchParams();
    const { register } = useSessionContext();

    const validateData = (data) => {
        const errorsMsg = {};
        errorsMsg.name = validationString(data.name);
        errorsMsg.lastName = validationString(data.lastName);
        errorsMsg.email = validationEmail(data.email);
        errorsMsg.password = validationPassword(data.password);
        errorsMsg.confirmPassword = validationConfirmPassword(data.password, data.confirmPassword);

        if (Object.values(errorsMsg).some((error) => error)) {
            setErrors(errorsMsg);
            return false
        }
        setErrors(INITIAL_ERRORS);
        return true;
    }

    const onChange = (name) => {
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const isValid = validateData(data);
        if (!isValid) {
            return;
        }

        const { confirmPassword, ...dataUser } = data
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataUser)
        }; 

        try {
            await fetch(`${process.env.REACT_APP_API_BACK}/users`, requestOptions);
        } catch (error) { 
            setInvalidCredentials(true);
        }

        const {email, password} =dataUser
        const requestOptionsAuth = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        }; 
        try {
            const requestuAth = await fetch(`${process.env.REACT_APP_API_BACK}/users/authenticate`, requestOptionsAuth);
            const info = await requestuAth.json();
            register(info);
            if (searchParams.get('redirect')) {
                navigate(searchParams.get('redirect'));
            } else {
                navigate('/');
            }
        } catch (error) { 
            setInvalidCredentials(true);
        }


        


    }

    return (
        <>
            <section className="register-container">
                <div className="register-box">
                    <h1 className="title">Crear cuenta</h1>
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="grid-container">
                            <Input
                                onChange={() => onChange('name')}
                                error={!!errors.name}
                                helperText={errors.name}
                                name="name"
                                label="Nombre"
                                fullWidth
                            />
                            <Input
                                onChange={() => onChange('lastName')}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                name="lastName"
                                label="Apellido"
                                fullWidth
                            />
                            <Input
                                onChange={() => onChange('email')}
                                error={!!errors.email}
                                helperText={errors.email}
                                name="email"
                                className="span-2"
                                label
                                ="Correo electrónico" fullWidth />
                            <Input
                                onChange={() => onChange('password')}
                                error={!!errors.password}
                                helperText={errors.password}
                                name="password"
                                className="span-2"
                                type
                                ="password" label="Contraseña" fullWidth />
                            <Input
                                onChange={() => onChange('confirmPassword')}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                name="confirmPassword"
                                className="span-2"
                                type
                                ="password" label="Confirmar contraseña" fullWidth />
                        </div>
                        {
                            invalidCredentials && <Alert type="danger">Lamentablemente no ha podido registrarse. Por favor intente más tarde.</Alert>
                        }
                        <div className="btn-register">
                            <Button type="submit" variant="filled">Crear cuenta</Button>
                            <p>¿Ya tenes una cuenta? <Link to="/iniciar-sesion">Iniciar sesión</Link></p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
export default RegisterPage;