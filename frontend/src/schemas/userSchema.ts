import * as yup from 'yup';
import { CreateUser, PersonType } from '@/types';



export const createUserSchema:  yup.ObjectSchema<CreateUser>  = yup.object({
    password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: yup.string().required('La confirmación de la contraseña es obligatoria').oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
    people: yup.object({
        phone: yup.number()
        .typeError('El teléfono debe ser un número')
        .integer('Debe ser un número entero').required('El teléfono es obligatorio'),
        address: yup.string().required('La dirección es obligatoria'),
        personType: yup
          .mixed<PersonType>()
          .oneOf([PersonType.Natural, PersonType.Juridico], 'Tipo de persona inválido')
          .required('El tipo de persona es obligatorio'),
        identification: yup.number()
        .typeError('La identificación debe ser un número')
        .integer('Debe ser un número entero').required('La identificación es obligatoria'),
        lastName: yup.string().required('El apellido es obligatorio'),
        firstName: yup.string().required('El nombre es obligatorio'),
        email: yup.string().email('Correo electrónico inválido').required('El email es obligatorio'),
        bussinessName: yup.string()
        .when('personType', {
          is: PersonType.Juridico,
          then: (schema) => schema.required('El nombre de la empresa es obligatorio'),
          otherwise: (schema) => schema.notRequired(),
        })
      }).required('Las personas son obligatorias'),
    });

    /*     file: yup
    .mixed<FileList>()
    .test("required", "El archivo es obligatorio", (value) => {
      return value instanceof FileList && value.length > 0; // Verifica que se haya subido un archivo
    })
    .test("fileSize", "El archivo es muy grande (máx. 2MB)", (value) => {
      return value instanceof FileList && value[0]?.size <= 2 * 1024 * 1024; // Límite de 2MB
    })
    .test("fileType", "Solo se permiten imágenes (jpg, png)", (value) => {
      return value instanceof FileList && ["image/jpeg", "image/png"].includes(value[0]?.type);
    }), */
