import * as yup from 'yup';
import { ILogin} from '@/types';

export const loginSchema:  yup.ObjectSchema<ILogin>  = yup.object({
    email: yup.string().required('Por favor ingresa tu correo').email('Correo inválido'),
    password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
   
    });

