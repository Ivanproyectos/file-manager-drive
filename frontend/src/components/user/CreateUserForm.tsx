import { PersonType } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "@/schemas";
import { CreateUser, RoleId } from "@/types";
import { RolList } from "./RolList";
import { useEffect, useState, useRef } from "react";
import { useDebounce } from 'use-debounce';
import {  getUsers } from '@/api/users'

declare const HSCore: any;

interface CreateUserFormProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  onSubmit: (user: CreateUser) => Promise<boolean>
}
export const CreateUserForm = ({ modalRef, onSubmit }: CreateUserFormProps) => {
  const [selectedRoles, setSelectedRoles] = useState<RoleId[]>([]);
  const [emailExists, setEmailExists] = useState(false);
  const [identificationExists, setIdentificationExists] = useState(false);
  const inputDateRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<CreateUser>({
    resolver: yupResolver(createUserSchema),
    mode: 'all',
  /*   reValidateMode: 'onChange', */
    defaultValues: {
      people: {
        personType: PersonType.Natural
      }
    }
  });

  const personType = watch("people.personType");
  const identification = watch("people.identification");
  const isExpired = watch("isExpired");
  const email = watch("people.email");

  const [debouncedEmail] = useDebounce(email, 500);
  const [debouncedIdentification] = useDebounce(identification, 500);

  const handleUserSubmit = async (user: CreateUser) => {
    const result = await onSubmit(user);
    if (!result) return;
    reset()
  };

  useEffect(() => {
    if(isDirty){
      setValue("roles", selectedRoles);
      trigger("roles");
    }

  }, [selectedRoles]);

  useEffect(() => {
    if (isExpired) {
      HSCore.components.HSFlatpickr.init(inputDateRef.current, {
        minDate: "today",
        onChange: function (
          _selectedDates: Array<Date>,
          dateStr: string,
          _instance: any,
        ) {
          setValue("expirationDate", dateStr);
          trigger("expirationDate");
        },
      });
    } else {
      setValue("expirationDate", '');
    }

  }, [isExpired]);

  useEffect(() => {
    const checkEmailExists = async () => {
      setEmailExists(false);
      if (!debouncedEmail) return;

      try {
        const users = await getUsers(debouncedEmail);
        setEmailExists(users.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    checkEmailExists();
  }, [debouncedEmail]);

  useEffect(() => {
    const checkIdentificationExists = async () => {

      setIdentificationExists(false);
      if (!debouncedIdentification) return;

      try {
        const users = await getUsers(undefined, debouncedIdentification.toString());
        setIdentificationExists(users.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    checkIdentificationExists();
  }, [debouncedIdentification]);

  return (

    <div
      ref={modalRef}
      className="modal fade"
      id="createUserModal"
      tabIndex={-1}
      aria-labelledby="createUserModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="uploadFilesModalLabel">
              Nuevo usuario
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">

            <form onSubmit={handleSubmit(handleUserSubmit)} id="createUserForm">
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
                  className={`form-control ${errors.people?.identification || identificationExists ? "is-invalid" : ""}`}
                  id="identification"
                  placeholder={personType === PersonType.Natural ? "Ingrese DNI" : "Ingrese RUC"}
                  aria-label="Ingrese informacion"
                />
                {errors.people?.identification && <span className="invalid-feedback">{errors.people?.identification?.message}</span>}
                {identificationExists && <span className="invalid-feedback">Ya existe un usuario con esta identificacion</span>}
                
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
                    <div className={`input-group input-group-merge ${errors.people?.email || emailExists ? "is-invalid" : ""}`}  >
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
                    {emailExists && <span className="invalid-feedback">Ya existe un usuario con este correo</span>}
                    
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
                  Dirección{" "} <span className="text-muted">(Opcional)</span>
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
              <div className="mb-2" >
                <h4 className={`text-muted mb-3 ${errors.roles ? "is-invalid" : ""}`}>Agregue permisos para el usuario</h4>
                <RolList onSelected={setSelectedRoles} />
                {errors.roles && <span className="invalid-feedback">{errors.roles?.message}</span>}
              </div>

              <div className="mb-4">
                <div className="form-check form-switch d-flex justify-content-between p-0">
                  <label className="form-check-label" htmlFor="input-isExpired"> ¿ El acceso expira ?</label>
                  <input
                    {...register("isExpired")}
                    type="checkbox"
                    className="form-check-input" id="input-isExpired" name="isExpired" />

                </div>
              </div>
              {isExpired && (
                <div className="mb-4">
                  <div className={`input-group input-group-merge ${errors.expirationDate ? "is-invalid" : ""}`}  >
                    <div className="input-group-prepend input-group-text">
                      <i className="bi-calendar"></i>
                    </div>
                    <input

                      {...register("expirationDate")}
                      ref={inputDateRef}
                      id="expirationDate"
                      type="text"
                      className={`form-control js-flatpickr flatpickr-custom ${errors.expirationDate ? "is-invalid" : ""}`}
                      data-hs-flatpickr-options='{
                            "dateFormat": "d/m/Y"
                            }'
                      placeholder="Ingrese fecha de expiración"
                      aria-label="Ingrese fecha de expiración"
                    />
                    
                  </div>
                  {errors.expirationDate && <span className="invalid-feedback">{errors.expirationDate.message}</span>}
                </div>
              )}
  
              {identification && (
                <>
                  <div className="alert alert-soft-primary" role="alert">
                    <i className="bi-info-circle me-2"></i> La contrasena por defecto para este usuario es: <strong>{identification}</strong>
                  </div>
                </>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`btn btn-primary d-flex justify-content-center align-items-center ${isSubmitting ? "text-transparent" : ""}`}
              form="createUserForm"
              disabled={!isValid || isSubmitting || emailExists || identificationExists }

            >
              <div
                className="spinner-border text-light status-spinner"
                role="status"
                hidden={!isSubmitting}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>


  );
};
