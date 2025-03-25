[1mdiff --git a/frontend/src/schemas/userSchema.ts b/frontend/src/schemas/userSchema.ts[m
[1mindex 11d25c3..3f3270a 100644[m
[1m--- a/frontend/src/schemas/userSchema.ts[m
[1m+++ b/frontend/src/schemas/userSchema.ts[m
[36m@@ -2,7 +2,6 @@[m [mimport * as yup from 'yup';[m
 import { CreateUser, PersonType } from '@/types';[m
 [m
 [m
[31m-[m
 export const createUserSchema:  yup.ObjectSchema<CreateUser>  = yup.object({[m
     password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),[m
     confirmPassword: yup.string().required('La confirmación de la contraseña es obligatoria').oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),[m
[36m@@ -29,15 +28,3 @@[m [mexport const createUserSchema:  yup.ObjectSchema<CreateUser>  = yup.object({[m
         })[m
       }).required('Las personas son obligatorias'),[m
     });[m
[31m-[m
[31m-    /*     file: yup[m
[31m-    .mixed<FileList>()[m
[31m-    .test("required", "El archivo es obligatorio", (value) => {[m
[31m-      return value instanceof FileList && value.length > 0; // Verifica que se haya subido un archivo[m
[31m-    })[m
[31m-    .test("fileSize", "El archivo es muy grande (máx. 2MB)", (value) => {[m
[31m-      return value instanceof FileList && value[0]?.size <= 2 * 1024 * 1024; // Límite de 2MB[m
[31m-    })[m
[31m-    .test("fileType", "Solo se permiten imágenes (jpg, png)", (value) => {[m
[31m-      return value instanceof FileList && ["image/jpeg", "image/png"].includes(value[0]?.type);[m
[31m-    }), */[m
