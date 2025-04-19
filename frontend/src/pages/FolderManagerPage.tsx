import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { deleteFolder, UpdateNameFolder } from "@/api/folderApi";
import {
  FolderList,
  FileList,
  UploadFileManager,
  CreateSubFolder,
  SearchFilterFiles, 
  StatusLoadFiles
} from "@/components";
import { useFolderContent, useFolderBreadcrumbs } from "@/hooks";
import { useInitTomSelect } from "@/hooks/useInitTomSelect";
import { showError, showConfirm } from "@/utils/alerts";
import { StatusUploadedFile, StatusUploadFile } from "@/types";
import { useSignalr } from "@/context/SignalrContext";

export const FolderManagerPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const folderName = queryParams.get("folder");
  const { id } = useParams();

  const [isModalSubFolderOpen, setIsModalSubFolderOpen] = useState(false);
  const [isModalFilesOpen, setIsModalFilesOpen] = useState(false);
  const [folderRefresh, setFolderRefresh] = useState(false);
  const [fileRefresh, setFileRefresh] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [statusUploaded, setStatusUploaded] = useState<StatusUploadFile | null>(null);
  const [filter, setFilter] = useState("");

  useInitTomSelect();

  const {
    handleNavigateToSubfolder,
    handleGoBackToFolder,
    setBreadcrumbs,
    folderId,
    breadcrumbs } = useFolderBreadcrumbs(Number(id));

  const { setFolders, files, folders, loadingFiles } = useFolderContent({
    folderId,
    folderRefresh,
    fileRefresh,
  });
  const { signalr } = useSignalr();

  const openUploadFilesModal = () => {
    setIsModalFilesOpen(true);
  };

  const foldersFiltered = folders.filter((folder) => folder.name.toLowerCase().includes(filter.toLowerCase()));
  const FilesFiltered = files.filter((file) => file.fileName.toLowerCase().includes(filter.toLowerCase()));


  const handleDeleteFolder = async (folderId: number) => {

    try {
      const result = await showConfirm("¿Estas seguro de eliminar esta carpeta?");
      if (!result) return;

      setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));

      await deleteFolder(folderId);
    } catch (error) {
      console.error(error);
      showError("Error al eliminar la carpeta, vuelva a intentalor mas tarde");
    } finally {
      /*   setFolderRefresh((prev) => !prev); */
    }
  };

  const handleUpdateFolderName = async (
    folderId: number,
    folderName: string
  ) => {
    try {
      UpdateNameFolder(folderId, folderName);
    } catch (error) {
      console.error(error);
      showError("Error al cambiar el nombre de la carpeta, vuelva a intentalor mas tarde");
    } finally {
      /*   setFolderRefresh((prev) => !prev); */
    }
  };

  const handelUploadedFiles = (filesNames : string[]) => {
    setStatusUploaded(StatusUploadFile.LOADING);
    setUploadedFiles(filesNames)
  };

  useEffect(() => {
    const newSubFolder = {
      id: Number(id),
      name: folderName?.toString() || "",
      class: "text-primary",
    };
    setBreadcrumbs((prevState) => [...prevState, newSubFolder]);
  }, []);

  useEffect(() => {
    if (signalr) {
      signalr?.on("FileUploaded", (response: StatusUploadedFile) => {
     
        setUploadedFiles(response.files);
        setStatusUploaded(response.status);
        setFileRefresh((prev) => !prev);
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
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter mb-4">
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li
                      className="breadcrumb-item"
                      key={index}
                      onClick={() => handleGoBackToFolder(breadcrumb.id)}
                    >
                      <a
                        className={`breadcrumb-link ${breadcrumb.class}`}
                        href="#"
                      >
                        {breadcrumb.name}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <h1 className="page-header-title mb-2">Gestión de archivos</h1>
              <div className="d-flex align-items-center gap-4">
                <div>
                  <i className="bi-folder me-2"></i>
                  <strong>{folders.length}</strong> Carpetas
                </div>
                <div>
                  <i className="bi-files me-2"></i>
                  <strong>{files.length}</strong> Archivos
                </div>
              </div>
            </div>

            <div className="col-sm-auto" aria-label="Button group">
              {/*Button Group */}
              <div className="btn-group" role="group">
                <button
                  onClick={openUploadFilesModal}
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadFilesModal"
                >
                  <i className="bi-cloud-arrow-up-fill me-1"></i> Cargar
                </button>

                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    id="uploadGroupDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>

                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="uploadGroupDropdown"
                  >
                    <a
                      onClick={() => setIsModalSubFolderOpen(true)}
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#newFolderModal"
                    >
                      <i className="bi-folder-plus dropdown-item-icon"></i>{" "}
                      Nuevo Folder
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      onClick={openUploadFilesModal}
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#uploadFilesModal"
                    >
                      <i className="bi-file-earmark-arrow-up dropdown-item-icon"></i>{" "}
                      Cargar archivos
                    </a>
                    {/*   <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#uploadFilesModal">
                  <i className="bi-upload dropdown-item-icon"></i> Upload folder
                </a> */}
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
          <SearchFilterFiles onSearch={setFilter} />
        </div>
        {foldersFiltered.length > 0 && (
          <>
            <h2 className="h4 mb-3">Carpetas</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-5">
              <FolderList
                folders={foldersFiltered}
                onDelete={handleDeleteFolder}
                onUpdateName={handleUpdateFolderName}
                onSelectSubFolder={handleNavigateToSubfolder}
              />
            </div>
          </>
        )}

        {FilesFiltered.length > 0 && (
          <>
            <div className="row align-items-center mb-2">
              <div className="col">
                <h2 className="h4 mb-0">Archivos</h2>
              </div>
            </div>
            <FileList
              files={FilesFiltered}
              loading={loadingFiles}
              onRefresh={setFileRefresh}
            />
          </>
        )}

        {FilesFiltered.length === 0 && foldersFiltered.length === 0 && (
          <div className="row align-items-center justify-content-center mt-4">
            <div className="col text-center">
              <img
                className="img-fluid"
                src="/assets/svg/illustrations-light/oc-browse-file.svg"
                width="150"
                height="150"
              />
            </div>
            <p className="text-center text-muted mt-3">
              Ningun resultado para mostrar
            </p>
          </div>
        )}
      </div>

      <CreateSubFolder
        onUploadedFiles={handelUploadedFiles}
        onCreated={setFolderRefresh}
        folderId={folderId}
        isModalOpen={isModalSubFolderOpen}
        onModalOpen={setIsModalSubFolderOpen}
      />
      <UploadFileManager
        folderId={folderId}
        isModalOpen={isModalFilesOpen}
        setIsModalOpen={setIsModalFilesOpen}
        onUploadedFiles={handelUploadedFiles}
      />
         <StatusLoadFiles filesNames={uploadedFiles} status={statusUploaded} />
    </>
  );
};
