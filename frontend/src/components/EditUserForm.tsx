import { PersonType } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserSchema } from "@/schemas";
import { UpdateUser, IUser, RoleId } from "@/types";
import { useEffect, useRef, useState } from "react";
import { RolList } from "@/components";

declare const HSCore: any;
interface UpdateUserFormProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  user: IUser | null;
  onSubmit: (user: UpdateUser) => Promise<boolean>;

}

export const EditUserForm = ({ modalRef, user, onSubmit }: UpdateUserFormProps) => {
  const [selectedRoles, setSelectedRoles] = useState<RoleId[]>([]);
  const inputDateRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUser>({
    resolver: yupResolver(updateUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const personType = watch("people.personType");
  const isExpired = watch("isExpired");

  debugger;

  const onUpdateSubmit = async (user: UpdateUser) => {

   const result = await onSubmit(user);
    if (!result) return;
    reset()
  };

  useEffect(() => {
    setValue("roles", selectedRoles);
  }, [selectedRoles]);

  useEffect(() => {

    const initialRoles = user?.roles?.map(role => role.id) ?? [];
    const initialState = { ...user, roles: initialRoles };
    reset(initialState);
    setValue('id', user?.id ?? 0);
    setSelectedRoles(initialRoles);

    if (inputDateRef.current) {
      debugger;
      inputDateRef.current.value = user?.expirationDate ?? "";
    }

  }, [user, inputDateRef]);

  useEffect(() => {
  /*   if (isExpired) {
      setValue("expirationDate", user?.expirationDate ?? "");
    }  */
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


  }, [user, isExpired]);



  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="editUserModal"
      tabIndex={-1}
      aria-labelledby="editUserModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Actualizar usuario
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onUpdateSubmit)} id="updateUserForm">
              <h4 className="text-muted mb-3">Informacion personal</h4>
              <div className="mb-4">
                <label htmlFor="projectNameNewProjectLabel" className="form-label">
                  Tipo persona{" "}
                </label>
                <div className="input-group input-group-sm-vertical">
                  <label className="form-control" htmlFor="userUpdateNatural">
                    <span className="form-check">
                      <input
                        {...register("people.personType")}
                        type="radio"
                        className="form-check-input"
                        value={PersonType.Natural}
                        id="userUpdateNatural"
                        defaultChecked
                      />
                      <span className="form-check-label">
                        <i className="bi-person me-1"></i> Natural
                      </span>
                    </span>
                  </label>

                  <label className="form-control" htmlFor="userUpdateJuridico">
                    <span className="form-check">
                      <input
                        {...register("people.personType")}
                        type="radio"
                        className="form-check-input"
                        id="userUpdateJuridico"
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

              <div className="mb-4">
                <h4 className="text-muted mb-3">Agregue permisos para el usuario</h4>
                <RolList onSelected={setSelectedRoles} selectedRoles={selectedRoles} />
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
           {/*    <div className="mb-4">
                <div className="form-check form-switch d-flex justify-content-between p-0">
                  <label className="l"> fecha</label>
                  <input
                     {...register("expirationDate")}
                    type="text"
                    className="form-control"  name="expirationDate" />

                </div>
              </div>  */}
              {isExpired && (
                <div className="mb-4">
                  <div className={`input-group input-group-merge ${errors.expirationDate ? "is-invalid" : ""}`}  >
                    <div className="input-group-prepend input-group-text">
                      <i className="bi-calendar"></i>
                    </div>
                    <input

                      {...register("expirationDate")}
                       ref={inputDateRef} 
                      id="expirationDate-update"
                      type="text"
                      className={`form-control ${errors.expirationDate ? "is-invalid" : ""}`}
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
              form="updateUserForm"
              disabled={isSubmitting}

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
