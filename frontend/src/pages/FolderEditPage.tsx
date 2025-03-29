import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FolderDetailsForm, FileDropZone, FolderList } from "@/components";


declare const HSBsDropdown: any;
declare const HSCore: any;
export const FolderEditPage = () => {
  const { id: folderId } = useParams();
  const [uploadId, setUploagId] = useState<string | null>(null);

  
  useEffect(() => {
    HSBsDropdown.init();
    HSCore.components.HSTomSelect.init(".js-select");
  }, []);
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-end">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter mb-4">
                  <li className="breadcrumb-item">
                    <a className="breadcrumb-link" href="javascript:;">
                      Pages
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a className="breadcrumb-link" href="javascript:;">
                      Mis archivos
                    </a>
                  </li>
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

            <div className="d-flex align-items-center">
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
            </div>
          </div>
        </div>

        <h2 className="h4 mb-3">Folders</h2>

        {/*Folders */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-5">

         <FolderList folderId={Number(folderId)} />
     
        </div>
        {/*End Folders */}

        {/*Header */}
        <div className="row align-items-center mb-2">
          <div className="col">
            <h2 className="h4 mb-0">Files</h2>
          </div>

          <div className="col-auto">
            {/*Nav */}
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
            {/*End Nav */}
          </div>
        </div>
        {/*End Header */}

        {/*Tab Content */}
        <div className="tab-content" id="connectionsTabContent">
          <div
            className="tab-pane fade show active"
            id="grid"
            role="tabpanel"
            aria-labelledby="grid-tab"
          >
            {/*Folders */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">25kb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown1"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/brands/google-docs-icon.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">WordPress contract terms</h5>
                    <p className="small">Updated 50 min ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}

              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">1mb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown2"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/brands/pdf-icon.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">Dashboard layout flow</h5>
                    <p className="small">Updated 1 hour ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}

              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">3mb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown3"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown3"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/brands/google-slides-icon.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">WordPress theme presentation</h5>
                    <p className="small">Updated 5 hours ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}

              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">1mb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown4"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown4"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/brands/google-docs-icon.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">Untitled</h5>
                    <p className="small">Updated 5 hours ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}

              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">3mb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown5"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown5"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/brands/google-sheets-icon.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">Hot startups 2019 - Report</h5>
                    <p className="small">Updated 3 weeks ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}

              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">2mb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown6"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown6"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/brands/google-docs-icon.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">Marketing strategy</h5>
                    <p className="small">Updated 2 weeks ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}

              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">15mb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown7"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown7"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/components/placeholder-img-htmlFormat.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">Past-experiences.jpg</h5>
                    <p className="small">Updated 1 month ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}

              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">9mb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown8"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown8"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/components/placeholder-img-htmlFormat.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">Front_2018.jpg</h5>
                    <p className="small">Updated 1 month ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}

              <div className="col mb-3 mb-lg-5">
                {/*Card */}
                <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
                  <div className="card-header card-header-content-between border-0">
                    <span className="small">4mb</span>

                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
                        id="filesGridDropdown9"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesGridDropdown9"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>

                  <div className="card-body">
                    <img
                      className="avatar avatar-4x3"
                      src="../../assets/svg/brands/pdf-icon.svg"
                      alt="Image Description"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">Business opportunities</h5>
                    <p className="small">Updated 2 months ago</p>
                  </div>

                  <a className="stretched-link" href="#"></a>
                </div>
                {/*End Card */}
              </div>
              {/*End Col */}
            </div>
            {/*End Folders */}
          </div>

          <div
            className="tab-pane fade"
            id="list"
            role="tabpanel"
            aria-labelledby="list-tab"
          >
            <ul className="list-group">
              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/brands/google-docs-icon.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        WordPress contract terms
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 50 min ago</li>
                      <li className="list-inline-item">25kb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown1"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}

              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/brands/pdf-icon.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        Dashboard layout flow
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 1 hour ago</li>
                      <li className="list-inline-item">1mb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown2"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}

              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/brands/google-slides-icon.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        WordPress theme presentation
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 5 hours ago</li>
                      <li className="list-inline-item">3mb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown3"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown3"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}

              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/brands/google-docs-icon.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        Untitled
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 5 hours ago</li>
                      <li className="list-inline-item">1mb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown4"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown4"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}

              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/brands/google-sheets-icon.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        Hot startup 2019 - Report
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 3 weeks ago</li>
                      <li className="list-inline-item">3mb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown5"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown5"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}

              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/brands/google-docs-icon.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        Marketing strategy
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 2 weeks ago</li>
                      <li className="list-inline-item">2mb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown6"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown6"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}

              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/components/placeholder-img-htmlFormat.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        Past-experience.jpg
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 1 month ago</li>
                      <li className="list-inline-item">15mb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown7"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown7"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}

              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/components/placeholder-img-htmlFormat.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        Front_2018.jpg
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 1 month ago</li>
                      <li className="list-inline-item">9mb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown8"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown8"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}

              {/*List Item */}
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="avatar avatar-xs avatar-4x3"
                      src="../../assets/svg/brands/pdf-icon.svg"
                      alt="Image Description"
                    />
                  </div>
                  {/*End Col */}

                  <div className="col">
                    <h5 className="mb-0">
                      <a className="text-dark" href="#">
                        Business opportunities
                      </a>
                    </h5>
                    <ul className="list-inline list-separator small text-body">
                      <li className="list-inline-item">Updated 2 months ago</li>
                      <li className="list-inline-item">4mb</li>
                    </ul>
                  </div>
                  {/*End Col */}

                  <div className="col-auto">
                    {/*Dropdown */}
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-sm"
                        id="filesListDropdown9"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-sm-inline-block me-1">
                          More
                        </span>
                        <i className="bi-chevron-down"></i>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="filesListDropdown9"
                        style={{ minWidth: "13rem" }}
                      >
                        <span className="dropdown-header">Settings</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-share dropdown-item-icon"></i> Share
                          file
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                          Move to
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-star dropdown-item-icon"></i> Add to
                          stared
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-pencil dropdown-item-icon"></i>{" "}
                          Rename
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-download dropdown-item-icon"></i>{" "}
                          Download
                        </a>

                        <div className="dropdown-divider"></div>

                        <a className="dropdown-item" href="#">
                          <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="bi-trash dropdown-item-icon"></i> Delete
                        </a>
                      </div>
                    </div>
                    {/*End Dropdown */}
                  </div>
                  {/*End Col */}
                </div>
                {/*End Row */}
              </li>
              {/*End List Item */}
            </ul>
          </div>
        </div>
        {/*End Tab Content */}
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
                  <FileDropZone onGetUploadId={setUploagId} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
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
                  <FileDropZone onGetUploadId={setUploagId} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
