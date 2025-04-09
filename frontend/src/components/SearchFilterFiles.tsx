
interface Props {
   onSearch: (value: string) => void
}
export const SearchFilterFiles = ({ onSearch }: Props) => {

  return (
    <>
       <div className="col-lg-12 pe-0">
            <div className="d-none d-lg-block">
              <div className="input-group input-group-merge ">
                <div className="input-group-prepend input-group-text">
                  <i className="bi-search"></i>
                </div>
                <input
                  onChange={(e) => onSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="buscar archivos..."
                  aria-label="buscar archivos"
                />
              </div>
            </div>
          </div>
      {/*     <div className="col-lg-4 d-flex">
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
                  <div className="card">
                    <div className="card-header card-header-content-between">
                      <h5 className="card-header-title">Filter users</h5>
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm ms-2"
                      >
                        <i className="bi-x-lg"></i>
                      </button>
                    </div>

                    <div className="card-body">
                      <form>
                        <div className="mb-4">
                          <small className="text-cap text-body">Role</small>

                          <div className="row">
                            <div className="col">
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
                            </div>

                            <div className="col">
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
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm mb-4">
                            <small className="text-cap text-body">
                              Position
                            </small>

                          
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
                          
                            </div>
                          </div>
                       

                          <div className="col-sm mb-4">
                            <small className="text-cap text-body">Status</small>

                        
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
                        
                          </div>
                       

                          <div className="col-12 mb-4">
                            <small className="text-cap text-body">
                              Members
                            </small>

                          
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
                        
                          </div>
                    
                        </div>
                   

                        <div className="d-grid">
                          <a className="btn btn-primary" href="javascript:;">
                            Apply
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
               
                </div>
              </div>
            </div>
          </div> */}
    </>
  )
}
