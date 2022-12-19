export const VALIDATIONS = {
    required: 'Este campo es requerido',
    email: 'El email no es válido',
    string: 'Este campo solo acepta letras',
    matchPassword: 'Las contraseñas no coinciden',
    minLengthPassword: (min) => `La contraseña debe tener al menos ${min} caracteres`,
}