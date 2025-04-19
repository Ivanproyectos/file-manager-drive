import { SearchFilterFiles, UserFileList, UserFoderList, ViewFolderStatus } from '@/components'
import { useUserFolder } from '@/hooks'
import { ISubFolder, IFolderProcessHistories, IFolderPermission } from '@/types'
import { useEffect, useState } from 'react'


declare const HSBsDropdown: any
declare const HSCore: any
declare const bootstrap: any

interface Breadcrumbs   {
  id: number
  name: string
  class?: string
}

export const UserFoldersPage = () =>   {
  const [folderId, setFolderId] = useState<number>(0)
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([])
  const [foldersFiltered, setFoldersFiltered] = useState<ISubFolder[]>([])
  const [filter, setFilter] = useState('')
  const [folderHistories, setfolderHistories] = useState<IFolderProcessHistories[] | null >(null)
  const [folderPermission, setFolderPermission] = useState<IFolderPermission | null>(null)

  const { files, folders, subFolders, loadingFiles, loadingFolders } =
    useUserFolder({ folderId })


  const FilesFiltered = files.filter((file) =>
    file.fileName.toLowerCase().includes(filter.toLowerCase())
  )

  const handleNavigateToSubfolder = (
    newFolderId: number,
    newFolderName: string
  ) => {

    const folderPermission = folders.find((folder) => folder.id === newFolderId)?.folderPermissions ?? null
    if(folderPermission){
      setFolderPermission(folderPermission)
    }
   

    const newSubFolder = { id: newFolderId, name: newFolderName }
    setFolderId(newFolderId)
    setBreadcrumbs((prevState) => [...prevState, newSubFolder])
  }

  const handleGoBackToFolder = (folderId: number) => {
    setFolderId(folderId)
    setBreadcrumbs((prevState) =>
      prevState.slice(0, prevState.findIndex((x) => x.id === folderId) + 1)
    )
  }

  const handleViewStatus = (id: number) => {
    const folderHistories = folders.find((folder) => folder.id === id)?.folderProcessHistories ?? null
  
    setfolderHistories(folderHistories)
    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById('viewFolderStatusModal')
    )
    modal.show()
  }

  useEffect(() => {
    if (folderId === 0) {
      const foldersFiltered = folders.filter((folder) =>
        folder.name.toLowerCase().includes(filter.toLowerCase())
      )

      setFoldersFiltered(foldersFiltered)

    }
    if (folderId !== 0) {
      {
        const foldersFiltered = subFolders.filter((folder) =>
          folder.name.toLowerCase().includes(filter.toLowerCase())
        )

        setFoldersFiltered(foldersFiltered)
      }
    }
  }, [filter, folders, subFolders, folderId])

  useEffect(() => {
    HSBsDropdown.init()
    HSCore.components.HSTomSelect.init('.js-select')
  }, [])
  return (
    <>
        <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-end">
          <div className="col-sm mb-2 mb-sm-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-no-gutter mb-4">
                <li className="breadcrumb-item">
                  <a
                    className="breadcrumb-link"
                    href="#"
                    onClick={() => handleGoBackToFolder(0)}
                  >
                    Mis archivos
                  </a>
                </li>

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

            <h1 className="page-header-title mb-2">Mis archivos asignados</h1>
            <div className="d-flex align-items-center gap-2">
              <div>
                <i className="bi-folder me-1"></i>
                <strong>{foldersFiltered.length}</strong> Carpetas
              </div>
              <div>
                <i className="bi-files me-1"></i>
                <strong>{FilesFiltered.length}</strong> Archivos
              </div>
            </div>
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
            <UserFoderList
              loading={loadingFolders}
              folders={foldersFiltered}
              onSelectSubFolder={handleNavigateToSubfolder}
              onViewStatus={handleViewStatus}
            />
          </div>
        </>
      )}

      {/*Header */}
      {FilesFiltered.length > 0 && (
        <>
          <div className="row align-items-center mb-2">
            <div className="col">
              <h2 className="h4 mb-0">Archivos</h2>
            </div>
          </div>

          <UserFileList files={FilesFiltered} filePermission={folderPermission} loading={loadingFiles} />
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
    <ViewFolderStatus 
    folderStatusHistories={folderHistories}  />
    </>

  )
}
