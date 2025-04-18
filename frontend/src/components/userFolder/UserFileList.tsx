import { FileItemSkeleton } from '@/components/skeletons/FileItemSkeleton'
import { IUserFile, IFolderPermission } from '@/types'
import { convertDateToLocaleString } from '@/utils/dateFormat'
import { getFileIcon } from '@/utils/fileIconMapping'
import { convertBytes } from '@/utils/formatBytes'

interface userFileListProps {
  files: IUserFile[], 
  filePermission:IFolderPermission | null
  loading: boolean
}

interface FileActionsProps {
  fileId: number
  canDownload?: boolean
  expirationDate?: string | null
  isDateExpired?: boolean
}


const FileActions = ({
  fileId,
  canDownload = false,
  expirationDate = null,
  isDateExpired = false,
}: FileActionsProps) => {



  const hasFilePermission = (canDownload: boolean, isDateExpired: boolean, expirationDate?: string | null): boolean => {
    if (!canDownload) return false;

    if (isDateExpired && expirationDate) {
      return new Date(expirationDate) > new Date();
    }

    return true;
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn btn-white btn-sm"
        id="filesListDropdown1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="d-none d-sm-inline-block me-1">Mas</span>
        <i className="bi-chevron-down"></i>
      </button>

      <div
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="filesListDropdown1"
        style={{ minWidth: '13rem' }}
      >
        <span className="dropdown-header">Opciones</span>
          {hasFilePermission(canDownload, isDateExpired, expirationDate) && (
            <a className="dropdown-item" href={`${import.meta.env.VITE_API_BASE_URL}/files/${fileId}/download`} >
              <i className="bi-download dropdown-item-icon"></i> Descargar
            </a>
          )}
      </div>
    </div>
  )
}
export const UserFileList = ({ files,filePermission, loading }: userFileListProps) => {
  return (
    <ul className="list-group">
      {loading ? (
        <FileItemSkeleton />
      ) : (
        files.map(
          ({
            id,
            fileName,
            extension,
            createdDate,
            sizeBytes

          }) => (
            <li className="list-group-item" key={id}>
              <div className="row align-items-center">
                <div className="col-auto">
                  <img
                    className="avatar avatar-xs avatar-4x3"
                    src={getFileIcon(extension)}
                    alt={`File icon for ${fileName}`}
                  />
                </div>

                <div className="col">
                  <h5 className="mb-0">
                    <a className="text-dark" href="#">
                      {fileName}
                    </a>
                  </h5>
                  <ul className="list-inline list-separator small text-body">
                    <li className="list-inline-item">
                      {convertDateToLocaleString(createdDate)}
                    </li>
                    <li className="list-inline-item">
                      {convertBytes(sizeBytes)}
                    </li>
                  </ul>
                </div>

                <div className="col-auto">
                  <FileActions
                    fileId={id}
                    canDownload={filePermission?.canDownload}
                    isDateExpired={filePermission?.isDateExpired}
                    expirationDate={filePermission?.expirationDate}
                  />
                </div>
              </div>
            </li>
          )
        )
      )}
    </ul>
  )
}
