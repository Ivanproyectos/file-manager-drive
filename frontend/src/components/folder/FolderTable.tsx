import { useClientDataTable, useInitTomSelect } from "@/hooks";
import { IFolder, IFolderProcessHistories, IFolderProcessStatus } from "@/types";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { convertDateToLocaleString } from "@/utils/dateFormat";
import { convertBytes } from "@/utils/formatBytes";
import { generateAvatar } from "@/utils/generateAvatarGroup";

interface Props {
  folders: IFolder[];
  onEdit: (folderId: number) => void;
  onUpdateStatus: (folderId: number) => void;
  onRemove: (userId: number) => void;
  onChangeStatus: (folderId: number) => void;
  isReload: boolean;
}

export const FolderTable = ({ folders,onChangeStatus, onEdit,onUpdateStatus,onRemove }: Props) => {

  const navigate = useNavigate();

  const tableRef = useRef<HTMLTableElement>(null);

  const getBabgeFolderStatus = (histories: IFolderProcessHistories[]) => {
    if(histories?.length == 0 || histories === null ) 
      return `<span class="badge bg-soft-dark text-dark">sin estado</span>`;

        const historie = histories?.find(({isActive}) => isActive);
        if(historie?.state.id == IFolderProcessStatus.PENDING) 
          return `<span class="badge bg-soft-warning text-warning">${historie?.state.name}</span>`;

        if(historie?.state.id == IFolderProcessStatus.PROCESS) 
          return `<span class="badge bg-soft-info text-info">${historie?.state.name}</span>`;

        if(historie?.state.id == IFolderProcessStatus.FINISHED) 
          return `<span class="badge bg-soft-success text-success">${historie?.state.name}</span>`;
    
  }

  const renderActions = (folder: IFolder) : string => {

    return ` <div class="d-flex align-items-center gap-2">
          <div class="form-check form-switch">
              <input type="checkbox" class="form-check-input" id="formSwitch${
                folder.id
              }" data-action="status" data-id="${folder.id}" ${
                  folder.status ? "checked" : ""
                }>
              <label class="form-check-label" for="formSwitch${
                folder.id
              }"></label>
          </div>
     
          
          <div class="btn-group" role="group">
          <a class="btn btn-white btn-sm" href="javascript:void(0);" data-action="edit" 
          data-id="${folder.id}" >
            <i class="bi-pencil-fill me-1"></i> Editar
          </a>
          <div class="btn-group">
            <button type="button" class="btn btn-white btn-icon btn-sm dropdown-toggle dropdown-toggle-empty" 
              id="optionsUser" data-bs-toggle="dropdown" aria-expanded="false"></button>
            <div class="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="optionsUser" style="">
              <a class="dropdown-item" href="#"  data-action="delete" data-id="${folder.id}" >
                <i class="bi-trash dropdown-item-icon"></i> Eliminar
              </a>
              ${folder.hasProcessState ? `
              <a class="dropdown-item" href="#" data-bs-toggle="modal"  
               data-bs-target="#changeFolderStatusModal" data-action="change-status" data-id="${folder.id}">
                <i class="bi-collection dropdown-item-icon"></i> Cambiar estado
              </a> ` : ""}

            </div>
          </div>
        </div> 
        </div>
      `
  };

  const columns = [
    {
      data: null,
      render: ({ id, name }: IFolder) => `
           <a class="d-flex align-items-center" href="javascript:;" >
                  <i className="bi-folder me-2"></i>
                  <span data-action="navigate" data-folder-id="${id}" data-folder-name="${name}">${name}</span>
         </a>
      `,
    },
    {
      data: "users",
      render: (users: Array<any>) => {
        if(users?.length == 0 || users === null ) 
          return `<span class="badge bg-soft-dark text-dark">sin usuarios</span>`;

        return generateAvatar(users?.map((user) => user.name))
      }
       ,
    },
    { data: "size", render: (size: number) => convertBytes(size) } ,
    {
      data: "createdDate",
      render: (date: string) => convertDateToLocaleString(date),
    },
    {
      data:"folderProcessHistories",
      render: getBabgeFolderStatus
    },
    {
      data: null,
      label: "Acciones",
      orderable: false,
      render: renderActions,
    },
  ];

  useClientDataTable({ tableRef, columns, data: folders });

  useEffect(() => {
    const handleActions = (event: Event) => {
      const target = event.target as HTMLElement;
      const action = target.dataset.action;
      const folderId = target.dataset.id;
      
      if (action === "edit") {
        onEdit(Number(folderId));
      } else if (action === "delete") {
        onRemove(Number(folderId));
      } else if (action === "status") {
        onUpdateStatus(Number(folderId));
      } else if(action === "change-status") {
        onChangeStatus(Number(folderId));
      } else if (action === "navigate") {
        const folderId = target.dataset.folderId;
        const folderName = target.dataset.folderName;
        const params = new URLSearchParams();
        params.append("folder",folderName?.toString() || '');
        navigate({
          pathname: `/dashboard/folders/${folderId}`,
          search: params.toString(),
        });
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("click", handleActions);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener("click", handleActions);
      }
    };
  }, []);


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
                placeholder="Buscar folder"
                aria-label="Buscar folder"
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
        
        </div>
      </div>
      {/* End Header */}

      {/* Table */}
      <div className="table-responsive datatable-custom">
        <table
          ref={tableRef}
          id="datatable"
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
              <th>Miembros</th>
              <th>Tamaño</th>
              <th>Fecha Creado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

          </tbody>
        </table>
      </div>
      {/* End Table */}

      {/* Footer */}
      <div className="card-footer">
        <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
          <div className="col-sm mb-2 mb-sm-0">
            <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
              <span className="me-2">Showing:</span>

              {/* Select */}
              <div className="tom-select-custom">
                <select
                  id="datatableEntries"
                  className="js-select form-select form-select-borderless w-auto"
                  autoComplete="off"
                  data-hs-tom-select-options='{
                            "searchInDropdown": false,
                            "hideSearch": true,
                            "dropdownWidth": "5rem"
                          }'
                >
                  <option value="10">10</option>
                  <option value="15"    defaultValue={0}>
                    15
                  </option>
                  <option value="20">20</option>
                </select>
              </div>
              {/* End Select */}

              <span className="text-secondary me-2">of</span>

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
