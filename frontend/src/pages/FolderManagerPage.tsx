import { useCallback, useEffect, useState, useRef} from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  FolderDetailsForm,
  FileDropZone,
  FolderList,
  FileList,
} from "@/components";
import { useFolderContent } from "@/hooks";
import { ICreateFile } from "@/types";
import { useInitTomSelect } from "@/hooks/useInitTomSelect";
import { createFile } from "@/api/files";
import { showError } from "@/utils/alerts";

interface Breadcrumbs {
  id: number;
  name: string;
  class?: string;
}

declare const bootstrap: any;
export const FolderManagerPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const folderName = queryParams.get("folder");
  const { id } = useParams();
  const [folderId, setFolderId] = useState<number>(Number(id));
  const [uploadId, setUploadId] = useState<string>();
  const [dropzone, setDropzone] = useState<any>();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([]);
  const [isValid, setIsValid] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const { files, folders, loadingFiles } = useFolderContent({
    folderId,
  });

  useInitTomSelect();
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

  const handleUploadFiles = async (uploadId: string) => {
    try {
 
      setIsValid(true);
      if (dropzone.files.length === 0) {
        setIsValid(false);
        return;
      }
      const file: ICreateFile = { folderId, uploadId };
      await createFile(file);
      closeModal();
    } catch (error) {
      console.error(error);
      showError("Error al cargar los archivos, vuelva a intentalor mas tarde");
    }
  };

  const closeModal = () => {
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
  }

  const handleDropzone = useCallback((uploadId: string, dropzone?: any) => {
    setUploadId(uploadId);
    setDropzone(dropzone);
  }, []);

  useEffect(() => {
    const newSubFolder = {
      id: Number(id),
      name: folderName?.toString() || "",
      class: "text-primary",
    };
    setBreadcrumbs((prevState) => [...prevState, newSubFolder]);
  }, []);

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-end">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter mb-4">
                  {/*      <li className="breadcrumb-item">
                    <a className="breadcrumb-link" href="javascript:;" onClick={() => handleGoBackToFolder(Number(id))}>
                      {queryParams.get("folder")}
                    </a>
                  </li> */}
                  {/*    <li className="breadcrumb-item">
                    <a className="breadcrumb-link" href="javascript:;">
                      Mis archivos
                    </a>
                  </li> */}
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

            <div className="col-sm-auto" aria-label="Button group">
              {/*Button Group */}
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadFilesModal"
                >
                  <i className="bi-cloud-arrow-up-fill me-1"></i> Cargar
                </button>

                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    id="uploadGroupDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>

                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="uploadGroupDropdown"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#newFolderModal"
                    >
                      <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                      Nuevo Folder
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="javascript:;"
                      data-bs-toggle="modal"
                      data-bs-target="#uploadFilesModal"
                    >
                      <i className="bi-file-earmark-arrow-up dropdown-item-icon"></i>{" "}
                      Cargar archivos
                    </a>
                    {/*   <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal" data-bs-target="#uploadFilesModal">
                  <i className="bi-upload dropdown-item-icon"></i> Upload folder
                </a> */}
                  </div>
                </div>
              </div>
              {/*End Button Group */}
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
                            <small className="text-cap text-body">
                              Position
                            </small>

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
                            <small className="text-cap text-body">
                              Members
                            </small>

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

            {/*     <div className="d-flex align-items-center">
              <ul
                className="nav nav-segment"
                id="connectionsTab"
                role="tablist"
              >
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
            </div> */}
          </div>
        </div>
        {folders.length > 0 && (
          <>
            <h2 className="h4 mb-3">Folders</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-5">
              <FolderList
                folders={folders}
                onSelectSubFolder={handleNavigateToSubfolder}
              />
            </div>
          </>
        )}

        {files.length > 0 && (
          <>
            <div className="row align-items-center mb-2">
              <div className="col">
                <h2 className="h4 mb-0">Files</h2>
              </div>
            </div>
            <FileList files={files} loading={loadingFiles} />
          </>
        )}

        {files.length === 0 && folders.length === 0 && (
          <div className="row align-items-center justify-content-center mt-4">
            <div className="col text-center">
              <img
                className="img-fluid"
                src="/assets/svg/illustrations-light/oc-browse-file.svg"
                width="150"
                height="150"
              />
            </div>
            <p className="text-center text-muted mt-3">
              Ningun resultado para mostrar
            </p>
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="newFolderModal"
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
              <form>
                <FolderDetailsForm />
                <div className="mb-4">
                  <label className="form-label">Adjuntar archivos</label>
                  {/* <FileDropZone onGetUploadId={setUploadId} /> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={modalRef}
        className="modal fade"
        id="uploadFilesModal"
        tabIndex={-1}
        aria-labelledby="uploadFilesModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="uploadFilesModalLabel">
                Cargar archivos
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <FileDropZone onGetUploadId={handleDropzone} validate={isValid} />
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
                className="btn btn-primary d-flex justify-content-center align-items-center"
                onClick={() =>
                  handleUploadFiles(uploadId?.toString() as string)
                }
              >
                Cargar archivos
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
