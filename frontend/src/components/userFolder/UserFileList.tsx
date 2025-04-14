
import { IUserFile } from "@/types";
import { FileItemSkeleton } from "@/components/skeletons/FileItemSkeleton";
import { getFileIcon } from "@/utils/fileIconMapping";
import { convertDateToLocaleString } from "@/utils/dateFormat";
import { convertBytes } from "@/utils/formatBytes";
import { validateExpirationDate } from "@/services/fileService";
import { downloadFile } from "@/api/files";

interface userFileListProps {
  files: IUserFile[]
  loading: boolean
}

interface FileActionsProps {
  fileId: number
  canDownload: boolean
  expirationDate: string
  isDateExpired: boolean
}

/* const handleDownload = async (fileId: number) => {
  debugger;
  try{
    const data = await downloadFile(fileId);
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'filename.pdf'); 
    document.body.appendChild(link);
    link.click(); 

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};
 */
const FileActions = ({
  fileId,
  canDownload,
  expirationDate,
  isDateExpired,
}: FileActionsProps) => {
  debugger
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
        {/*     {canDownload && !isDateExpired && (
          <a className="dropdown-item" href={`${import.meta.env.VITE_API_BASE_URL}/files/${fileId}/download`} >
            <i className="bi-download dropdown-item-icon"></i> Descargar
          </a>
        )} */}
        <a
          className="dropdown-item"
          href={`${import.meta.env.VITE_API_BASE_URL}/files/${fileId}/download`}
        >
          <i className="bi-download dropdown-item-icon"></i> Descargar
        </a>
      </div>
    </div>
  )
}
export const UserFileList = ({ files, loading }: userFileListProps) => {
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
            sizeBytes,
            canView,
            canDownload,
            expirationDate,
            isDateExpired,
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
                    canDownload={canDownload}
                    isDateExpired={isDateExpired}
                    expirationDate={expirationDate}
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
