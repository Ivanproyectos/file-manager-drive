import { useEffect } from "react" 
import { FolderDetailsForm , FileDropZone} from "@/components"
declare const HSStepForm: any;

export const CreateFolderForm = () => {
    useEffect(() => {
        new HSStepForm('.js-step-form')
    })

  return (
    <form className="js-step-form" data-hs-step-form-options='{
        "progressSelector": "#createProjectStepFormProgress",
        "stepsSelector": "#createProjectStepFormContent",
        "endSelector": "#createProjectFinishBtn",
        "isValidate": false
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
 
     <FolderDetailsForm />
      <div className="mb-4">
        <label className="form-label">Adjuntar archivos</label>
        <FileDropZone />
      </div>

     {/*Footer */}
      <div className="d-flex align-items-center mt-5">
        <div className="ms-auto">
          <button type="button" className="btn btn-primary" data-hs-step-form-next-options='{
                    "targetSelector": "#createProjectStepMembers"
                  }'>
            Next <i className="bi-chevron-right"></i>
          </button>
        </div>
      </div>
     {/*End Footer */}
    </div>

    <div id="createProjectStepMembers" style={{display: "none"}}>
     {/*Form */}
     <p><i className="bi-info-circle me-2"></i>Agregue los usuarios que tendran acceso a estas carpetas y configure sus permisos</p>
      <div className="mb-4">
        <div className="input-group mb-2 mb-sm-0">
            <div className="input-group-prepend input-group-text">
                <i className="bi-search"></i>
            </div>
          <input type="text" className="form-control" name="fullName" placeholder="Buscar por nombre o correo..." aria-label="Buscar por nombre o correo..." />

        </div>
      </div>
     {/*End Form */}


     <table className="table">
        <thead>
            <tr>
                <th scope="col">Usuario</th>
                <th scope="col">Ver</th>
                <th scope="col">Descargar</th>
                <th scope="col">Eliminar</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar avatar-sm avatar-circle">
                    <img className="avatar-img" src="../assets/img/160x160/img3.jpg" alt="Image Description" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="text-body mb-0">John Doe</h5>
                  <span className="d-block small">amanda@site.com</span>
                </div>
              </div>
            </td>
            <td className="align-middle">
                <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch2">
                    <span className="col-4 col-sm-3 text-end">
                        <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch2" />
                    </span>
                </label>
            </td>
            <td className="align-middle">
             <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch2">
                    <span className="col-4 col-sm-3 text-end">
                        <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch2" />
                    </span>
              </label>
    
            </td>
            <td>
                <div role="button" className="w-100" style={{fontSize: "2rem"}}>
                    <i className="bi-x text-danger"></i>
                </div>
            </td>
            </tr>
            <tr>
            <td>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar avatar-sm avatar-circle">
                    <img className="avatar-img" src="../assets/img/160x160/img3.jpg" alt="Image Description" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="text-body mb-0">John Doe</h5>
                  <span className="d-block small">amanda@site.com</span>
                </div>
              </div>
            </td>
            <td className="align-middle">
                <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch2">
                    <span className="col-4 col-sm-3 text-end">
                        <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch2" />
                    </span>
                </label>
            </td>
            <td className="align-middle">
             <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch2">
                    <span className="col-4 col-sm-3 text-end">
                        <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch2" />
                    </span>
              </label>
    
            </td>
            <td>
                <div role="button" className="w-100" style={{fontSize: "2rem"}}>
                    <i className="bi-x text-danger"></i>
                </div>
            </td>
            </tr>
            <tr>
            <td>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar avatar-sm avatar-circle">
                    <img className="avatar-img" src="../assets/img/160x160/img3.jpg" alt="Image Description" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="text-body mb-0">John Doe</h5>
                  <span className="d-block small">amanda@site.com</span>
                </div>
              </div>
            </td>
            <td className="align-middle">
                <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch2">
                    <span className="col-4 col-sm-3 text-end">
                        <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch2" />
                    </span>
                </label>
            </td>
            <td className="align-middle">
             <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch2">
                    <span className="col-4 col-sm-3 text-end">
                        <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch2" />
                    </span>
              </label>
    
            </td>
            <td>
                <div role="button" className="w-100" style={{fontSize: "2rem"}}>
                    <i className="bi-x text-danger"></i>
                </div>
            </td>
            </tr>
                    
        </tbody>
        </table>

      <hr className="mt-2" />
   {/*    <div className="d-grid gap-3">
    


        <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch2">
          <span className="col-8 col-sm-9 ms-0">
            <i className="bi-chat-left-dots text-primary me-3"></i>
            <span className="text-dark">Show team activity</span>
          </span>
          <span className="col-4 col-sm-3 text-end">
            <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch2" />
          </span>
        </label>

      </div>
 */}
     {/*Footer */}
      <div className="d-sm-flex align-items-center mt-5">
        <button type="button" className="btn btn-ghost-secondary mb-3 mb-sm-0 me-2" data-hs-step-form-prev-options='{
             "targetSelector": "#createProjectStepDetails"
           }'>
          <i className="bi-chevron-left"></i> Previous step
        </button>

        <div className="d-flex justify-content-end gap-3 ms-auto">
          <button type="button" className="btn btn-white" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
          <button id="createProjectFinishBtn" type="button" className="btn btn-primary">Create Folder</button>
        </div>
      </div>
     {/*End Footer */}
    </div>
  </div>
 {/*End Content Step Form */}

 {/*Message Body */}
  <div id="createProjectStepSuccessMessage" style={{display: 'none'}}>
    <div className="text-center">
      <img className="img-fluid mb-3" src="./assets/svg/illustrations/oc-hi-five.svg" alt="Image Description" data-hs-theme-appearance="default" style={{maxWidth: '15rem'}} />
      <img className="img-fluid mb-3" src="./assets/svg/illustrations-light/oc-hi-five.svg" alt="Image Description" data-hs-theme-appearance="dark" style={{maxWidth: '15rem'}} />

      <div className="mb-4">
        <h2>Successful!</h2>
        <p>New project has been successfully created.</p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <a className="btn btn-white" href="./projects.html">
          <i className="bi-chevron-left"></i> Back to projects
        </a>

        <a className="btn btn-primary" href="javascript:;" data-toggle="modal" data-target="#newProjectModal">
          <i className="bi-building"></i> Add new project
        </a>
      </div>
    </div>
  </div>
 {/*End Message Body */}
</form>
  )
}
