
import { IUserFile } from "@/types";
import { FileItemSkeleton } from "./skeletons/FileItemSkeleton";
import { getFileIcon } from "@/utils/fileIconMapping";
import { convertDateToLocaleString } from "@/utils/dateFormat";
import { convertBytes } from "@/utils/formatBytes";
import { validateExpirationDate } from "@/services/fileService";

interface userFileListProps {
    files: IUserFile[];
  loading: boolean;
}

interface FileActionsProps {
  canDownload: boolean;
  expirationDate: string;
}

const FileActions = ({ canDownload, expirationDate }: FileActionsProps) => {
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
        style={{ minWidth: "13rem" }}
      >
        <span className="dropdown-header">Opciones</span>
        {canDownload && validateExpirationDate(expirationDate) && (
          <a className="dropdown-item" href="#">
            <i className="bi-download dropdown-item-icon"></i> Descargar
          </a>
        )}
      </div>
    </div>
  );
};
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
                    canDownload={canDownload}
                    expirationDate={expirationDate}
                  />
                </div>
              </div>
            </li>
          )
        )
      )}
    </ul>
  );
};
