import {  useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Button, Input, MsgToLogg } from "../../components/atoms";
import { validationEmail, validationPassword } from "../../constants/rules";
import { useSessionContext } from "../../context/AuthContext";
import './Login.css';

const INITIAL_ERRORS = {
    email: null,
    password: null,
}

const LoginPage = () => {
    const [errors, setErrors] = useState(INITIAL_ERRORS)
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const { login } = useSessionContext();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    const validateData = (data) => {
        const errorsMsg = {};
        errorsMsg.email = validationEmail(data.email);
        errorsMsg.password = validationPassword(data.password);
        if (errorsMsg.email || errorsMsg.password) {
            setErrors(errorsMsg);
            return false
        }
        setErrors(INITIAL_ERRORS);
        return true;
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const isValid = validateData(data);
        if (!isValid) {
            return;
        }


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }; 

        try {
            const request = await fetch(`${process.env.REACT_APP_API_BACK}/users/authenticate`, requestOptions);
            const info = await request.json();
            login(info);
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
            <div className="login-container">
                <div className="login-box">
                    {searchParams.get('redirect') && <MsgToLogg />}
                    <h1 className="title">Iniciar sesión</h1>
                    <form id="login" onSubmit={onSubmit}>
                        <div className="flex-container">
                            <Input
                                name="email"
                                type="email"
                                label="Correo electrónico"
                                error={!!errors.email}
                                helperText={errors.email}
                                fullWidth />
                            <Input
                                name="password"
                                type="password"
                                label="Contraseña"
                                error={!!errors.password}
                                helperText={errors.password}
                                fullWidth />
                        </div>
                    </form>
                    {
                        invalidCredentials && <Alert type="danger">Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde o chequee que su email y contraseña sean los correctos.</Alert>
                    }
                    <div className="btn-login">
                        <Button form="login" type="submit" variant="filled">Ingresar</Button>
                        <p>¿Aún no tenes cuenta? <Link to={searchParams.get('redirect') ? `/registro?redirect=${searchParams.get('redirect')}`: '/registro'}>Registrate</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginPage;