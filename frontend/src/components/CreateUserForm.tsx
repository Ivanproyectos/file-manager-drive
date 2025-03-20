import { PersonType } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "@/schemas";
import { CreateUser } from "@/types";
import { useEffect } from "react";

interface CreateUserFormProps {
 onIsSubmitting: (isSubmitting: boolean) => void;
}

export const CreateUserForm = ({onIsSubmitting}:CreateUserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUser>({
    resolver: yupResolver(createUserSchema),
    mode: "all",
  });
  const personType = watch("people.personType");
 
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const onSubmit = async (data: CreateUser) => {
    debugger
    console.log(data);
    await delay(5000);
    reset()
  };

  useEffect(() => {
    debugger
    if(errors) return;
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
                value={PersonType.Juridico}
                id="userAccountTypeRadio2"
              />
              <span className="form-check-label">
                <i className="bi-briefcase me-1"></i> Juridico
              </span>
            </span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="projectNameNewProjectLabel" className="form-label">
          {personType === PersonType.Natural ? "DNI" : "RUC"}
        </label>
        <input
          {...register("people.identification")}
          type="text"
          className={`form-control ${errors.people?.identification ? "is-invalid" : ""}`} 
          id="userAccountTypeRadio2"
        />
         {errors.people?.identification && <span className="invalid-feedback">{errors.people?.identification?.message}</span>}
      </div>
      {personType === PersonType.Juridico && (
        <div className="mb-4">
          <label htmlFor="projectNameNewProjectLabel" className="form-label">
            Razon social
          </label>
          <input
            {...register("people.bussinessName")}
            type="text"
            className="form-control"
          />
        {errors.people?.bussinessName && <span className="invalid-feedback">{errors.people?.bussinessName?.message}</span>}
        </div>
      )}

      {personType === PersonType.Natural && (
       <div className="row">
          <div className="col-sm-6">
            <div className="mb-4">
              <label 
                htmlFor="paymentTermsNewProjectLabel-ts-control"
                className="form-label"
                id="paymentTermsNewProjectLabel-ts-label"
              >
                Nombres
              </label>
              <input
                  {...register("people.firstName")}
                type="text"
                className={`form-control ${errors.people?.firstName ? "is-invalid" : ""}`} 
              />
              {errors.people?.firstName && <span className="invalid-feedback">{errors.people?.firstName?.message}</span>}
            </div>
          </div>

          <div className="col-sm-6">
            <label
              htmlFor="expectedValueNewProjectLabel"
              className="form-label"
            >
              Apellidos
            </label>

            <div className="mb-4">
              <input
               {...register("people.lastName")}
                type="text"
                className={`form-control ${errors.people?.lastName ? "is-invalid" : ""}`} 
                placeholder="Enter value here"
                aria-label="Enter value here"
              />
             {errors.people?.lastName && <span className="invalid-feedback">{errors.people?.lastName?.message}</span>}
            </div>
          </div>
        </div>
      )}
        <div className="row">
          <div className="col-sm-6">
          <div className="mb-4">
        <label htmlFor="projectNameNewProjectLabel" className="form-label">
          Correo{" "}
        </label>
        <div className="input-group input-group-merge">
          <div className="input-group-prepend input-group-text">
            <i className="bi-envelope"></i>
          </div>
          <input
            type="text"
            className={`form-control ${errors.people?.email ? "is-invalid" : ""}`} 
            {...register("people.email")}
            placeholder="Enter value here"
            aria-label="Enter value here"
          />
         {errors.people?.email && <span className="invalid-feedback">{errors.people?.email?.message}</span>}
        </div>
  
      </div>
          </div>

          <div className="col-sm-6">
            <label
              htmlFor="expectedValueNewProjectLabel"
              className="form-label"
            >
              Telefono
            </label>

            <div className="mb-4">
              <input
               {...register("people.phone")}
                type="text"
                className={`form-control ${errors.people?.phone ? "is-invalid" : ""}`} 
                placeholder="Enter value here"
                aria-label="Enter value here"
              />
             {errors.people?.phone && <span className="invalid-feedback">{errors.people?.phone?.message}</span>}
            </div>
          </div>
        </div>



      <div className="mb-4">
        <label htmlFor="projectNameNewProjectLabel" className="form-label">
          Dirección{" "}
        </label>
        <div className="input-group input-group-merge">
          <div className="input-group-prepend input-group-text">
            <i className="bi-geo-alt"></i>
          </div>
          <input
             {...register("people.address")}
            type="text"
            className={`form-control ${errors.people?.address ? "is-invalid" : ""}`} 
            placeholder="Enter value here"
            aria-label="Enter value here"
          />
         {errors.people?.address && <span className="invalid-feedback">{errors.people?.address?.message}</span>}
        </div>
     
      </div>
      <hr />
      <h4 className="text-muted mb-3">Credenciales de acceso</h4>
      <div className="mb-4">
        <label htmlFor="projectNameNewProjectLabel" className="form-label">
          Contrasena{" "}
        </label>
        <div className="input-group input-group-merge is-invalid">
          <div className="input-group-prepend input-group-text">
            <i className="bi-lock"></i>
          </div>
          <input
             {...register("password")}
            type="text"
            className={`form-control is-invalid ${errors?.password ? "is-invalid" : ""}`} 
            placeholder="Enter value here"
            aria-label="Enter value here"
          />
           {errors.password && <span className="invalid-feedback">{errors.password.message}</span>}
        </div>
       
      </div>
      <div className="mb-4">
        <label htmlFor="projectNameNewProjectLabel" className="form-label">
          Repita la contrasena{" "}
        </label>
        <div className="input-group input-group-merge">
          <div className="input-group-prepend input-group-text">
            <i className="bi-lock"></i>
          </div>
          <input
           {...register("confirmPassword")}
            type="text"
            className={`form-control ${errors?.confirmPassword ? "is-invalid" : ""}`} 
            placeholder="Enter value here"
            aria-label="Enter value here"
          />
             {errors.confirmPassword && <span className="invalid-feedback">{errors.confirmPassword.message}</span>}
        </div>
     
      </div>
  
    </form>
  );
};
