
import { UserFileList, UserFoderList} from "@/components";
import { useEffect, useState } from "react";
import { useUserFolder } from "@/hooks";

declare const HSBsDropdown: any;
declare const HSCore: any;

interface Breadcrumbs {
  id: number;
  name: string;
  class?: string;
}

export const UserFoldersPage = () => {
  const [folderId, setFolderId] = useState<number>(0);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([]);

  const { files, folders, loadingFiles, loadingFolders } = useUserFolder({ folderId });

  const handleNavigateToSubfolder = (
    newFolderId: number,
    newFolderName: string
  ) => {
    const newSubFolder = { id: newFolderId, name: newFolderName };
    setFolderId(newFolderId);
    setBreadcrumbs((prevState) => [...prevState, newSubFolder]);
  };

  const handleGoBackToFolder = (folderId: number) => {
    setFolderId(folderId);
    setBreadcrumbs((prevState) =>
      prevState.slice(0, prevState.findIndex((x) => x.id === folderId) + 1)
    );
  };

  useEffect(() => {
    HSBsDropdown.init();
    HSCore.components.HSTomSelect.init(".js-select");
  }, []);
  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-end">
          <div className="col-sm mb-2 mb-sm-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-no-gutter mb-4">
                <li className="breadcrumb-item">
                  <a
                    className="breadcrumb-link"
                    href="javascript:;"
                    onClick={() => handleGoBackToFolder(0)}
                  >
                    Mis archivos
                  </a>
                </li>

                {breadcrumbs.map((breadcrumb, index) => (
                  <li
                    className="breadcrumb-item"
                    key={index}
                    onClick={() => handleGoBackToFolder(breadcrumb.id)}
                  >
                    <a
                      className={`breadcrumb-link ${breadcrumb.class}`}
                      href="javascript:;"
                    >
                      {breadcrumb.name}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <h1 className="page-header-title mb-2">Files</h1>
            <div className="d-flex align-items-center gap-2">
              <div>
                <i className="bi-folder me-1"></i>
                <strong>2</strong> Folders
              </div>
              <div>
                <i className="bi-files me-1"></i>
                <strong>3</strong> Archivos
              </div>
            </div>
          </div>

       
          {/*End Col */}
        </div>
        {/*End Row */}
      </div>

      <div className="row mb-5">
        <div className="col-lg-8 pe-0">
          <div className="d-none d-lg-block">
            <div className="input-group input-group-merge ">
              <div className="input-group-prepend input-group-text">
                <i className="bi-search"></i>
              </div>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstNameLabel"
                placeholder="buscar archivos..."
                aria-label="buscar archivos"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-flex">
          <div className="d-flex align-items-center me-2 flex-grow-1">
            <div className="dropdown w-100">
              <button
                type="button"
                id="usersFilterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="js-file-attach-reset-img btn btn-white w-100"
              >
                <i className="bi-filter me-1"></i> Filter{" "}
                <span className="badge bg-soft-dark text-dark rounded-circle ms-1">
                  2
                </span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-sm-end dropdown-card card-dropdown-filter-centered"
                aria-labelledby="usersFilterDropdown"
                style={{ minWidth: "22rem" }}
              >
                {/* Card */}
                <div className="card">
                  <div className="card-header card-header-content-between">
                    <h5 className="card-header-title">Filter users</h5>

                    {/* Toggle Button */}
                    <button
                      type="button"
                      className="btn btn-ghost-secondary btn-icon btn-sm ms-2"
                    >
                      <i className="bi-x-lg"></i>
                    </button>
                    {/* End Toggle Button */}
                  </div>

                  <div className="card-body">
                    <form>
                      <div className="mb-4">
                        <small className="text-cap text-body">Role</small>

                        <div className="row">
                          <div className="col">
                            {/* Check */}
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="usersFilterCheckAll"
                                checked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="usersFilterCheckAll"
                              >
                                All
                              </label>
                            </div>
                            {/* End Check */}
                          </div>
                          {/* End Col */}

                          <div className="col">
                            {/* Check */}
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="usersFilterCheckEmployee"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="usersFilterCheckEmployee"
                              >
                                Employee
                              </label>
                            </div>
                            {/* End Check */}
                          </div>
                          {/* End Col */}
                        </div>
                        {/* End Row */}
                      </div>

                      <div className="row">
                        <div className="col-sm mb-4">
                          <small className="text-cap text-body">Position</small>

                          {/* Select */}
                          <div className="tom-select-custom">
                            <select
                              className="js-select js-datatable-filter form-select form-select-sm"
                              data-target-column-index="2"
                              data-hs-tom-select-options='{
                                      "placeholder": "Any",
                                      "searchInDropdown": false,
                                      "hideSearch": true,
                                      "dropdownWidth": "10rem"
                                    }'
                            >
                              <option value="">Any</option>
                              <option value="Accountant">Accountant</option>
                              <option value="Co-founder">Co-founder</option>
                              <option value="Designer">Designer</option>
                              <option value="Developer">Developer</option>
                              <option value="Director">Director</option>
                            </select>
                            {/* End Select */}
                          </div>
                        </div>
                        {/* End Col */}

                        <div className="col-sm mb-4">
                          <small className="text-cap text-body">Status</small>

                          {/* Select */}
                          <div className="tom-select-custom">
                            <select
                              className="js-select js-datatable-filter form-select form-select-sm"
                              data-target-column-index="4"
                              data-hs-tom-select-options='{
                                      "placeholder": "Any status",
                                      "searchInDropdown": false,
                                      "hideSearch": true,
                                      "dropdownWidth": "10rem"
                                    }'
                            >
                              <option value="">Any status</option>
                              <option
                                value="Completed"
                                data-option-template='<span className="d-flex align-items-center"><span className="legend-indicator bg-success"></span>Completed</span>'
                              >
                                Completed
                              </option>
                              <option
                                value="In progress"
                                data-option-template='<span className="d-flex align-items-center"><span className="legend-indicator bg-warning"></span>In progress</span>'
                              >
                                In progress
                              </option>
                              <option
                                value="To do"
                                data-option-template='<span className="d-flex align-items-center"><span className="legend-indicator bg-danger"></span>To do</span>'
                              >
                                To do
                              </option>
                            </select>
                          </div>
                          {/* End Select */}
                        </div>
                        {/* End Col */}

                        <div className="col-12 mb-4">
                          <small className="text-cap text-body">Members</small>

                          {/* Select */}
                          <div className="tom-select-custom">
                            <select
                              className="js-select form-select"
                              autoComplete="off"
                              multiple
                              data-hs-tom-select-options='{
                                      "singleMultiple": true,
                                      "hideSelected": false,
                                      "placeholder": "Select member"
                                    }'
                            >
                              <option label="empty"></option>
                              <option
                                value="AH"
                                selected
                                data-option-template='<span className="d-flex align-items-center"><img className="avatar avatar-xss avatar-circle me-2" src="./assets/img/160x160/img10.jpg" alt="Image Description" /><span className="text-truncate">Amanda Harvey</span></span>'
                              >
                                Amanda Harvey
                              </option>
                              <option
                                value="DH"
                                selected
                                data-option-template='<span className="d-flex align-items-center"><img className="avatar avatar-xss avatar-circle me-2" src="./assets/img/160x160/img3.jpg" alt="Image Description" /><span className="text-truncate">David Harrison</span></span>'
                              >
                                David Harrison
                              </option>
                              <option
                                value="SK"
                                data-option-template='<span className="d-flex align-items-center"><img className="avatar avatar-xss avatar-circle me-2" src="./assets/img/160x160/img4.jpg" alt="Image Description" /><span className="text-truncate">Sam Kart</span></span>'
                              >
                                Sam Kart
                              </option>
                              <option
                                value="FH"
                                data-option-template='<span className="d-flex align-items-center"><img className="avatar avatar-xss avatar-circle me-2" src="./assets/img/160x160/img5.jpg" alt="Image Description" /><span className="text-truncate">Finch Hoot</span></span>'
                              >
                                Finch Hoot
                              </option>
                              <option
                                value="CQ"
                                selected
                                data-option-template='<span className="d-flex align-items-center"><img className="avatar avatar-xss avatar-circle me-2" src="./assets/img/160x160/img6.jpg" alt="Image Description" /><span className="text-truncate">Costa Quinn</span></span>'
                              >
                                Costa Quinn
                              </option>
                            </select>
                          </div>
                          {/* End Select */}
                        </div>
                        {/* End Col */}
                      </div>
                      {/* End Row */}

                      <div className="d-grid">
                        <a className="btn btn-primary" href="javascript:;">
                          Apply
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                {/* End Card */}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <ul className="nav nav-segment" id="connectionsTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="grid-tab"
                  data-bs-toggle="tab"
                  href="#grid"
                  role="tab"
                  aria-controls="grid"
                  aria-selected="true"
                  title="Column view"
                >
                  <i className="bi-grid"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="list-tab"
                  data-bs-toggle="tab"
                  href="#list"
                  role="tab"
                  aria-controls="list"
                  aria-selected="false"
                  title="List view"
                >
                  <i className="bi-view-list"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {folders.length > 0 && (
        <>
          <h2 className="h4 mb-3">Folders</h2>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-5">
            <UserFoderList
              loading={loadingFolders}
              folders={folders}
              onSelectSubFolder={handleNavigateToSubfolder}
            />
          </div>
        </>
      )}

      {/*Header */}
      {files.length > 0 && (
        <>
          <div className="row align-items-center mb-2">
            <div className="col">
              <h2 className="h4 mb-0">Files</h2>
            </div>
          </div>

          <UserFileList files={files} loading={loadingFiles} />
        </>
      )}
    </div>
  );
};
