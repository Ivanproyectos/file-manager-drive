import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered bg-white  ">
      <div className="navbar-vertical-container">
        <div className="navbar-vertical-footer-offset">
          {/* Logo */}

          <a className="navbar-brand" href="../index.html" aria-label="Front">
            <img
              className="navbar-brand-logo"
              src="../assets/svg/logos/logo.svg"
              alt="Logo"
              data-hs-theme-appearance="default"
            />
            <img
              className="navbar-brand-logo"
              src="../assets/svg/logos-light/logo.svg"
              alt="Logo"
              data-hs-theme-appearance="dark"
            />
            <img
              className="navbar-brand-logo-mini"
              src="../assets/svg/logos/logo-short.svg"
              alt="Logo"
              data-hs-theme-appearance="default"
            />
            <img
              className="navbar-brand-logo-mini"
              src="../assets/svg/logos-light/logo-short.svg"
              alt="Logo"
              data-hs-theme-appearance="dark"
            />
          </a>

          {/* End Logo */}

          {/* Navbar Vertical Toggle */}
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

          {/* End Navbar Vertical Toggle */}

          {/* Content */}
          <div className="navbar-vertical-content">
            <div
              id="navbarVerticalMenu"
              className="nav nav-pills nav-vertical card-navbar-nav"
            >
              {/* Collapse */}

              {/*        <div className="nav-item">
              <a className="nav-link dropdown-toggle active" href="#navbarVerticalMenuDashboards" role="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalMenuDashboards" aria-expanded="true" aria-controls="navbarVerticalMenuDashboards">
                <i className="bi-house-door nav-icon"></i>
                <span className="nav-link-title">Dashboards</span>
              </a>

              <div id="navbarVerticalMenuDashboards" className="nav-collapse collapse show" data-bs-parent="#navbarVerticalMenu">
                <a className="nav-link active" href="../index.html">Default</a>
                <a className="nav-link " href="../dashboard-alternative.html">Alternative</a>
              </div>
            </div> */}

              {/* End Collapse */}

              <span className="dropdown-header mt-4">Pages</span>
              <small className="bi-three-dots nav-subtitle-replacer"></small>

              {/* Collapse */}
              <div className="navbar-nav nav-compact"></div>
              <div id="navbarVerticalMenuPagesMenu">

            {/*   <div className="nav-item">
                <Link className="nav-link " to="/dashboard/users" data-placement="left">
                     <i className="bi-stickies nav-icon"></i>
                  <span className="nav-link-title">Usuarios</span>
                </Link>
              </div> */}
                {/* Collapse */}
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
                {/* End Collapse */}

                {/* Collapse */}
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
                        File manager 
                    </span>
                  </a>

                  <div
                    id="navbarVerticalMenuPagesUserProfileMenu"
                    className="nav-collapse collapse "
                    data-bs-parent="#navbarVerticalMenuPagesMenu"
                  >
                    <Link className="nav-link " to="/dashboard/folders">
                      Folders
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
              </div>
             
              {/* End Collapse */}
              <div className="nav-item">
                <Link className="nav-link " to="/dashboard/user-folders" data-placement="left">
                     <i className="bi-stickies nav-icon"></i>
                  <span className="nav-link-title">Mis Archivos</span>
                </Link>
              </div>

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

              <li className="navbar-vertical-footer-list-item">
                {/* Other Links */}
                <div className="dropdown dropup">
                  <button
                    type="button"
                    className="btn btn-ghost-secondary btn-icon rounded-circle"
                    id="otherLinksDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-dropdown-animation
                  >
                    <i className="bi-info-circle"></i>
                  </button>

                  <div
                    className="dropdown-menu navbar-dropdown-menu-borderless"
                    aria-labelledby="otherLinksDropdown"
                  >
                    <span className="dropdown-header">Help</span>
                    <a className="dropdown-item" href="#">
                      <i className="bi-journals dropdown-item-icon"></i>
                      <span
                        className="text-truncate"
                        title="Resources &amp; tutorials"
                      >
                        Resources &amp; tutorials
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-command dropdown-item-icon"></i>
                      <span
                        className="text-truncate"
                        title="Keyboard shortcuts"
                      >
                        Keyboard shortcuts
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-alt dropdown-item-icon"></i>
                      <span
                        className="text-truncate"
                        title="Connect other apps"
                      >
                        Connect other apps
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-gift dropdown-item-icon"></i>
                      <span className="text-truncate" title="What's new?">
                        What's new?
                      </span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <span className="dropdown-header">Contacts</span>
                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i>
                      <span className="text-truncate" title="Contact support">
                        Contact support
                      </span>
                    </a>
                  </div>
                </div>
                {/* End Other Links */}
              </li>

              <li className="navbar-vertical-footer-list-item">
                {/* Language */}
                <div className="dropdown dropup">
                  <button
                    type="button"
                    className="btn btn-ghost-secondary btn-icon rounded-circle"
                    id="selectLanguageDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-dropdown-animation
                  >
                    <img
                      className="avatar avatar-xss avatar-circle"
                      src="../assets/vendor/flag-icon-css/flags/1x1/us.svg"
                      alt="United States Flag"
                    />
                  </button>

                  <div
                    className="dropdown-menu navbar-dropdown-menu-borderless"
                    aria-labelledby="selectLanguageDropdown"
                  >
                    <span className="dropdown-header">Select language</span>
                    <a className="dropdown-item" href="#">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="../assets/vendor/flag-icon-css/flags/1x1/us.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="English">
                        English (US)
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="../assets/vendor/flag-icon-css/flags/1x1/gb.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="English">
                        English (UK)
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="../assets/vendor/flag-icon-css/flags/1x1/de.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="Deutsch">
                        Deutsch
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="../assets/vendor/flag-icon-css/flags/1x1/dk.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="Dansk">
                        Dansk
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="../assets/vendor/flag-icon-css/flags/1x1/it.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="Italiano">
                        Italiano
                      </span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="../assets/vendor/flag-icon-css/flags/1x1/cn.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="中文 (繁體)">
                        中文 (繁體)
                      </span>
                    </a>
                  </div>
                </div>

                {/* End Language */}
              </li>
            </ul>
          </div>
          {/* End Footer */}
        </div>
      </div>
    </aside>
  );
};
