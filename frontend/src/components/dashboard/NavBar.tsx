import { AuthorizedForRole } from "@/components";
import { RoleName } from "@/types/rolTypes";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  let isCollapsed = false;

  useEffect(() => {

    const toogleNavbar = () => {

      isCollapsed = !isCollapsed
      const movilLogo = document.querySelector('img[data-type-layout="movil"]') as HTMLDivElement;
      const desktopLogo = document.querySelector('div[data-type-layout="desktop"]') as HTMLDivElement;

      if(isCollapsed){

       movilLogo.style.display ='block';
       desktopLogo.setAttribute('style', 'display: none !important;');
    }else{
    
      movilLogo.style.display ='none';
      desktopLogo.setAttribute('style', 'display: flex !important;');
    }
  }

    document.querySelector('#navbarVerticalCollapse')?.addEventListener('click', toogleNavbar)

    return () => {
      document.querySelector('#navbarVerticalCollapse')?.removeEventListener('click', toogleNavbar)
    }

  })
  return (
    <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered bg-white  ">
      <div className="navbar-vertical-container">
        <div className="navbar-vertical-footer-offset">
          {/* Logo */}

          <a className="navbar-brand" href="/" aria-label="Front">
            <div className="navbar-brand-logo d-flex align-items-center gap-2" data-type-layout="desktop"> 
              <img height={25} width={25}
                src="/assets/img/folder-logo.png"
                alt="Logo"
              />
              <h3 className="mb-0">Grupo qhuya</h3>
            </div>
     
            <img height={25} width={25} data-type-layout="movil"
            className="navbar-brand-logo-mini"
            src="/assets/img/folder-logo.png"
            alt="Logo"
          />
     
        </a>

          {/* End Logo */}

          {/* Navbar Vertical Toggle */}
          <button
            id="navbarVerticalCollapse"
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

          {/* End Navbar Vertical Toggle */}

          {/* Content */}
          <div className="navbar-vertical-content">
            <div
              id="navbarVerticalMenu"
              className="nav nav-pills nav-vertical card-navbar-nav"
            >

              <span className="dropdown-header mt-4">Pages</span>
              <small className="bi-three-dots nav-subtitle-replacer"></small>

              {/* Collapse */}
              <div className="navbar-nav nav-compact"></div>
              <div id="navbarVerticalMenuPagesMenu">


                <AuthorizedForRole allowedRoles={[RoleName.ADMIN]}>
                  <div className="nav-item">
                    <a
                      className="nav-link dropdown-toggle "
                      href="#navbarVerticalMenuPagesUsersMenu"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarVerticalMenuPagesUsersMenu"
                      aria-expanded="false"
                      aria-controls="navbarVerticalMenuPagesUsersMenu"
                    >
                      <i className="bi-gear nav-icon"></i>
                      <span className="nav-link-title">Administración</span>
                    </a>

                    <div
                      id="navbarVerticalMenuPagesUsersMenu"
                      className="nav-collapse collapse "
                      data-bs-parent="#navbarVerticalMenuPagesMenu"
                    >
                      <Link className="nav-link " to="/dashboard/users">
                        Users
                      </Link>
                      {/*   <a className="nav-link " href="../users-leaderboard.html">
                      Leaderboard
                    </a>
                    <a className="nav-link " href="../users-add-user.html">
                      Add User{" "}
                      <span className="badge bg-info rounded-pill ms-1">
                        Hot
                      </span>
                    </a> */}
                    </div>
                  </div>
                </AuthorizedForRole>

                <AuthorizedForRole allowedRoles={[RoleName.ADMIN]}>
                  <div className="nav-item">
                    <a
                      className="nav-link dropdown-toggle "
                      href="#navbarVerticalMenuPagesUserProfileMenu"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarVerticalMenuPagesUserProfileMenu"
                      aria-expanded="false"
                      aria-controls="navbarVerticalMenuPagesUserProfileMenu"
                    >
                      <i className="bi-folder2-open nav-icon"></i>
                      <span className="nav-link-title">
                      Gestión de Archivos
                      </span>
                    </a>

                    <div
                      id="navbarVerticalMenuPagesUserProfileMenu"
                      className="nav-collapse collapse "
                      data-bs-parent="#navbarVerticalMenuPagesMenu"
                    >
                      <Link className="nav-link " to="/dashboard/folders">
                        Carpetas
                      </Link>
                      {/*   <a className="nav-link " href="../user-profile-teams.html">
                      Configuración
                    </a>
                    <a
                      className="nav-link "
                      href="../user-profile-projects.html"
                    >
                      Projects
                    </a>
                    <a
                      className="nav-link "
                      href="../user-profile-connections.html"
                    >
                      Connections
                    </a>
                    <a
                      className="nav-link "
                      href="../user-profile-my-profile.html"
                    >
                      My Profile
                    </a> */}
                    </div>
                  </div>
                </AuthorizedForRole>
              </div>

              <AuthorizedForRole allowedRoles={[RoleName.ADMIN, RoleName.USER]}>
                <div className="nav-item">
                  <Link className="nav-link " to="/dashboard/user-folders" data-placement="left">
                    <i className="bi-stickies nav-icon"></i>
                    <span className="nav-link-title">Mis Archivos</span>
                  </Link>
                </div>
              </AuthorizedForRole>

            </div>
          </div>
          {/* End Content */}

          {/* Footer */}
          <div className="navbar-vertical-footer">
            <ul className="navbar-vertical-footer-list">
              <li className="navbar-vertical-footer-list-item">
                {/* Style Switcher */}
                <div className="dropdown dropup">
                  <button
                    type="button"
                    className="btn btn-ghost-secondary btn-icon rounded-circle"
                    id="selectThemeDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-dropdown-animation
                  ></button>

                  <div
                    className="dropdown-menu navbar-dropdown-menu navbar-dropdown-menu-borderless"
                    aria-labelledby="selectThemeDropdown"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      data-icon="bi-moon-stars"
                      data-value="auto"
                    >
                      <i className="bi-moon-stars me-2"></i>
                      <span
                        className="text-truncate"
                        title="Auto (system default)"
                      >
                        Auto (system default)
                      </span>
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-icon="bi-brightness-high"
                      data-value="default"
                    >
                      <i className="bi-brightness-high me-2"></i>
                      <span
                        className="text-truncate"
                        title="Default (light mode)"
                      >
                        Default (light mode)
                      </span>
                    </a>
                    <a
                      className="dropdown-item active"
                      href="#"
                      data-icon="bi-moon"
                      data-value="dark"
                    >
                      <i className="bi-moon me-2"></i>
                      <span className="text-truncate" title="Dark">
                        Dark
                      </span>
                    </a>
                  </div>
                </div>

                {/* End Style Switcher */}
              </li>

        
            </ul>
          </div>
          {/* End Footer */}
        </div>
      </div>
    </aside>
  );
};
