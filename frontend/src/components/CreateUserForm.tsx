import { PersonType } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "@/schemas";
import { CreateUser } from "@/types";
import { useEffect } from "react";
import { addUser } from "@/api/users";
import { showError } from "@/utils/alerts";


interface CreateUserFormProps {
 onIsSubmitting: (isSubmitting: boolean) => void;
 onCreateComplete: (isComplete: boolean) => void
}

export const CreateUserForm = ({onIsSubmitting, onCreateComplete}:CreateUserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateUser>({
    resolver: yupResolver(createUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const personType = watch("people.personType");
 
  const onSubmit = async (user: CreateUser) => {
    try {
      const bussinessName = user.people.bussinessName;
      user.people.identification = user.people.identification.toString();
      user.people.phone = user.people.phone.toString();
      user.people.bussinessName = bussinessName? bussinessName : '';
      await addUser(user);
      onCreateComplete(true);
      reset()
    }
    catch (error) {
      console.error("Error al crear el usuario:", error);
      showError("Ocurrio un error al crear el usuario, vuelva a intentalor mas tarde");
    }
   
  };

  useEffect(() => {
    onIsSubmitting(isSubmitting);
  }, [isSubmitting]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="createUserForm">
      <h4 className="text-muted mb-3">Informacion personal</h4>
      <div className="mb-4">
        <label htmlFor="projectNameNewProjectLabel" className="form-label">
          Tipo persona{" "}
        </label>
        <div className="input-group input-group-sm-vertical">
          <label className="form-control" htmlFor="userAccountTypeRadio1">
            <span className="form-check">
              <input
                {...register("people.personType")}
                type="radio"
                className="form-check-input"
                value={PersonType.Natural}
                id="userAccountTypeRadio1"
                defaultChecked
              />
              <span className="form-check-label">
                <i className="bi-person me-1"></i> Natural
              </span>
            </span>
          </label>

          <label className="form-control" htmlFor="userAccountTypeRadio2">
            <span className="form-check">
              <input
                {...register("people.personType")}
                type="radio"
                className="form-check-input"
                id="userAccountTypeRadio2"
                value={PersonType.Juridico}
             
              />
              <span className="form-check-label">
                <i className="bi-briefcase me-1"></i> Juridico
              </span>
            </span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="identification" className="form-label">
          {personType === PersonType.Natural ? "DNI" : "RUC"}
        </label>
        <input
          {...register("people.identification")}
          type="text"
          className={`form-control ${errors.people?.identification ? "is-invalid" : ""}`} 
          id="identification"
          placeholder={personType === PersonType.Natural ? "Ingrese DNI" : "Ingrese RUC"}
          aria-label="Ingrese informacion"
        />
         {errors.people?.identification && <span className="invalid-feedback">{errors.people?.identification?.message}</span>}
      </div>
      {personType === PersonType.Juridico && (
        <div className="mb-4">
          <label htmlFor="bussinessName" className="form-label">
            Razon social
          </label>
          <input
            {...register("people.bussinessName")}
            type="text"
            id="bussinessName"
            placeholder="Ingrese razon social"
            aria-label="Ingrese razon social"
            className={`form-control ${errors.people?.bussinessName ? "is-invalid" : ""}`} 
          />
        {errors.people?.bussinessName && <span className="invalid-feedback">{errors.people?.bussinessName?.message}</span>}
        </div>
      )}

      {personType === PersonType.Natural && (
       <div className="row">
          <div className="col-sm-6">
            <div className="mb-4">
              <label 
                htmlFor="firstName"
                className="form-label"
              >
                Nombres
              </label>
              <input
                  {...register("people.firstName")}
                type="text"
                id="firstName"
                placeholder="Ingrese nombres"
                aria-label="IIngrese nombres"
                className={`form-control ${errors.people?.firstName ? "is-invalid" : ""}`} 
              />
              {errors.people?.firstName && <span className="invalid-feedback">{errors.people?.firstName?.message}</span>}
            </div>
          </div>

          <div className="col-sm-6">
            <label
              htmlFor="lastName"
              className="form-label"
            >
              Apellidos
            </label>

            <div className="mb-4">
              <input
               {...register("people.lastName")}
                type="text"
                id="lastName"
                className={`form-control ${errors.people?.lastName ? "is-invalid" : ""}`} 
                placeholder="Ingrese el apellido"
                aria-label="Ingrese el apellido"
              />
             {errors.people?.lastName && <span className="invalid-feedback">{errors.people?.lastName?.message}</span>}
            </div>
          </div>
        </div>
      )}
        <div className="row">
          <div className="col-sm-6">
          <div className="mb-4">
        <label htmlFor="email" className="form-label">
          Correo{" "}
        </label>
        <div className={`input-group input-group-merge ${errors.people?.email ? "is-invalid" : ""}`}  >
          <div className="input-group-prepend input-group-text">
            <i className="bi-envelope"></i>
          </div>
          <input
            type="text"
            id="email"
            className="form-control"
            {...register("people.email")}
            placeholder="Ingrese el correo"
            aria-label="Ingrese el correo"
          />
       
        </div>
        {errors.people?.email && <span className="invalid-feedback">{errors.people?.email?.message}</span>}
      </div>
          </div>

          <div className="col-sm-6">
            <label
              htmlFor="phone"
              className="form-label"
            >
              Telefono
            </label>

            <div className="mb-4">
              <input
               {...register("people.phone")}
               id="phone"
                type="text"
                className={`form-control ${errors.people?.phone ? "is-invalid" : ""}`} 
                placeholder="Ingrese el telefono"
                aria-label="Ingrese el telefono"
              />
             {errors.people?.phone && <span className="invalid-feedback">{errors.people?.phone?.message}</span>}
            </div>
          </div>
        </div>



      <div className="mb-4">
        <label htmlFor="address" className="form-label">
          Dirección{" "}
        </label>
        <div className={`input-group input-group-merge ${errors.people?.address ? "is-invalid" : ""}`}>
          <div className="input-group-prepend input-group-text">
            <i className="bi-geo-alt"></i>
          </div>
          <input
             {...register("people.address")}
            type="text"
            id="address"
            className="form-control"
            placeholder="Ingrese la dirección"
            aria-label="EIngrese la dirección"
          />
        </div>
        {errors.people?.address && <span className="invalid-feedback">{errors.people?.address?.message}</span>}
      </div>
      <hr />
      <h4 className="text-muted mb-3">Credenciales de acceso</h4>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Contrasena{" "}
        </label>
        <div className={`input-group input-group-merge ${errors.password ? "is-invalid" : ""}`}>
          <div className="input-group-prepend input-group-text">
            <i className="bi-lock"></i>
          </div>
          <input
             {...register("password")}
             id="password"
            type="text"
            className="form-control" 
            placeholder="Ingrese una contraseña"
            aria-label="Ingrese una contraseña"
          />
       
        </div>
        {errors.password && <span className="invalid-feedback">{errors.password.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="form-label">
          Repita la contrasena{" "}
        </label>
        <div className={`input-group input-group-merge ${errors.confirmPassword ? "is-invalid" : ""}`}>
          <div className="input-group-prepend input-group-text">
            <i className="bi-lock"></i>
          </div>
          <input
           {...register("confirmPassword")}
            type="text"
            id="confirmPassword"
            className="form-control"
            placeholder="Repita la contraseña"
            aria-label="Repita la contraseña"
          />
        </div>
        {errors.confirmPassword && <span className="invalid-feedback">{errors.confirmPassword.message}</span>}
      </div>
  
    </form>
  );
};
