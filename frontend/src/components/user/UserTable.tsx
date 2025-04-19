import { useEffect, useState, useRef, Dispatch } from 'react'
import * as api from '@/api/users'
import { IUser, PersonType, Person } from '@/types'
import { useInitTomSelect, useClientDataTable } from '@/hooks'
import { formatPersonName } from '@/utils/formatPeople'
import { convertDateToLocaleString } from '@/utils/dateFormat'
import { showSuccess, showConfirm } from '@/utils/alerts'

interface UserListProps {
  users: IUser[]
  onUpdateUserId: (userId: number) => void
  onReload: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserTable = ({
  onUpdateUserId,
  users,
  onReload,
}: UserListProps) => {
  useInitTomSelect()
  const tableRef = useRef<HTMLTableElement>(null)

  const getExpirationBadge = (user: IUser) => {
    if (user.isExpired) {
      const expirationDate = new Date(user.expirationDate || '')
      const currentDate = new Date()

      if (expirationDate < currentDate) {
        return '<span class="badge bg-soft-danger text-danger">Expirado</span>'
      }

      return `<span class="badge bg-soft-warning text-warning">${convertDateToLocaleString(
        user.expirationDate || ''
      )}</span>`
    }

    return '<span class="badge bg-soft-success text-success">No expira</span>'
  }

  const columns = [
    {
      data: 'people',
      render: (people: Person) => `
        <div
        class="d-flex align-items-center"
        >
        <div class="avatar avatar-soft-primary avatar-circle">
          <span class="avatar-initials">${formatPersonName(people).charAt(0)}</span>
        </div>
        <div class="ms-3">
          <span class="d-block h5 text-inherit mb-0">
            ${formatPersonName(people)}
          </span>
          <span class="d-block fs-5 text-body">
          ${people.email}
          </span>
        </div>
      </div>
    `,
    },
    {
      data: 'people.personType',
      render: (personType: PersonType) => (personType ? 'Natural' : 'Juridica'),
    },
    { data: 'people.identification' },
    {
      data: null,
      render: getExpirationBadge,
    },
    {
      data: 'status',
      render: (status: boolean) =>
        status
          ? `<span class="legend-indicator bg-success"></span> Activo`
          : '<span class="legend-indicator bg-warning"></span> Inactivo',
    },
    {
      data: null,
      label: 'Acciones',
      orderable: false,
      render: (user: any) => `
      <div class="d-flex align-items-center gap-2">
        <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" id="user-status-${user.id}" data-action="status" data-id="${user.id}" ${user.status ? 'checked' : ''}>
            <label class="form-check-label" for="user-status-${user.id}"></label>
        </div>

      <div class="btn-group" role="group">
          <a class="btn btn-white btn-sm" href="javascript:void(0);" data-action="edit"
          data-id="${user.id}" >
            <i class="bi-pencil-fill me-1"></i> Editar
          </a>
          <div class="btn-group">
            <button type="button" class="btn btn-white btn-icon btn-sm dropdown-toggle dropdown-toggle-empty" 
              id="optionsUser" data-bs-toggle="dropdown" aria-expanded="false"></button>
            <div class="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="optionsUser" style="">
              <a class="dropdown-item" href="#"  data-action="delete" data-id="${user.id}" >
                <i class="bi-trash dropdown-item-icon"></i> Eliminar
              </a>
              <a class="dropdown-item" href="#" data-action="reset-password" data-id="${user.id}">
                <i class="bi-key dropdown-item-icon"></i> Restablecer contraseña
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
    },
  ]

  useClientDataTable({ tableRef, columns, data: users })

  const handleRemove = async (id: number) => {
    const isAcepted = await showConfirm('¿Desea eliminar el usuario?')
    if (!isAcepted) return

    await api.removeUser(id)
    onReload((prev) => !prev)
  }

  const handleUpdateStatus = async (id: number) => {
    await api.updateStatus(id)
    setTimeout(() => {
      onReload((prev) => !prev)
    }, 500)
  }

  const handleResetPassword = async (id: number) => {
    const isAcepted = await showConfirm('¿ Desea restablecer la contraseña ?')
    if (!isAcepted) return

    await api.resetPassword(id)
    showSuccess('Contraseña restablecida')
  }

  useEffect(() => {
    const handleActions = (event: Event) => {
      const target = event.target as HTMLElement
      const action = target.dataset.action
      const userId = target.dataset.id

      if (action === 'edit') {
        onUpdateUserId(Number(userId))
      } else if (action === 'delete') {
        handleRemove(Number(userId))
      } else if (action === 'status') {
        handleUpdateStatus(Number(userId))
      } else if (action === 'reset-password') {
        handleResetPassword(Number(userId))
      }
    }

    const tableElement = tableRef.current
    if (tableElement) {
      tableElement.addEventListener('click', handleActions)
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('click', handleActions)
      }
    }
  }, [])

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
          <div id="datatableCounterInfo" style={{ display: 'none' }}>
            <div className="d-flex align-items-center">
              <span className="fs-5 me-3">
                <span id="datatableCounter">0</span>
                Selected
              </span>
              <a className="btn btn-outline-danger btn-sm" href="#">
                <i className="bi-trash"></i> Delete
              </a>
            </div>
          </div>
          {/* End Datatable Info */}

          {/* Dropdown */}

          {/*     <div className="dropdown">
            <button
              type="button"
              className="btn btn-white btn-sm w-100"
              id="usersFilterDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi-filter me-1"></i> Filter{' '}
              <span className="badge bg-soft-dark text-dark rounded-circle ms-1">
                2
              </span>
            </button>

            <div
              className="dropdown-menu dropdown-menu-sm-end dropdown-card card-dropdown-filter-centered"
              aria-labelledby="usersFilterDropdown"
              style={{ minWidth: '22rem' }}
            >
          
              <div className="card">
                <div className="card-header card-header-content-between">
                  <h5 className="card-header-title">Filtrar usuarios</h5>

              
                  <button
                    type="button"
                    className="btn btn-ghost-secondary btn-icon btn-sm ms-2"
                  >
                    <i className="bi-x-lg"></i>
                  </button>
              
                </div>

                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-12 mb-4">
                        <small className="text-cap text-body">Estado</small>

                     
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
                      
                      </div>
                    

                      <div className="col-12 mb-4">
                        <small className="text-cap text-body">
                          Tipo Usuario
                        </small>

                      
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
                      
                      </div>
                   
                    </div>
                
                    <div className="d-grid">
                      <a className="btn btn-primary" href="#">
                        Aplicar
                      </a>
                    </div>
                  </form>
                </div>
              </div>
           
            </div>
          </div> */}
        </div>
      </div>

      {/* Table */}
      <div className=" datatable-custom">
        <table
          id="datatable"
          ref={tableRef}
          className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
          data-hs-datatables-options='{
               "columnDefs": [{
                      "targets": [0, 1, 2],
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
              <th>Expiración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody></tbody>
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
                  value={15}
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
  )
}
