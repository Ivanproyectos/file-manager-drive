import * as folderApi from '@/api/folderApi'
import {
  ChangeFolderStatus,
  CreateFolderForm,
  EditFolderForm,
  FolderTable,
  StatusLoadFiles,
  FileUploadStatus
} from '@/components'
import { useSignalr } from '@/context/SignalrContext'
import { useInitTomSelect } from '@/hooks'
import { updateFolder } from '@/services/folderService'
import {
  IFolder,
  IFolderProcessHistories,
  StatusUploadFile,
  StatusUploadedFile,
  UpdateFolder,
} from '@/types'
import { showConfirm, showError, showSuccess } from '@/utils/alerts'
import { useEffect, useRef, useState } from 'react'

declare const bootstrap: any

export const FoldersPage = () => {
  const [folders, setFolders] = useState<IFolder[]>([])
  const [folderStatusHistories, setFolderStatusHistories] = useState<
    IFolderProcessHistories[] | null
  >(null)
  const [folderIdToEdit, setfolderIdToEdit] = useState<number | null>(null)
  const [folderIdToStatus, setfolderIdToStatus] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [statusUploaded, setStatusUploaded] = useState<StatusUploadFile | null>(
    null
  )
  const foldersRef = useRef<IFolder[]>([])
  const modalRefEdit = useRef<HTMLDivElement>(null)
  const modalRefStatus = useRef<HTMLDivElement>(null)

  useInitTomSelect()

  const { signalr } = useSignalr()

  const modalRef = useRef<HTMLDivElement>(null)

  const handleCreateComplete = () => {
    setRefresh((prev) => !prev)
  }

  const handleUpdateStatus = async (id: number) => {
    try {
      await folderApi.updateStatusFolder(id)
      setTimeout(() => {
        setRefresh((prev) => !prev)
      }, 500)
    } catch (error) {
      console.error('Error updating status:', error)
      showError('Error al actualizar el estado del folder.')
    }
  }

  const handleRemoveFolder = async (id: number) => {
    try {
      const isAccepted = await showConfirm(
        '¿Está seguro de eliminar el folder?'
      )
      if (!isAccepted) return

      await folderApi.deleteFolder(id)
      showSuccess('Folder eliminado correctamente')
      setRefresh((prev) => !prev)
    } catch (error) {
      console.error(error)
      showError('Error al eliminar el folder.')
    }
  }

  const handleUpdateFolder = async (folder: UpdateFolder) => {
    try {
      const isAccepted = await showConfirm(
        '¿Está seguro de actualizar la carpeta?'
      )
      if (!isAccepted) return
      /* folder?.folderPermissions?.map */

      await updateFolder(folder)
      showSuccess('Folder actualizada correctamente')
      setRefresh((prev) => !prev)
      setfolderIdToEdit(null)

      return
    } catch (error) {
      console.error(error)
      showError('Error al actualizar la carpeta.')
    }
  }

  const hanldeChangeProcessStatus = async (statusId: number, comment: string) => {
    try {
      await folderApi.changeStatus(folderIdToStatus || 0, statusId, comment)
      showSuccess('Cambio de estado exitoso')
      setfolderIdToStatus(null)
      setRefresh((prev) => !prev)

      return true
    } catch (error) {
      console.error('Error changing status:', error)
      showError('Error al cambiar el estado, vuelva a intentalor mas tarde')
      return false
    }
  }

  const hanldeEditFolder = (folderId: number) => {
    setIsModalEditOpen(true)
    setfolderIdToEdit(folderId)
  }

  const handleModalOpen = () => {
    setTimeout(() => {
      setIsModalOpen(false)
    }, 100)
  }

  const handleCloseEditModal = () => {
    setIsModalEditOpen(false)
    setfolderIdToEdit(null)
  }

  const handleUploadFiles = (filesNames: string[]) => {
    if (!filesNames || filesNames.length === 0) return
    setUploadedFiles(filesNames)
    setStatusUploaded(StatusUploadFile.LOADING)
  }

  const handleChangeFolderStatus = (folderId: number) => {
    const folderHistories =
      foldersRef?.current.find((folder) => folder.id === folderId)
        ?.folderProcessHistories || null

    setFolderStatusHistories(folderHistories)
    setfolderIdToStatus(folderId)
  }

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const folders = await folderApi.getFoldersAsync()
        setFolders(folders)
        foldersRef.current = folders
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    loadUsers()
  }, [refresh])

  useEffect(() => {
    if (!folderIdToEdit) return
    const modal = bootstrap.Modal.getOrCreateInstance(modalRefEdit.current)
    modal.show()
  }, [folderIdToEdit])

  useEffect(() => {
    if (!folderIdToStatus) return
    const modal = bootstrap.Modal.getOrCreateInstance(modalRefStatus.current)
    modal.show()
  }, [folderIdToStatus])

  useEffect(() => {
    if (signalr) {
      signalr?.on('FileUploaded', (response: StatusUploadedFile) => {
        setUploadedFiles(response.files)
        setStatusUploaded(response.status)
        setRefresh((prev) => !prev)
      })
    }
    return () => {
      if (signalr) {
        signalr.off('FileUploaded')
      }
    }
  }, [signalr])
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
                      Mis carpetas
                    </a>
                  </li>
                </ol>
              </nav>

              <h1 className="page-header-title">Carpetas</h1>
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
                <i className="bi-plus me-1"></i> Nueva carpeta
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
                <span className="display-3 text-dark">{folders.length}</span>
              </div>

              <div className="flex-grow-1 ms-3">
                <div className="row mx-md-n3">
                  <div className="col-md px-md-4">
                    <span className="d-block">Total carpetas</span>
                    <span className="badge bg-soft-success text-success rounded-pill p-1">
                      <i className="bi-folder"></i>
                    </span>
                  </div>
                  {/* End Col */}

                  <div className="col-md-9 col-lg-10 column-md-divider px-md-4">
                    <FileUploadStatus />
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
          onChangeStatus={handleChangeFolderStatus}
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
                Nueva carpeta
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
        key={folderIdToEdit}
        modalRefEdit={modalRefEdit}
        folderId={folderIdToEdit}
        isModalOpen={isModalEditOpen}
        onCloseModal={handleCloseEditModal}
        onSubmit={handleUpdateFolder}
      />
      <ChangeFolderStatus
        key={folderIdToStatus}
        modalRef={modalRefStatus}
        onSubmit={hanldeChangeProcessStatus}
        folderStatusHistories={folderStatusHistories}
        onCloseModal={() => setfolderIdToStatus(null)}
      />

      <StatusLoadFiles filesNames={uploadedFiles} status={statusUploaded} />
    </>
  )
}
