import { FolderTable, CreateFolderForm, EditFolderForm, StatusLoadFiles } from "@/components";
import { useState, useRef, useEffect } from "react";
import {
  getFoldersAsync,
  deleteFolder,
  updateStatusFolder,
  getFolderByIdAsync
} from "@/api/folderApi";
import { IFolder, IFolderById, StatusUploadedFile, StatusUploadFile, IFolderPermission } from "@/types";
import { showError, showConfirm } from "@/utils/alerts";
import { useConnectSignalr } from "@/hooks";
import { getFolderPermission } from "@/api/folderPermission";

declare const bootstrap: any;

export const FoldersPage = () => {
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [folder, setFolder] = useState<IFolderById | null>(null);
  const [folderIdToEdit, setfolderIdToEdit] = useState<number | null>(null);
  /*   const [refresh, setRefresh] = useState(false); */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fileNames, setfileNames] = useState<string[] | null>(null);
  const [status, setStatus] = useState<StatusUploadFile | null>(null);
  const [folderPermissions, setFolderPermissions] = useState<IFolderPermission[]>([]);

  const { signalr } = useConnectSignalr();


  const modalRef = useRef<HTMLDivElement>(null);

  const handleCreateComplete = () => {
    setRefresh((prev) => !prev);
  };

  const handleUpdateStatus = async (id: number) => {
    try {
      await updateStatusFolder(id);
      setTimeout(() => {
        setRefresh((prev) => !prev);
      }, 500);
    } catch (error) {
      console.error("Error updating status:", error);
      showError("Error al actualizar el estado del folder.");
    }
  };

  const handleRemoveFolder = async (id: number) => {
    try {
      const isAccepted = await showConfirm(
        "¿Está seguro de eliminar el folder?"
      );
      if (!isAccepted) return;

      await deleteFolder(id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
      showError("Error al eliminar el folder.");
    }
  };

  const hanldeUpdateFolder = () => {
  
  };


  const hanldeEditFolder = (folderId: number) => {
    setIsModalEditOpen(true);
    setfolderIdToEdit(folderId);
  };

  const handleModalOpen = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 500);
  };
  
  const handleCloseEditModal = () => {
    setTimeout(() => {
      setIsModalEditOpen(false);
    }, 500);
  };

  const handleUploadFiles = (filesNames: string[]) => {
    setfileNames(filesNames);
    setStatus(StatusUploadFile.LOADING);
  }
  

  useEffect(() => {

    const loadUsers = async () => {
      try {
        const folders = await getFoldersAsync();
        setFolders(folders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadUsers();
  }, [refresh]);

  useEffect(() => {

    if (!folderIdToEdit) return

    const loadFolder = async () => {
      try {
        const folder = await getFolderByIdAsync(folderIdToEdit);
        const folderPermission = await getFolderPermission(folderIdToEdit);
   
        setFolder(folder);
        setFolderPermissions(folderPermission);
      }
      catch (error) { 
        console.error("Error fetching data:", error);
      }
    }
      loadFolder(); 

  },[folderIdToEdit]);

  useEffect(() => {
  
    if (signalr) {
      signalr.on("FileUploaded", (response: StatusUploadedFile) => {
     
        setfileNames(response.files);
        setStatus(response.status);
        setRefresh((prev) => !prev);
      });
    }
    return () => {
      if (signalr) {
        signalr.off("FileUploaded");
      }
    };
  }, [signalr]);


  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-end">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb mb-4">
                <ol className="breadcrumb breadcrumb-no-gutter">
                  <li className="breadcrumb-item">
                    <a className="breadcrumb-link" href="javascript:;">
                      Pages
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a className="breadcrumb-link" href="javascript:;">
                      Mis folders
                    </a>
                  </li>
                </ol>
              </nav>

              <h1 className="page-header-title">Folders</h1>
            </div>

            <div className="col-sm-auto">
              {/*Button Group */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#newFolderModal"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="bi-plus me-1"></i> Nuevo folder
              </button>
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
                        <strong>65 GB</strong>{" "}
                        <span className="text-muted">
                          de 100 GB utilizados.
                        </span>
                      </div>
                    </div>
                    {/* End Row */}

                    {/* Progress */}
                    <div className="progress rounded-pill">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "60%" }}
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
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

        <FolderTable
          onRemove={handleRemoveFolder}
          onEdit={hanldeEditFolder}
          onUpdateStatus={handleUpdateStatus}
          folders={folders}
          isReload={refresh}
        />

        {/*End Tab Content */}
      </div>

      <div
        className="modal fade"
        ref={modalRef}
        id="newFolderModal"
        data-bs-backdrop="static"
        tabIndex={-1}
        aria-labelledby="newFolderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newProjectModalLabel">
                Nuevo folder
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => handleModalOpen()}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isModalOpen && (
                <CreateFolderForm
                  onUploadFiles={handleUploadFiles}
                  onCloseModal={handleModalOpen}
                  onCreateComplete={handleCreateComplete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <EditFolderForm
        folderPermissions={folderPermissions}
        folder={folder}
        isModalOpen={isModalEditOpen}
        onCloseModal={handleCloseEditModal}
        onSubmit={hanldeUpdateFolder}
      />
      <StatusLoadFiles filesNames={fileNames} status={status} />
    </>
  );
};
