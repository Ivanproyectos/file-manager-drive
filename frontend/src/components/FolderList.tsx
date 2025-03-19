import {  useEffect } from "react";

declare const HSCore: any;
declare const HSBsDropdown: any;

export const FolderList = () => {
 
 useEffect(() => {

    HSBsDropdown.init()
    
    HSCore.components.HSTomSelect.init('.js-select')

    HSCore.components.HSDatatables.init($('#datatable'), {
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'copy',
            className: 'd-none'
          },
          {
            extend: 'excel',
            className: 'd-none'
          },
          {
            extend: 'csv',
            className: 'd-none'
          },
          {
            extend: 'pdf',
            className: 'd-none'
          },
          {
            extend: 'print',
            className: 'd-none'
          },
        ],
        select: {
          style: 'multi',
          selector: 'td:first-child input[type="checkbox"]',
          classMap: {
            checkAll: '#datatableCheckAll',
            counter: '#datatableCounter',
            counterInfo: '#datatableCounterInfo'
          }
        },
        language: {
          zeroRecords: `<div class="text-center p-4">
              <img class="mb-3" src="./assets/svg/illustrations/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="default">
              <img class="mb-3" src="./assets/svg/illustrations-light/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="dark">
            <p class="mb-0">No data to show</p>
            </div>`
        }
      });

      const datatable = HSCore.components.HSDatatables.getItem(0); 

      $('#export-copy').click(function() {
        datatable.button('.buttons-copy').trigger()
      });

      $('#export-excel').click(function() {
        datatable.button('.buttons-excel').trigger()
      });

      $('#export-csv').click(function() {
        datatable.button('.buttons-csv').trigger()
      });

      $('#export-pdf').click(function() {
        datatable.button('.buttons-pdf').trigger()
      });

      $('#export-print').click(function() {
        datatable.button('.buttons-print').trigger()
      });


      $('.js-datatable-filter').on('change', function() {
        var $this = $(this),
          elVal = $this.val(),
          targetColumnIndex = $this.data('target-column-index');

        datatable.column(targetColumnIndex).search(elVal).draw();
      });

  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header card-header-content-md-between">
        <div className="mb-2 mb-md-0">
          <form>
            {/* Search */}
            <div className="input-group input-group-merge input-group-flush">
              <div className="input-group-prepend input-group-text">
                <i className="bi-search"></i>
              </div>
              <input
                id="datatableSearch"
                type="search"
                className="form-control"
                placeholder="Search users"
                aria-label="Search users"
              />
            </div>
            {/* End Search */}
          </form>
        </div>

        <div className="d-grid d-sm-flex justify-content-md-end align-items-sm-center gap-2">
          {/* Datatable Info */}
          <div id="datatableCounterInfo" style={{ display: "none" }}>
            <div className="d-flex align-items-center">
              <span className="fs-5 me-3">
                <span id="datatableCounter">0</span>
                Selected
              </span>
              <a className="btn btn-outline-danger btn-sm" href="javascript:;">
                <i className="bi-trash"></i> Delete
              </a>
            </div>
          </div>
          {/* End Datatable Info */}

          {/* Dropdown */}
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-white btn-sm dropdown-toggle w-100"
              id="usersExportDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi-download me-2"></i> Export
            </button>

            <div
              className="dropdown-menu dropdown-menu-sm-end"
              aria-labelledby="usersExportDropdown"
            >
              <span className="dropdown-header">Options</span>
              <a id="export-copy" className="dropdown-item" href="javascript:;">
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/illustrations/copy-icon.svg"
                  alt="Image Description"
                />
                Copy
              </a>
              <a
                id="export-print"
                className="dropdown-item"
                href="javascript:;"
              >
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/illustrations/print-icon.svg"
                  alt="Image Description"
                />
                Print
              </a>
              <div className="dropdown-divider"></div>
              <span className="dropdown-header">Download options</span>
              <a
                id="export-excel"
                className="dropdown-item"
                href="javascript:;"
              >
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/brands/excel-icon.svg"
                  alt="Image Description"
                />
                Excel
              </a>
              <a id="export-csv" className="dropdown-item" href="javascript:;">
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/components/placeholder-csv-format.svg"
                  alt="Image Description"
                />
                .CSV
              </a>
              <a id="export-pdf" className="dropdown-item" href="javascript:;">
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src="./assets/svg/brands/pdf-icon.svg"
                  alt="Image Description"
                />
                PDF
              </a>
            </div>
          </div>
          {/* End Dropdown */}

          {/* Dropdown */}
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-white btn-sm w-100"
              id="usersFilterDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
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
          {/* End Dropdown */}
        </div>
      </div>
      {/* End Header */}

      {/* Table */}
      <div className="table-responsive datatable-custom">
        <table id="datatable"
          className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
          data-hs-datatables-options='{
               "columnDefs": [{
                      "targets": [0, 2, 3],
                      "orderable": false
                    }],
                   "order": [],
                   "info": {
                     "totalQty": "#datatableWithPaginationInfoTotalQty"
                   },
                   "search": "#datatableSearch",
                   "entries": "#datatableEntries",
                   "pageLength": 15,
                   "isResponsive": false,
                   "isShowPaging": false,
                   "pagination": "datatablePagination"
                 }'
        >
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Country</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img10.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Amanda Harvey{" "}
                      <i
                        className="bi-patch-check-fill text-primary"
                        data-toggle="tooltip"
                        data-bs-placement="top"
                        title="Top endorsed"
                      ></i>
                    </span>
                    <span className="d-block fs-5 text-body">
                      amanda@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Director</span>
                <span className="d-block fs-5">Human resources</span>
              </td>
              <td>United Kingdom</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">A</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Anne Richard
                    </span>
                    <span className="d-block fs-5 text-body">
                      anne@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Seller</span>
                <span className="d-block fs-5">Branding products</span>
              </td>
              <td>United States</td>
              <td>
                <span className="legend-indicator bg-warning"></span>Pending
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img3.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      David Harrison
                    </span>
                    <span className="d-block fs-5 text-body">
                      david@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Unknown</span>
                <span className="d-block fs-5">Unknown</span>
              </td>
              <td>United States</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img5.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Finch Hoot
                    </span>
                    <span className="d-block fs-5 text-body">
                      finch@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Designer</span>
                <span className="d-block fs-5">IT department</span>
              </td>
              <td>Argentina</td>
              <td>
                <span className="legend-indicator bg-danger"></span>Suspended
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">B</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Bob Dean
                    </span>
                    <span className="d-block fs-5 text-body">
                      bob@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Executive director</span>
                <span className="d-block fs-5">Marketing</span>
              </td>
              <td>Austria</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img9.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Ella Lauda{" "}
                      <i
                        className="bi-patch-check-fill text-primary"
                        data-toggle="tooltip"
                        data-bs-placement="top"
                        title="Top endorsed"
                      ></i>
                    </span>
                    <span className="d-block fs-5 text-body">
                      ella@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Co-founder</span>
                <span className="d-block fs-5">All departments</span>
              </td>
              <td>United Kingdom</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">L</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Lori Hunter
                    </span>
                    <span className="d-block fs-5 text-body">
                      hunter@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Developer</span>
                <span className="d-block fs-5">Mobile app</span>
              </td>
              <td>Estonia</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">M</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Mark Colbert
                    </span>
                    <span className="d-block fs-5 text-body">
                      mark@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Executive director</span>
                <span className="d-block fs-5">Human resources</span>
              </td>
              <td>Canada</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img6.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Costa Quinn
                    </span>
                    <span className="d-block fs-5 text-body">
                      costa@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Co-founder</span>
                <span className="d-block fs-5">All departments</span>
              </td>
              <td>France</td>
              <td>
                <span className="legend-indicator bg-warning"></span>Pending
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">R</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Rachel Doe{" "}
                      <i
                        className="bi-patch-check-fill text-primary"
                        data-toggle="tooltip"
                        data-bs-placement="top"
                        title="Top endorsed"
                      ></i>
                    </span>
                    <span className="d-block fs-5 text-body">
                      rachel@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Accountant</span>
                <span className="d-block fs-5">Finance</span>
              </td>
              <td>United States</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img8.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Linda Bates
                    </span>
                    <span className="d-block fs-5 text-body">
                      linda@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Unknown</span>
                <span className="d-block fs-5">Unknown</span>
              </td>
              <td>United Kingdom</td>
              <td>
                <span className="legend-indicator bg-danger"></span>Suspended
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">B</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Brian Halligan
                    </span>
                    <span className="d-block fs-5 text-body">
                      brian@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Director</span>
                <span className="d-block fs-5">Accounting</span>
              </td>
              <td>France</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">C</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Chris Mathew
                    </span>
                    <span className="d-block fs-5 text-body">
                      chris@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Developer</span>
                <span className="d-block fs-5">Mobile app</span>
              </td>
              <td>Switzerland</td>
              <td>
                <span className="legend-indicator bg-warning"></span>Pending
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img7.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Clarice Boone{" "}
                      <i
                        className="bi-patch-check-fill text-primary"
                        data-toggle="tooltip"
                        data-bs-placement="top"
                        title="Top endorsed"
                      ></i>
                    </span>
                    <span className="d-block fs-5 text-body">
                      clarice@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Seller</span>
                <span className="d-block fs-5">Branding products</span>
              </td>
              <td>United Kingdom</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">L</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Lewis Clarke
                    </span>
                    <span className="d-block fs-5 text-body">
                      lewis@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Co-founder</span>
                <span className="d-block fs-5">IT department</span>
              </td>
              <td>Switzerland</td>
              <td>
                <span className="legend-indicator bg-warning"></span>Pending
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img4.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Sam Kart
                    </span>
                    <span className="d-block fs-5 text-body">
                      sam@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Designer</span>
                <span className="d-block fs-5">Branding</span>
              </td>
              <td>Canada</td>
              <td>
                <span className="legend-indicator bg-warning"></span>Pending
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">J</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Johnny Appleseed
                    </span>
                    <span className="d-block fs-5 text-body">
                      johnny@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Accountant</span>
                <span className="d-block fs-5">Human resources</span>
              </td>
              <td>United States</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">P</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Phileas Fogg
                    </span>
                    <span className="d-block fs-5 text-body">
                      phileas@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Designer</span>
                <span className="d-block fs-5">Branding</span>
              </td>
              <td>Spain</td>
              <td>
                <span className="legend-indicator bg-danger"></span>Suspended
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-circle">
                    <img
                      className="avatar-img"
                      src="../assets/img/160x160/img6.jpg"
                      alt="Image Description"
                    />
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Mark Williams{" "}
                      <i
                        className="bi-patch-check-fill text-primary"
                        data-toggle="tooltip"
                        data-bs-placement="top"
                        title="Top endorsed"
                      ></i>
                    </span>
                    <span className="d-block fs-5 text-body">
                      mark@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Co-founder</span>
                <span className="d-block fs-5">Branding</span>
              </td>
              <td>United Kingdom</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">T</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Timothy Silva
                    </span>
                    <span className="d-block fs-5 text-body">
                      timothy@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Developer</span>
                <span className="d-block fs-5">Mobile app</span>
              </td>
              <td>Italy</td>
              <td>
                <span className="legend-indicator bg-warning"></span>Pending
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">G</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Gary Bishop{" "}
                      <i
                        className="bi-patch-check-fill text-primary"
                        data-toggle="tooltip"
                        data-bs-placement="top"
                        title="Top endorsed"
                      ></i>
                    </span>
                    <span className="d-block fs-5 text-body">
                      gary@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Developer</span>
                <span className="d-block fs-5">Mobile app</span>
              </td>
              <td>Latvia</td>
              <td>
                <span className="legend-indicator bg-success"></span>Active
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">Y</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Yorker Scogings
                    </span>
                    <span className="d-block fs-5 text-body">
                      yorker@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Seller</span>
                <span className="d-block fs-5">Branding products</span>
              </td>
              <td>Norway</td>
              <td>
                <span className="legend-indicator bg-danger"></span>Suspended
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">F</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Frank Phillips
                    </span>
                    <span className="d-block fs-5 text-body">
                      frank@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Unknown</span>
                <span className="d-block fs-5">Unknown</span>
              </td>
              <td>Norway</td>
              <td>
                <span className="legend-indicator bg-danger"></span>Suspended
              </td>
            </tr>

            <tr>
              <td>
                <a
                  className="d-flex align-items-center"
                  href="../user-profile.html"
                >
                  <div className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">E</span>
                  </div>
                  <div className="ms-3">
                    <span className="d-block h5 text-inherit mb-0">
                      Elizabeth Carter
                    </span>
                    <span className="d-block fs-5 text-body">
                      eliz@example.com
                    </span>
                  </div>
                </a>
              </td>
              <td>
                <span className="d-block h5 mb-0">Unknown</span>
                <span className="d-block fs-5">Unknown</span>
              </td>
              <td>United States</td>
              <td>
                <span className="legend-indicator bg-warning"></span>Pending
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      {/* End Table */}

      {/* Footer */}
      <div className="card-footer">
        <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
          <div className="col-sm mb-2 mb-sm-0">
            <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
              <span className="me-2">Showing:</span>

              {/* Select */}
              <div className="tom-select-custom">
                <select
                  id="datatableEntries"
                  className="js-select form-select form-select-borderless w-auto"
                  autoComplete="off"
                  data-hs-tom-select-options='{
                            "searchInDropdown": false,
                            "hideSearch": true
                          }'
                >
                  <option value="10">10</option>
                  <option value="15" selected>
                    15
                  </option>
                  <option value="20">20</option>
                </select>
              </div>
              {/* End Select */}

              <span className="text-secondary me-2">of</span>

              {/* Pagination Quantity */}
              <span id="datatableWithPaginationInfoTotalQty"></span>
            </div>
          </div>
          {/* End Col */}

          <div className="col-sm-auto">
            <div className="d-flex justify-content-center justify-content-sm-end">
              {/* Pagination */}
              <nav
                id="datatablePagination"
                aria-label="Activity pagination"
              ></nav>
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Row */}
      </div>
      {/* End Footer */}
    </div>
  );
};
