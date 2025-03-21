import { useEffect } from "react"

declare const HSFormSearch: any
declare const HSGoTo: any
declare const HSCore: any

export const SearchUser = () => {
    useEffect(() => {

        HSCore.components.HSList.init('#docsSearch');
        new HSGoTo('.js-go-to')
        new HSFormSearch('.js-form-search')
   
    })
  return (
<div className="position-relative z-index-2">

  <div className="mb-4">
    <div className="input-group input-group-merge">
      <input type="text" className="js-form-search form-control" placeholder="Buscar por nombre o correo..."
             data-hs-form-search-options='{
               "clearIcon": "#clearIconMenuEg",
               "defaultIcon": "#defaultIconMenuEg",
               "dropMenuElement": "#dropMenuEg",
               "dropMenuOffset": 20
             }' />
      <button type="button" className="input-group-append input-group-text">
        <i id="clearIconMenuEg" className="bi-x-lg" style={{ display: "none" }}></i>
        <i id="defaultIconMenuEg" className="bi-search" style={{ display: "none" }}></i>
      </button>
    </div>
  </div>

  <div id="dropMenuEg" className="hs-form-search-menu-content dropdown-menu dropdown-menu-form-search navbar-dropdown-menu-borderless">
  
    <div className="card-body-height">
   {/*    <span className="dropdown-header">Recent searches</span>

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

      <div className="dropdown-divider"></div> */}

      <span className="dropdown-header">Usuarios</span>

      <a className="dropdown-item" href="javascript:;">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <img className="avatar avatar-xs avatar-circle" src="../assets/img/160x160/img10.jpg" alt="Image Description" />
          </div>
          <div className="flex-grow-1 text-truncate ms-2">
            <span>Amanda Harvey <i className="bi-patch-check-fill text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
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
  
  {/*   <a className="card-footer text-center" href="../index.html">
      See all results <i className="bi-chevron-right small"></i>
    </a> */}
  
  </div>
  
</div>
  )
}
