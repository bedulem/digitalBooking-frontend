import { Link } from "react-router-dom";
import { Button } from "../../components/atoms";
import './MsgProductOk.css'

const MsgProductOk = () => {
    return (
        <div className="msg-reservation-ok">
            <div className="content">
                <img src="/images/icons/check.svg" alt="Check" />
                <h1 className="title">¡Muchas gracias!</h1>
                <p className="fw-700"> El producto se ha creado con éxito</p>
                <Link to="/">
                    <Button variant="filled">ok</Button>
                </Link>

            </div>
        </div>
    )
}

export default MsgProductOk;