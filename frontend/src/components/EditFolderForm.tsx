import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IFolderById } from "@/types";
import { ButtonSubmit, FileDropZone } from "@/components";

interface Props {
  folder: IFolderById | null;
  isModalOpen: boolean;
  onModalOpen: (isOpen: boolean) => void;
  onSubmit: (data: IFolderById) => void;
}

export const EditFolderForm = ({ folder , isModalOpen, onModalOpen, onSubmit }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [dropzoneInstance, setdropzoneInstance] = useState<any>({
    dropzone: null,
    uploadId: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFolderById>({defaultValues: folder ?? {}});

  const handleDropzone = (uploadId: string, dropzone?: any) => {
    setdropzoneInstance({ dropzone, uploadId });
  };

  
  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="editFolderModal"
      tabIndex={-1}
      aria-labelledby="newFolderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newProjectModalLabel">
              Nuevo folder
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="editSubFolder"
            >
              <div className="mb-4">
                <label htmlFor="nameSubfolder" className="form-label">
                  Folder{" "}
                  <i
                    className="bi-question-circle text-body ms-1"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Displayed on public forums, such as Front."
                  ></i>
                </label>

                <div className="js-form-message">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    id="nameSubfolder"
                    placeholder="Ingrese el nombre del folder"
                    aria-label="Ingrese el nombre del folder"
                    required
                    data-msg="Nombre de folder es requerido."
                  />
                  {errors.name && (
                    <span className="invalid-feedback">
                      Nombre del folder es requerido
                    </span>
                  )}
                </div>
              </div>

              {/*End Form */}

              <div className="mb-4">
                <label className="form-label">
                  Descripción{" "}
                  <span className="form-label-secondary">(Optional)</span>
                </label>
                <div className="js-form-message">
                  <textarea
                    {...register("description")}
                    className="form-control"
                    name="description"
                    placeholder="Ingrese una descripción"
                    aria-label="Ingrese una descripción"
                  ></textarea>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Adjuntar archivos</label>
                {isModalOpen && (
                  <FileDropZone
                    validate={true}
                    onGetUploadId={handleDropzone}
                  />
                )}
              </div>
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
            {/*  <button
               disabled={!isValid}
               form="newSubFolder"
               type="submit"
               className="btn btn-primary d-flex justify-content-center align-items-center"
             >
               Crear folder 
             </button> */}
            <ButtonSubmit
              title="Guardar cambios"
              formName="editSubFolder"
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
