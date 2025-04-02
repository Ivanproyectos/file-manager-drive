import { useEffect, useState, useRef, useCallback } from "react";
import { FileDropZone, FilePersmision, ButtonSubmit } from "@/components";
import { IUserFilePermission, CreateFolder, ICreateFile, IFolderPermission } from "@/types";
import { useForm } from "react-hook-form";
import { useFormStep } from "@/hooks";
import { createFile } from "@/api/files";
import { createFolder } from "@/services/folderService";
import { showError } from "@/utils/alerts";


interface CreateFolderFormProps {
  onCloseModal: () => void;
  onCreateComplete: () => void;
}

export const CreateFolderForm = ({ onCloseModal, onCreateComplete }: CreateFolderFormProps) => {
  const [users, setUsers] = useState<IUserFilePermission[]>([]);
  const [uploadId, setUploadId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<CreateFolder>();

  const formFolerRef = useRef<HTMLFormElement>(null);
  const messagaElementRef = useRef<HTMLDivElement>(null);
  const uploadIdRef = useRef<string>("");

  const preventNextStep = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!uploadIdRef.current) {
        reject(new Error("Please upload a file"));
      } else {
        resolve(true);
      }
    });
  };

  const finishCreate = () => {
    if (!formFolerRef.current) return;
    if (!messagaElementRef.current) return;

    formFolerRef.current.style.display = "none";
    messagaElementRef.current.style.display = "block";
    
  };

  useFormStep({ formFolerRef, messagaElementRef, preventNextStep });

  const handleAddUser = useCallback((user: IUserFilePermission[]) => {
    setUsers(user);
  }, []);

  useEffect(() => {
    uploadIdRef.current = uploadId;
  }, [uploadId]);

  const onSubmit = async (folderData: CreateFolder) => {

    let folderId = 0;
    try {

      const filePermissions: IFolderPermission[] = users.map((user) => ({
        userId: user.userId,
        canView: user.canView,
        canDownload: user.canDownload,
        isDateExpired: user.isDateExpired, 
        expirationDate: user.expirationDate
      }));

      const newFolder: CreateFolder = {
        ...folderData,
        folderPermissions: filePermissions,
        asignedFolder: filePermissions.length > 0
      };
    
      folderId = await createFolder(newFolder);
      onCreateComplete();
    } catch (error) {
      console.error(error);
      showError("Error al crear la carpeta, vuelva a intentalor mas tarde");
      return;
    }

    try {

      const file: ICreateFile = { folderId, uploadId };
      await createFile(file);

      finishCreate();
    }catch (error) {
      console.error(error);
      showError("Error al cargar los archivos, vuelva a intentalor mas tarde");
    }

  };
  return (
    <>
      <form
        className="js-step-form-validate js-validate"
        onSubmit={handleSubmit(onSubmit)}
        ref={formFolerRef}
        data-hs-step-form-options='{
            "progressSelector": "#createProjectStepFormProgress",
            "stepsSelector": "#createProjectStepFormContent", 
            "endSelector": "#createFolderFinishBtn",
            "isValidate": true
          }'
      >
        {/*Step */}
        <ul
          id="createProjectStepFormProgress"
          className="js-step-progress step step-sm step-icon-sm step-inline step-item-between mb-3 mb-sm-7"
        >
          <li className="step-item">
            <a
              className="step-content-wrapper"
              href="javascript:;"
              data-hs-step-form-next-options='{
                "targetSelector": "#createProjectStepDetails"
              }'
            >
              <span className="step-icon step-icon-soft-dark">1</span>
              <div className="step-content">
                <span className="step-title">Folder</span>
              </div>
            </a>
          </li>

          <li className="step-item">
            <a
              className="step-content-wrapper"
              href="javascript:;"
              data-hs-step-form-next-options='{
                  "targetSelector": "#createProjectStepMembers"
                }'
            >
              <span className="step-icon step-icon-soft-dark">2</span>
              <div className="step-content">
                <span className="step-title">Miembros</span>
              </div>
            </a>
          </li>
        </ul>
        {/*End Step */}

        {/*Content Step Form */}
        <div id="createProjectStepFormContent">
          <div id="createProjectStepDetails" className="active">
            <div className="mb-4">
              <label
                htmlFor="projectNameNewProjectLabel"
                className="form-label"
              >
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
                  {...register("name")}
                  type="text"
                  className="form-control"
                  name="name"
                  id="projectNameNewProjectLabel"
                  placeholder="Ingrese el nombre del folder"
                  aria-label="Ingrese el nombre del folder"
                  required
                  data-msg="Nombre de folder es requerido."
                />
                <span className="invalid-feedback">
                  Ingrese el nombre del folder
                </span>
              </div>
            </div>

            {/*End Form */}

            <div className="mb-4">
              <label className="form-label">
                Descripción{" "}
                <span className="form-label-secondary">(Opcional)</span>
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
              <label className="form-label">Adjuntar archivos {" "}
              <span className="form-label-secondary">(Opcional)</span>
              </label>
              <FileDropZone onGetUploadId={setUploadId} validate />
            </div>

            {/*Footer */}
            <div className="d-flex align-items-center mt-5">
              <div className="ms-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-hs-step-form-next-options='{
                 "targetSelector": "#createProjectStepMembers"
               }'
                >
                  Siguiente <i className="bi-chevron-right"></i>
                </button>
              </div>
            </div>
            {/*End Footer */}
          </div>

          <div id="createProjectStepMembers" style={{ display: "none" }}>
            {/*Form */}
            <h4>Agregue los miembros para el folder 
            {" "}
              <span className="form-label-secondary">(Opcional)</span>
            </h4>
            <p className="text-muted">
              Agregue los usuarios que
              tendran acceso a este folder y configure sus permisos para los
              archivos
            </p>

            <FilePersmision onUpdateUsers={handleAddUser} />

            <hr className="mt-2" />

            {/*Footer */}
            <div className="d-sm-flex align-items-center mt-5">
              <button
                type="button"
                className="btn btn-ghost-secondary mb-3 mb-sm-0 me-2"
                data-hs-step-form-prev-options='{
                  "targetSelector": "#createProjectStepDetails"
                }'
              >
                <i className="bi-chevron-left me-1"></i>Paso anterior
              </button>

              <div className="d-flex justify-content-end gap-3 ms-auto">
                <button type="button" className="btn btn-white">
                  Cancelar
                </button>
                {/*  <button  type="submit" className="btn btn-primary">Create Folder</button> */}
                <ButtonSubmit
                  title="Crear Folder"
                  isSubmitting={isSubmitted}
                ></ButtonSubmit>
              </div>
            </div>
            {/*End Footer */}
          </div>
        </div>
        {/*End Content Step Form */}
      </form>

      <div ref={messagaElementRef} style={{ display: "none" }}>
        <div className="text-center">
          <img
            className="img-fluid mb-3"
            src="../assets/svg/illustrations/oc-hi-five.svg"
            alt="Image Description"
            data-hs-theme-appearance="default"
            style={{ maxWidth: "15rem" }}
          />
          <img
            className="img-fluid mb-3"
            src="../assets/svg/illustrations-light/oc-hi-five.svg"
            alt="Image Description"
            data-hs-theme-appearance="dark"
            style={{ maxWidth: "15rem" }}
          />

          <div className="mb-4">
            <h2>Creado!</h2>
            <p>Nuevo folder creado con exito.</p>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button data-bs-dismiss="modal" className="btn btn-white" onClick={() => onCloseModal()}>
              Cerrar
            </button>

            {/*  <button
              className="btn btn-primary"
              data-bs-dismiss="modal"
              data-toggle="modal"
              data-target="#newFolderModal"
            >
              <i className="bi-building"></i> Crear Folder
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};
