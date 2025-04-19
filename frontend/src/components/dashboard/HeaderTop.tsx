import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

declare const HSSideNav: any

export const HeaderTop = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    new HSSideNav('.js-navbar-vertical-aside').init()
  }, [])

  return (
    <header
      id="header"
      className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-container navbar-bordered bg-white"
    >
      <div className="navbar-nav-wrap">
        <a className="navbar-brand" href="/" aria-label="Front">
          <img
            className="navbar-brand-logo"
            src="/assets/img/folder-logo.png"
            alt="Logo"
            data-hs-theme-appearance="default"
          />
            <img
            className="navbar-brand-logo-mini"
            src="/assets/img/folder-logo.png"
            alt="Logo"
            data-hs-theme-appearance="default"
          />
         <h2>Grupo</h2>
        </a>

        <div className="navbar-nav-wrap-content-start">
          <button
            type="button"
            className="js-navbar-vertical-aside-toggle-invoker navbar-aside-toggler"
          >
            <i
              className="bi-arrow-bar-left navbar-toggler-short-align"
              data-bs-template='<div className="tooltip d-none d-md-block" role="tooltip"><div className="arrow"></div><div className="tooltip-inner"></div></div>'
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Collapse"
            ></i>
            <i
              className="bi-arrow-bar-right navbar-toggler-full-align"
              data-bs-template='<div className="tooltip d-none d-md-block" role="tooltip"><div className="arrow"></div><div className="tooltip-inner"></div></div>'
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Expand"
            ></i>
          </button>

          {/*   <div className="dropdown ms-2">

            <div className="d-none d-lg-block">
              <div className="input-group input-group-merge input-group-borderless input-group-hover-light navbar-input-group">
                <div className="input-group-prepend input-group-text">
                  <i className="bi-search"></i>
                </div>

                <input type="search" className="form-control" placeholder="Search in front" aria-label="Search in front" data-hs-for-search-options='{
                         "clearIcon": "#clearSearchResultsIcon",
                         "dropMenuElement": "#searchDropdownMenu",
                         "dropMenuOffset": 20,
                         "toggleIconOnFocus": true,
                         "activeclassName": "focus"
                       }' />
                <a className="input-group-append input-group-text" href="#">
                  <i id="clearSearchResultsIcon" className="bi-x-lg" style={{ display: 'none' }}></i>
                </a>
              </div>
            </div>

            <button className="js-htmlForm-search js-htmlForm-search-mobile-toggle btn btn-ghost-secondary btn-icon rounded-circle d-lg-none" type="button" data-hs-for-search-options='{
                         "clearIcon": "#clearSearchResultsIcon",
                         "dropMenuElement": "#searchDropdownMenu",
                         "dropMenuOffset": 20,
                         "toggleIconOnFocus": true,
                         "activeclassName": "focus"
                       }'>
              <i className="bi-search"></i>
            </button>



            <div id="searchDropdownMenu" className="hs-htmlForm-search-menu-content dropdown-menu dropdown-menu-htmlForm-search navbar-dropdown-menu-borderless">
              <div className="card">

                <div className="card-body-height">
                  <div className="d-lg-none">
                    <div className="input-group input-group-merge navbar-input-group mb-5">
                      <div className="input-group-prepend input-group-text">
                        <i className="bi-search"></i>
                      </div>

                      <input type="search" className="htmlForm-control" placeholder="Search in front" aria-label="Search in front" />
                      <a className="input-group-append input-group-text" href="#">
                        <i className="bi-x-lg"></i>
                      </a>
                    </div>
                  </div>

                  <span className="dropdown-header">Recent searches</span>

                  <div className="dropdown-item bg-transparent text-wrap">
                    <a className="btn btn-soft-dark btn-xs rounded-pill" href="../index.html">
                      Gulp <i className="bi-search ms-1"></i>
                    </a>
                    <a className="btn btn-soft-dark btn-xs rounded-pill" href="../index.html">
                      Notification panel <i className="bi-search ms-1"></i>
                    </a>
                  </div>

                  <div className="dropdown-divider"></div>

                  <span className="dropdown-header">Tutorials</span>

                  <a className="dropdown-item" href="../index.html">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <span className="icon icon-soft-dark icon-xs icon-circle">
                          <i className="bi-sliders"></i>
                        </span>
                      </div>

                      <div className="flex-grow-1 text-truncate ms-2">
                        <span>How to set up Gulp?</span>
                      </div>
                    </div>
                  </a>

                  <a className="dropdown-item" href="../index.html">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <span className="icon icon-soft-dark icon-xs icon-circle">
                          <i className="bi-paint-bucket"></i>
                        </span>
                      </div>

                      <div className="flex-grow-1 text-truncate ms-2">
                        <span>How to change theme color?</span>
                      </div>
                    </div>
                  </a>

                  <div className="dropdown-divider"></div>

                  <span className="dropdown-header">Members</span>

                  <a className="dropdown-item" href="../index.html">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img className="avatar avatar-xs avatar-circle" src="../assets/img/160x160/img10.jpg" alt="Image Description" />
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <span>Amanda Harvey <i className="tio-verified text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
                      </div>
                    </div>
                  </a>

                  <a className="dropdown-item" href="../index.html">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img className="avatar avatar-xs avatar-circle" src="../assets/img/160x160/img3.jpg" alt="Image Description" />
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <span>David Harrison</span>
                      </div>
                    </div>
                  </a>

                  <a className="dropdown-item" href="../index.html">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar avatar-xs avatar-soft-info avatar-circle">
                          <span className="avatar-initials">A</span>
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <span>Anne Richard</span>
                      </div>
                    </div>
                  </a>
                </div>

                <a className="card-footer text-center" href="../index.html">
                  See all results <i className="bi-chevron-right small"></i>
                </a>

              </div>
            </div>


          </div> */}
        </div>

        <div className="navbar-nav-wrap-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="dropdown">
                <a
                  className="navbar-dropdown-account-wrapper"
                  href="#"
                  id="accountNavbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-auto-close="outside"
                  data-bs-dropdown-animation
                >
                  {/*     <div className="avatar avatar-sm avatar-circle">
                    <img className="avatar-img" src="../assets/img/160x160/img6.jpg" alt="Image Description" />
                    <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                  </div> */}
                  <span
                    className="avatar avatar-soft-primary avatar-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={user?.name}
                  >
                    <span className="avatar-initials">
                      {user?.name.charAt(0)}
                    </span>
                  </span>
                  <span className="d-none d-sm-inline-block ms-2">
                    {user?.name}
                  </span>
                </a>

                <div
                  className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account"
                  aria-labelledby="accountNavbarDropdown"
                  style={{ minWidth: '16rem' }}
                >
                  <div className="dropdown-item-text">
                    <div className="d-flex align-items-center">
                      {/*  <div className="avatar avatar-sm avatar-circle">
                          <img className="avatar-img" src="../assets/img/160x160/img6.jpg" alt="Image Description" />
                        </div> */}
                      <a
                        className="avatar avatar-soft-primary avatar-circle"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={user?.name}
                      >
                        <span className="avatar-initials">
                          {user?.name.charAt(0)}
                        </span>
                      </a>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="mb-0">{user?.name}</h5>
                        <p className="card-text text-body">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  {/*  <div className="dropdown">
                      <a className="navbar-dropdown-submenu-item dropdown-item dropdown-toggle" href="#" id="navSubmenuPagesAccountDropdown1" data-bs-toggle="dropdown" aria-expanded="false">Set status</a>
    
                      <div className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-sub-menu" aria-labelledby="navSubmenuPagesAccountDropdown1">
                        <a className="dropdown-item" href="#">
                          <span className="legend-indicator bg-success me-1"></span> Available
                        </a>
                        <a className="dropdown-item" href="#">
                          <span className="legend-indicator bg-danger me-1"></span> Busy
                        </a>
                        <a className="dropdown-item" href="#">
                          <span className="legend-indicator bg-warning me-1"></span> Away
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#"> Reset status
                        </a>
                      </div>
                    </div>
                   
    
                    <a className="dropdown-item" href="#">Profile &amp; account</a>
                    <a className="dropdown-item" href="#">Settings</a>
    
                    <div className="dropdown-divider"></div>
    
                    <a className="dropdown-item" href="#">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="avatar avatar-sm avatar-dark avatar-circle">
                            <span className="avatar-initials">HS</span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h5 className="mb-0">Htmlstream <span className="badge bg-primary rounded-pill text-uppercase ms-1">PRO</span></h5>
                          <span className="card-text">hs.example.com</span>
                        </div>
                      </div>
                    </a>
    
                    <div className="dropdown-divider"></div>
    
                
                    <div className="dropdown">
                      <a className="navbar-dropdown-submenu-item dropdown-item dropdown-toggle" href="#" id="navSubmenuPagesAccountDropdown2" data-bs-toggle="dropdown" aria-expanded="false">Customization</a>
    
                      <div className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-sub-menu" aria-labelledby="navSubmenuPagesAccountDropdown2">
                        <a className="dropdown-item" href="#">
                          Invite people
                        </a>
                        <a className="dropdown-item" href="#">
                          Analytics
                          <i className="bi-box-arrow-in-up-right"></i>
                        </a>
                        <a className="dropdown-item" href="#">
                          Customize Front
                          <i className="bi-box-arrow-in-up-right"></i>
                        </a>
                      </div>
                    </div>
                 
    
                    <a className="dropdown-item" href="#">Manage team</a>
    
                    <div className="dropdown-divider"></div> */}

                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Cerrar sesión
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
