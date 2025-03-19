import { FolderList } from '@/components';

export const FoldersPage = () => {
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
    {/*Tab Content */}

      <div className="card mb-3 mb-lg-5">
       {/* Body */}
        <div className="card-body">
          <div className="d-flex align-items-md-center">
            <div className="flex-shrink-0">
              <span className="display-3 text-dark">24</span>
            </div>

            <div className="flex-grow-1 ms-3">
              <div className="row mx-md-n3">
                <div className="col-md px-md-4">
                  <span className="d-block">Total files</span>
                  <span className="badge bg-soft-success text-success rounded-pill p-1">
                    <i className="bi-graph-up"></i> +2 files
                  </span>
                </div>
               {/* End Col */}

                <div className="col-md-9 col-lg-10 column-md-divider px-md-4">
                  <div className="row justify-content-start mb-2">
                    <div className="col-auto">
                      <span className="legend-indicator bg-primary"></span>
                      <strong>65 GB</strong> <span className="text-muted">de 100 GB utilizados.</span>
                    </div>

                  </div>
                 {/* End Row */}

                 {/* Progress */}
                  <div className="progress rounded-pill">
                    <div className="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} ></div>
                   {/*  <div className="progress-bar bg-success" role="progressbar" style={{width: "30%"}} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}></div> */}
                  </div>
                 {/* End Progress */}
                </div>
               {/* End Col */}
              </div>
             {/* End Row */}
            </div>
          </div>
        </div>
       {/* End Body */}
      </div>


      <FolderList />

    {/*End Tab Content */}


  </div>

  )
}
