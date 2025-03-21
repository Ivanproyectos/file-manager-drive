import { UserList, CreateUserForm } from "@/components";
import { useState } from "react";

export const UsersPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-end">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter">
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

              <h1 className="page-header-title">Usuarios</h1>
            </div>

            <div className="col-sm-auto">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#createUserModal"
              >
                <i className="bi-plus me-1"></i> Nuevo usuario
              </button>
            </div>
            {/*End Col */}
          </div>
          {/*End Row */}
        </div>
        {/*Tab Content */}

        <div className="row">
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Total users</h6>

                <div className="row align-items-center gx-2">
                  <div className="col">
                    <span className="js-counter display-4 text-dark">24</span>
                    <span className="text-body fs-5 ms-1">from 22</span>
                  </div>

                  <div className="col-auto">
                    <span className="badge bg-soft-success text-success p-1">
                      <i className="bi-graph-up"></i> 5.0%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Active members</h6>

                <div className="row align-items-center gx-2">
                  <div className="col">
                    <span className="js-counter display-4 text-dark">12</span>
                    <span className="text-body fs-5 ms-1">from 11</span>
                  </div>

                  <div className="col-auto">
                    <span className="badge bg-soft-success text-success p-1">
                      <i className="bi-graph-up"></i> 1.2%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">New/returning</h6>

                <div className="row align-items-center gx-2">
                  <div className="col">
                    <span className="js-counter display-4 text-dark">56</span>
                    <span className="display-4 text-dark">%</span>
                    <span className="text-body fs-5 ms-1">from 48.7</span>
                  </div>

                  <div className="col-auto">
                    <span className="badge bg-soft-danger text-danger p-1">
                      <i className="bi-graph-down"></i> 2.8%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Active members</h6>

                <div className="row align-items-center gx-2">
                  <div className="col">
                    <span className="js-counter display-4 text-dark">28.6</span>
                    <span className="display-4 text-dark">%</span>
                    <span className="text-body fs-5 ms-1">from 28.6%</span>
                  </div>

                  <div className="col-auto">
                    <span className="badge bg-soft-secondary text-secondary p-1">
                      0.0%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <UserList />

        {/*End Tab Content */}
      </div>

      <div
        className="modal fade"
        id="createUserModal"
        tabIndex={-1}
        aria-labelledby="createUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="uploadFilesModalLabel">
                Nuevo usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateUserForm onIsSubmitting={setIsSubmitting} />
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
                className={`btn btn-primary d-flex justify-content-center align-items-center ${isSubmitting ? "text-transparent" : ""}`}
                form="createUserForm"
                disabled={isSubmitting}

              >
                <div
                  className="spinner-border text-light status-spinner"
                  role="status"
                  hidden={!isSubmitting}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
