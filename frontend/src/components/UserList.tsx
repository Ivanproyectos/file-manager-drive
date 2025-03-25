import { useEffect, useState, useRef } from "react";
import { getUsers } from "@/api/users";
import { IUser, PersonType, IPeopleList } from "@/types";
import { useInitTomSelect, useClientDataTable } from "@/hooks";

declare const HSCore: any;
declare const HSBsDropdown: any;

export const UserList = () => {
  useInitTomSelect();

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  const columns = [
    {
      data: "people",
      render: (people: IPeopleList) => `
        <div
        class="d-flex align-items-center"
        >
        <div class="avatar avatar-soft-primary avatar-circle">
          <span class="avatar-initials">A</span>
        </div>
        <div class="ms-3">
          <span class="d-block h5 text-inherit mb-0">
            ${people.name}
          </span>
          <span class="d-block fs-5 text-body">
          ${people.email}
          </span>
        </div>
      </div>
    `,
    },
    {
      data: "people.personType",
      render: (personType: PersonType) => (personType ? "Natural" : "Juridica"),
    },
    { data: "people.identification" },
    {
      data: "status",
      render: (status: boolean) =>
        status
          ? `<span class="legend-indicator bg-success"></span> Activo`
          : '<span class="legend-indicator bg-warning"></span> Inactivo',
    },
    {
      data: null,
      label: "Acciones",
      orderable: false,
      //with: 200,
      render: (user: any) => `
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-white btn-sm" data-action="edit" data-bs-toggle="modal" 
        data-id="${user.id}" data-bs-target="#editUserModal">
              <i class="bi-pencil-fill me-1"></i> Editar
        </button>
          <button type="button" class="btn btn-white btn-sm" data-action="delete" data-bs-toggle="modal" data-id="${user.id}" >
          <i class="bi-trash me-1"></i> Eliminar
        </button>
      </div>
    `,
    },
  ];

  const { datatable } = useClientDataTable({ tableRef, columns, data: users });

  useEffect(() => {
    debugger;
    $("#datatable").on("click", 'button[data-action="edit"]', function () {
      const id = $(this).data("id");
      alert(id);
      setLoading(true);
    });
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };
    loadUsers();
  }, [loading]);

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
                placeholder="Buscar usuarios"
                aria-label="Buscar usuarios"
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
          {/*    <div className="dropdown">
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
          </div> */}
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
                  <h5 className="card-header-title">Filtrar usuarios</h5>

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
                    <div className="row">
                      <div className="col-12 mb-4">
                        <small className="text-cap text-body">Estado</small>

                        {/* Select */}
                        <div className="tom-select-custom">
                          <select
                            className="js-select js-datatable-filter form-select form-select-sm"
                            data-target-column-index="4"
                            data-hs-tom-select-options='{
                                      "placeholder": "Todos los estados",
                                      "hideSearch": true
                                    }'
                          >
                            <option value="">Todos los estados...</option>
                            <option
                              value="true"
                              data-option-template='<span class="d-flex align-items-center"><span class="legend-indicator bg-success"></span>Activos</span>'
                            >
                              Activos
                            </option>
                            <option
                              value="false"
                              data-option-template='<span class="d-flex align-items-center"><span class="legend-indicator bg-warning"></span>Inactivos</span>'
                            >
                              Inactivos
                            </option>
                            <option
                              value="delete"
                              data-option-template='<span class="d-flex align-items-center"><span class="legend-indicator bg-danger"></span>Eliminados</span>'
                            >
                              Eliminados
                            </option>
                          </select>
                        </div>
                        {/* End Select */}
                      </div>
                      {/* End Col */}

                      <div className="col-12 mb-4">
                        <small className="text-cap text-body">
                          Tipo Usuario
                        </small>

                        {/* Select */}
                        <div className="tom-select-custom">
                          <select
                            className="js-select form-select"
                            autoComplete="off"
                            data-hs-tom-select-options='{
                              "placeholder": "Seleccione tipo",
                              "hideSearch": true
                            }'
                          >
                            <option value="">Seleccione tipo...</option>
                            <option value="N">Natural</option>
                            <option value="J">Juridico</option>
                          </select>
                        </div>
                        {/* End Select */}
                      </div>
                      {/* End Col */}
                    </div>
                    {/* End Row */}

                    <div className="d-grid">
                      <a className="btn btn-primary" href="javascript:;">
                        Aplicar
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
      <div className=" datatable-custom">
        <table
          id="datatable"
          ref={tableRef}
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
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Identificación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {/*         { users.map((user) => (
               <tr key={user.id}>
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
                       {user.people.name}
                     </span>
                     <span className="d-block fs-5 text-body">
                     {user.people.email}
                     </span>
                   </div>
                 </a>
               </td>
               <td>
               {user.people.personType === PersonType.Natural? "Natural" : "Juridico"}
               </td>
               <td>  {user.people.identification}</td>
               <td>
               {
                  user.status ? (
                    <>
                      <span className="legend-indicator bg-success"></span> Activo
                    </>
                  ) : (
                    <>
                      <span className="legend-indicator bg-warning"></span> Inactivo
                    </>
                  )
                }
               </td>
             </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      {/* End Table */}

      {/* Footer */}
      <div className="card-footer">
        <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
          <div className="col-sm mb-2 mb-sm-0">
            <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
              <span className="me-2">Mostrar:</span>

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

              <span className="text-secondary me-2">de</span>

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
