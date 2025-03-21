import { SearchUser} from "@/components"

export const FilePersmision = () => {
  return (
    <>
      <SearchUser />

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
    </>
  
  )
}
