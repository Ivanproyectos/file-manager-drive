import * as yup from 'yup';
import { CreateUser, PersonType, UpdateUser } from '@/types';



export const createUserSchema:  yup.ObjectSchema<CreateUser>  = yup.object({
   /*  password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: yup.string().required('La confirmación de la contraseña es obligatoria').oneOf([yup.ref('password')], 'Las contraseñas no coinciden'), */
   /*  status: yup.boolean(), */
    roles: yup.array().required('Los roles son obligatorios').min(1, 'Debes seleccionar al menos un rol'),
    isExpired: yup.boolean().required('La fecha de espiración es obligatoria'),
    expirationDate: yup.string()
    .when('isExpired', {
      is: true,
      then: (schema) => schema.required('La fecha de espiración es obligatoria'),
    }),
     
    people: yup.object({
        phone: yup.number()
        .typeError('El teléfono debe ser un número')
        .integer('Debe ser un número entero').required('El teléfono es obligatorio'),
  /*       address: yup.string().required('La dirección es obligatoria'), */
        personType: yup
          .mixed<PersonType>()
          .oneOf([PersonType.Natural, PersonType.Juridico], 'Tipo de persona inválido')
          .required('El tipo de persona es obligatorio'),
        identification: yup.string()
        .typeError('La identificación debe ser un número')
        .matches(/^\d+$/, 'La identificación debe ser un número válido')
        .required('La identificación es obligatoria')
        .when('personType', {
          is: PersonType.Natural,
          then: (schema) => schema.length(8, 'La identificación debe tener 8 caracteres'),
          otherwise: (schema) => schema.length(11, 'La identificación debe tener 11 caracteres'),
        }),
        lastName: yup.string()
        .when('personType', {
          is: PersonType.Natural,
          then: (schema) => schema.required('El apellido es obligatorio'),
          otherwise: (schema) => schema.notRequired(),
        }),
        firstName: yup.string()
        .when('personType', {
          is: PersonType.Natural,
          then: (schema) => schema.required('El nombre es obligatorio'),
          otherwise: (schema) => schema.notRequired(),
        }),
        email: yup.string().email('Correo electrónico inválido').required('El email es obligatorio'),
        bussinessName: yup.string()
        .when('personType', {
          is: PersonType.Juridico,
          then: (schema) => schema.required('El nombre de la empresa es obligatorio'),
          otherwise: (schema) => schema.notRequired(),
        })
      }).required('Las personas son obligatorias'),
    });

export const updateUserSchema:  yup.ObjectSchema<UpdateUser>  = yup.object({
  id: yup.number(),
  roles: yup.array().min(1, 'Debes seleccionar al menos un rol').required('Los roles son obligatorios'),
  isExpired: yup.boolean().required('La fecha de espiración es obligatoria'),
  expirationDate: yup.string()
  .when('isExpired', {
    is: true,
    then: (schema) => schema.required('La fecha de espiración es obligatoria'),
  }),
   
  people: yup.object({
      phone: yup.number()
      .typeError('El teléfono debe ser un número')
      .integer('Debe ser un número entero').required('El teléfono es obligatorio'),
     /*  address: yup.string().required('La dirección es obligatoria'), */
      personType: yup
        .mixed<PersonType>()
        .oneOf([PersonType.Natural, PersonType.Juridico], 'Tipo de persona inválido')
        .required('El tipo de persona es obligatorio'),
      identification: yup.number()
      .typeError('La identificación debe ser un número')
      .integer('Debe ser un número entero').required('La identificación es obligatoria'),
      lastName: yup.string()
      .when('personType', {
        is: PersonType.Natural,
        then: (schema) => schema.required('El apellido es obligatorio'),
        otherwise: (schema) => schema.notRequired(),
      }),
      firstName: yup.string()
      .when('personType', {
        is: PersonType.Natural,
        then: (schema) => schema.required('El nombre es obligatorio'),
        otherwise: (schema) => schema.notRequired(),
      }),
      email: yup.string().email('Correo electrónico inválido').required('El email es obligatorio'),
      bussinessName: yup.string()
      .when('personType', {
        is: PersonType.Juridico,
        then: (schema) => schema.required('El nombre de la empresa es obligatorio'),
        otherwise: (schema) => schema.notRequired(),
      })
    }).required('Las personas son obligatorias'),
  });
