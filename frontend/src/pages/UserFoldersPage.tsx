
export const UserFoldersPage = () => {
  return (
    <div className="content container-fluid">

    <div className="page-header">
      <div className="row align-items-end">
        <div className="col-sm mb-2 mb-sm-0">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-no-gutter">
              <li className="breadcrumb-item"><a className="breadcrumb-link" href="javascript:;">Pages</a></li>
              <li className="breadcrumb-item"><a className="breadcrumb-link" href="javascript:;">Mis archivos</a></li>
            </ol>
          </nav>

          <h1 className="page-header-title">Files</h1>
          <div className="d-flex align-items-center gap-2">
            <div><i className="bi-folder me-1"></i>
              <strong>2</strong> Folders
              </div> 
            <div><i className="bi-files me-1"></i>
            <strong>3</strong> Archivos
            </div> 
          </div>
        </div>
      

        <div className="col-sm-auto" aria-label="Button group">
          {/*Button Group */}
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadFilesModal">
              <i className="bi-cloud-arrow-up-fill me-1"></i> Upload
            </button>

            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" id="uploadGroupDropdown" data-bs-toggle="dropdown" aria-expanded="false"></button>

              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="uploadGroupDropdown">
                <a className="dropdown-item" href="#">
                  <i className="bi-folder-plus dropdown-item-icon"></i> New folder
                </a>
                <a className="dropdown-item" href="#">
                  <i className="bi-folder-symlink dropdown-item-icon"></i> New shared folder
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal" data-bs-target="#uploadFilesModal">
                  <i className="bi-file-earmark-arrow-up dropdown-item-icon"></i> Upload files
                </a>
                <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal" data-bs-target="#uploadFilesModal">
                  <i className="bi-upload dropdown-item-icon"></i> Upload folder
                </a>
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
            <input type="text" className="form-control" name="firstName" id="firstNameLabel" placeholder="buscar archivos..." aria-label="buscar archivos" />
          </div>
      </div>
    </div>
    <div className="col-lg-4 d-flex">
      <div className="d-flex align-items-center me-2 flex-grow-1">
        <button type="button" className="js-file-attach-reset-img btn btn-white w-100" >
          <i className="bi-funnel-fill me-2"></i>
          Filters
        </button>
      </div>

      <div className="d-flex align-items-center">
        <ul className="nav nav-segment" id="connectionsTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="grid-tab" data-bs-toggle="tab" href="#grid" role="tab" aria-controls="grid" aria-selected="true" title="Column view">
                <i className="bi-grid"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="list-tab" data-bs-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false" title="List view">
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
      <div className="col mb-3 mb-lg-5">
        {/*Card */}
        <div className="card card-sm card-hover-shadow h-100">
          <div className="card-body d-flex flex-column">
            <div className="d-flex align-items-center">
              <i className="bi-folder-plus fs-2 text-body me-2"></i>

              <h5 className="text-truncate ms-2 mb-0">Premium images</h5>
           

              {/*Dropdown */}
              <div className="dropdown ms-auto">
                <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="folderDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi-three-dots-vertical"></i>
                </button>

                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="folderDropdown1" style={{minWidth: "13rem" }}>
                  <span className="dropdown-header">Settings</span>

                  <a className="dropdown-item" href="#">
                    <i className="bi-share dropdown-item-icon"></i> Share folder
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-star dropdown-item-icon"></i> Add to stared
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-pencil dropdown-item-icon"></i> Rename
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-download dropdown-item-icon"></i> Download
                  </a>

                  <div className="dropdown-divider"></div>

                  <a className="dropdown-item" href="#">
                    <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-trash dropdown-item-icon"></i> Delete
                  </a>
                </div>
              </div>
              {/*End Dropdown */}
            </div>
            <span className="text-muted">24 elementos</span>
          </div>
          <a className="stretched-link" href="#"></a>
        </div>
        {/*End Card */}
      </div>
      {/*End Col */}

      <div className="col mb-3 mb-lg-5">
        {/*Card */}
        <div className="card card-sm card-hover-shadow h-100">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="bi-folder fs-2 text-body me-2"></i>

              <h5 className="text-truncate ms-2 mb-0">Front materials</h5>

              {/*Dropdown */}
              <div className="dropdown ms-auto">
                <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="folderDropdown2" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi-three-dots-vertical"></i>
                </button>

                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="folderDropdown2" style={{minWidth: "13rem"}}>
                  <span className="dropdown-header">Settings</span>

                  <a className="dropdown-item" href="#">
                    <i className="bi-share dropdown-item-icon"></i> Share folder
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-star dropdown-item-icon"></i> Add to stared
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-pencil dropdown-item-icon"></i> Rename
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-download dropdown-item-icon"></i> Download
                  </a>

                  <div className="dropdown-divider"></div>

                  <a className="dropdown-item" href="#">
                    <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-trash dropdown-item-icon"></i> Delete
                  </a>
                </div>
              </div>
              {/*End Dropdown */}
            </div>
          </div>
          <a className="stretched-link" href="#"></a>
        </div>
        {/*End Card */}
      </div>
      {/*End Col */}

      <div className="col mb-3 mb-lg-5">
        {/*Card */}
        <div className="card card-sm card-hover-shadow h-100">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="bi-folder fs-2 text-body me-2"></i>

              <h5 className="text-truncate ms-2 mb-0">Illustrations</h5>

              {/*Dropdown */}
              <div className="dropdown ms-auto">
                <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="folderDropdown3" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi-three-dots-vertical"></i>
                </button>

                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="folderDropdown3" style={{minWidth: "13rem"}}>
                  <span className="dropdown-header">Settings</span>

                  <a className="dropdown-item" href="#">
                    <i className="bi-share dropdown-item-icon"></i> Share folder
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-star dropdown-item-icon"></i> Add to stared
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-pencil dropdown-item-icon"></i> Rename
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-download dropdown-item-icon"></i> Download
                  </a>

                  <div className="dropdown-divider"></div>

                  <a className="dropdown-item" href="#">
                    <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-trash dropdown-item-icon"></i> Delete
                  </a>
                </div>
              </div>
              {/*End Dropdown */}
            </div>
          </div>
          <a className="stretched-link" href="#"></a>
        </div>
        {/*End Card */}
      </div>
      <div className="col mb-3 mb-lg-5">
        {/*Card */}
        <div className="card card-sm card-hover-shadow h-100">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="bi-folder fs-2 text-body me-2"></i>

              <h5 className="text-truncate ms-2 mb-0">Illustrations</h5>

              {/*Dropdown */}
              <div className="dropdown ms-auto">
                <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="folderDropdown3" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi-three-dots-vertical"></i>
                </button>

                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="folderDropdown3" style={{minWidth: "13rem"}}>
                  <span className="dropdown-header">Settings</span>

                  <a className="dropdown-item" href="#">
                    <i className="bi-share dropdown-item-icon"></i> Share folder
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-star dropdown-item-icon"></i> Add to stared
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-pencil dropdown-item-icon"></i> Rename
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-download dropdown-item-icon"></i> Download
                  </a>

                  <div className="dropdown-divider"></div>

                  <a className="dropdown-item" href="#">
                    <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bi-trash dropdown-item-icon"></i> Delete
                  </a>
                </div>
              </div>
              {/*End Dropdown */}
            </div>
          </div>
          <a className="stretched-link" href="#"></a>
        </div>
        {/*End Card */}
      </div>
      {/*End Col */}
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
            <a className="nav-link active" id="grid-tab" data-bs-toggle="tab" href="#grid" role="tab" aria-controls="grid" aria-selected="true" title="Column view">
              <i className="bi-grid"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="list-tab" data-bs-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false" title="List view">
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
      <div className="tab-pane fade show active" id="grid" role="tabpanel" aria-labelledby="grid-tab">
        {/*Folders */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          <div className="col mb-3 mb-lg-5">
            {/*Card */}
            <div className="card card-sm card-hover-shadow card-header-borderless h-100 text-center">
              <div className="card-header card-header-content-between border-0">
                <span className="small">25kb</span>

                {/*Dropdown */}
                <div className="dropdown">
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown1" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/brands/google-docs-icon.svg" alt="Image Description" />
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
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown2" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown2" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/brands/pdf-icon.svg" alt="Image Description" />
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
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown3" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown3" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/brands/google-slides-icon.svg" alt="Image Description" />
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
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown4" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown4" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/brands/google-docs-icon.svg" alt="Image Description" />
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
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown5" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown5" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/brands/google-sheets-icon.svg" alt="Image Description" />
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
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown6" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown6" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/brands/google-docs-icon.svg" alt="Image Description" />
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
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown7" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown7" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/components/placeholder-img-htmlFormat.svg" alt="Image Description" />
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
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown8" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown8" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/components/placeholder-img-htmlFormat.svg" alt="Image Description" />
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
                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle" id="filesGridDropdown9" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi-three-dots-vertical"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesGridDropdown9" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-trash dropdown-item-icon"></i> Delete
                    </a>
                  </div>
                </div>
                {/*End Dropdown */}
              </div>

              <div className="card-body">
                <img className="avatar avatar-4x3" src="../../assets/svg/brands/pdf-icon.svg" alt="Image Description" />
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

      <div className="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
        <ul className="list-group">
          {/*List Item */}
          <li className="list-group-item">
            <div className="row align-items-center">
              <div className="col-auto">
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/brands/google-docs-icon.svg" alt="Image Description" />
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">WordPress contract terms</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown1" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/brands/pdf-icon.svg" alt="Image Description" />
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">Dashboard layout flow</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown2" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown2" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/brands/google-slides-icon.svg" alt="Image Description" />
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">WordPress theme presentation</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown3" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown3" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/brands/google-docs-icon.svg" alt="Image Description" /> 
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">Untitled</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown4" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown4" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/brands/google-sheets-icon.svg" alt="Image Description" />
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">Hot startup 2019 - Report</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown5" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown5" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/brands/google-docs-icon.svg" alt="Image Description" />
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">Marketing strategy</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown6" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown6" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/components/placeholder-img-htmlFormat.svg" alt="Image Description" />
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">Past-experience.jpg</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown7" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown7" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/components/placeholder-img-htmlFormat.svg" alt="Image Description" />
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">Front_2018.jpg</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown8" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown8" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
                <img className="avatar avatar-xs avatar-4x3" src="../../assets/svg/brands/pdf-icon.svg" alt="Image Description" />
              </div>
              {/*End Col */}

              <div className="col">
                <h5 className="mb-0">
                  <a className="text-dark" href="#">Business opportunities</a>
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
                  <button type="button" className="btn btn-white btn-sm" id="filesListDropdown9" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-sm-inline-block me-1">More</span>
                    <i className="bi-chevron-down"></i>
                  </button>

                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown9" style={{minWidth: "13rem"}}>
                    <span className="dropdown-header">Settings</span>

                    <a className="dropdown-item" href="#">
                      <i className="bi-share dropdown-item-icon"></i> Share file
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-folder-plus dropdown-item-icon"></i> Move to
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-star dropdown-item-icon"></i> Add to stared
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-pencil dropdown-item-icon"></i> Rename
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bi-download dropdown-item-icon"></i> Download
                    </a>

                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#">
                      <i className="bi-chat-left-dots dropdown-item-icon"></i> Report
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
  )
}
