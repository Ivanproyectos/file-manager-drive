import { useEffect, useState } from "react" 
import { FileDropZone, FilePersmision} from "@/components"
import { IUserFilePermission } from "@/types"


declare const HSStepForm: any;
declare const HSBsValidation: any;

interface CreateFolderFormProps {
  onCloseModal: (isOpen: boolean) => void;
}

export const CreateFolderForm = ({ onCloseModal }: CreateFolderFormProps) => {

   const [users, setUsers] = useState<IUserFilePermission[]>([])


    useEffect(() => {


      new HSStepForm('.js-step-form-validate', {
        validator: HSBsValidation.init('.js-validate'),
    /*     preventNextStep () {
          return false
        },  */
        finish ($el: any) {
          const $successMessageTempalte = $el.querySelector('#createFolderSuccessMessage').cloneNode(true)
          $successMessageTempalte.style.display = 'block'
 
          $el.style.display = 'none'
          $el.parentElement.appendChild($successMessageTempalte)
        }
     })
    },[])

  const handleSelectedUser = (users: IUserFilePermission[]) => {
    setUsers(users)
  }
  return (
    <form className="js-step-form-validate js-validate" data-hs-step-form-options='{
        "progressSelector": "#createProjectStepFormProgress",
        "stepsSelector": "#createProjectStepFormContent", 
        "endSelector": "#createFolderFinishBtn",
        "isValidate": true
      }'>
 {/*Step */}
  <ul id="createProjectStepFormProgress" className="js-step-progress step step-sm step-icon-sm step-inline step-item-between mb-3 mb-sm-7">

    <li className="step-item">
      <a className="step-content-wrapper" href="javascript:;" data-hs-step-form-next-options='{
          "targetSelector": "#createProjectStepDetails"
        }'>
        <span className="step-icon step-icon-soft-dark">1</span>
        <div className="step-content">
          <span className="step-title">Folder</span>
        </div>
      </a>
    </li>

    <li className="step-item">
      <a className="step-content-wrapper" href="javascript:;" data-hs-step-form-next-options='{
           "targetSelector": "#createProjectStepMembers"
         }'>
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
        <label htmlFor="projectNameNewProjectLabel" className="form-label">
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
            type="text"
            className="form-control"
            name="projectName"
            id="projectNameNewProjectLabel"
            placeholder="Ingrese el nombre del folder"
            aria-label="Ingrese el nombre del folder"
            required data-msg="Nombre de folder es requerido."
          />
          <span className="invalid-feedback">Ingrese el nombre del folder</span>
        </div>
        </div>
 
      {/*End Form */}

      <div className="mb-4">
        <label className="form-label">
          Descripción <span className="form-label-secondary">(Optional)</span>
        </label>
        <div className="js-form-message">
        <textarea
          className="form-control"
          name="projectName"
          placeholder="Ingrese una descripción"
          aria-label="Ingrese una descripción"
        ></textarea>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">Adjuntar archivos</label>
        <FileDropZone/>
      </div>
       

     {/*Footer */}
      <div className="d-flex align-items-center mt-5">
        <div className="ms-auto">
          <button type="button" className="btn btn-primary" data-hs-step-form-next-options='{
                    "targetSelector": "#createProjectStepMembers"
                  }'>
            Siguiente <i className="bi-chevron-right"></i>
          </button>
        </div>
      </div>
     {/*End Footer */}
    </div>

    <div id="createProjectStepMembers" style={{display: "none"}}>
     {/*Form */}
     <p><i className="bi-info-circle me-2"></i>Agregue los usuarios que tendran acceso a este folder y configure sus permisos para los archivos</p>

      <FilePersmision onUpdateUsers={handleSelectedUser} />

      <hr className="mt-2" />

     {/*Footer */}
      <div className="d-sm-flex align-items-center mt-5">
        <button type="button" className="btn btn-ghost-secondary mb-3 mb-sm-0 me-2" data-hs-step-form-prev-options='{
             "targetSelector": "#createProjectStepDetails"
           }'>
          <i className="bi-chevron-left me-1"></i>Paso anterior
        </button>

        <div className="d-flex justify-content-end gap-3 ms-auto">
          <button type="button" className="btn btn-white" data-bs-dismiss="modal" onClick={() => onCloseModal(false)} aria-label="Close">Cancelar</button>
          <button id="createFolderFinishBtn" type="button" className="btn btn-primary">Create Folder</button>
        </div>
      </div>
     {/*End Footer */}
    </div>
  </div>
 {/*End Content Step Form */}

 {/*Message Body */}
  <div id="createFolderSuccessMessage" style={{display: 'none'}}>
    <div className="text-center">
      <img className="img-fluid mb-3" src="../assets/svg/illustrations/oc-hi-five.svg" alt="Image Description" data-hs-theme-appearance="default" style={{maxWidth: '15rem'}} />
      <img className="img-fluid mb-3" src="../assets/svg/illustrations-light/oc-hi-five.svg" alt="Image Description" data-hs-theme-appearance="dark" style={{maxWidth: '15rem'}} />

      <div className="mb-4">
        <h2>Creado!</h2>
        <p>Nuevo folder creado con exito.</p>
      </div>

      <div className="d-flex justify-content-center gap-3">
      {/*   <a className="btn btn-white" href="./projects.html">
          <i className="bi-chevron-left"></i> Regresar a folders
        </a>
 */}
        <button className="btn btn-primary" data-bs-dismiss="modal" data-toggle="modal" data-target="#newFolderModal">
          <i className="bi-building"></i> Crear Folder
        </button>
      </div>
    </div>
  </div>
 {/*End Message Body */}
</form>
  )
}
