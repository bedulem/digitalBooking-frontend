import { VALIDATIONS } from "./messages";

const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regString = /^[a-zA-Z\s]*$/;
const minLengthPassword = 7;

export const validationEmail = (value) => {
    if (!value || value === '') {
        return VALIDATIONS.required;
    } else {
        if (!regEmail.test(value)) {
            return VALIDATIONS.email;
        }
    }
}
export const validationPassword = (value) => {
    if (!value || value === '') {
        return VALIDATIONS.required;
    } else {
        if (value.length < minLengthPassword) {
            return VALIDATIONS.minLengthPassword(minLengthPassword);
        }
    }
}

export const validationString = (value) => {
    if (!value || value === '') {
        return VALIDATIONS.required;
    }
    if (!regString.test(value)) {
        return VALIDATIONS.string;
    }
}

export const validationConfirmPassword = (pwd, confirmPwd) => {
    if (!confirmPwd || confirmPwd === '') {
        return VALIDATIONS.required;
    } else {
        if (pwd !== confirmPwd) {
            return VALIDATIONS.matchPassword;
        }
    }
}