import { IFile } from "@/types"
import { getFileIcon } from "@/utils/fileIconMapping"
import { convertDateToLocaleString } from "@/utils/dateFormat"
import { convertBytes } from "@/utils/formatBytes"

interface fileItemProps{
    file:IFile
}
export const FileItem = ({file}:fileItemProps) => {
    const {fileName,extension, sizeBytes, createdDate } = file;
  return (
    <li className="list-group-item">
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
          <li className="list-inline-item">{convertDateToLocaleString(createdDate)}</li>
          <li className="list-inline-item">{convertBytes(sizeBytes)}</li>
        </ul>
      </div>

      <div className="col-auto">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-white btn-sm"
            id="filesListDropdown1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="d-none d-sm-inline-block me-1">More</span>
            <i className="bi-chevron-down"></i>
          </button>

          <div
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="filesListDropdown1"
            style={{ minWidth: "13rem" }}
          >
            <span className="dropdown-header">Settings</span>

            <a className="dropdown-item" href="#">
              <i className="bi-share dropdown-item-icon"></i> Share file
            </a>
            <a className="dropdown-item" href="#">
              <i className="bi-folder-plus dropdown-item-icon"></i> Move to
            </a>
            <a className="dropdown-item" href="#">
              <i className="bi-star dropdown-item-icon"></i> Add to stared
            </a>
            <a className="dropdown-item" href="#">
              <i className="bi-pencil dropdown-item-icon"></i> Rename
            </a>
            <a className="dropdown-item" href="#">
              <i className="bi-download dropdown-item-icon"></i> Download
            </a>

            <div className="dropdown-divider"></div>

            <a className="dropdown-item" href="#">
              <i className="bi-chat-left-dots dropdown-item-icon"></i>{" "}
              Report
            </a>
            <a className="dropdown-item" href="#">
              <i className="bi-trash dropdown-item-icon"></i> Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  </li>
  )
}
