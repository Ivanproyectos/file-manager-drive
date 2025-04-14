import { IFile } from "@/types";
import { getFileIcon } from "@/utils/fileIconMapping";
import { convertDateToLocaleString } from "@/utils/dateFormat";
import { convertBytes } from "@/utils/formatBytes";
import { showConfirm } from  "@/utils/alerts";
import { deleteFile } from "@/api/files";

interface fileItemProps {
  file: IFile
  onRefresh: React.Dispatch<React.SetStateAction<boolean>>
}
export const FileItem = ({ file, onRefresh }: fileItemProps) => {
  const { fileName, extension, sizeBytes, createdDate } = file;
  
  const hanldeDeleteFile = async (fileName: string) => {
   const result = await showConfirm(`¿Estas seguro de eliminar el archivo ${fileName}?`);
  if(!result) return;
  
    await deleteFile(file.id);
    onRefresh((preve) => !preve);
  }

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
            <li className="list-inline-item">
              {convertDateToLocaleString(createdDate)}
            </li>
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
              <span className="d-none d-sm-inline-block me-1">Mas</span>
              <i className="bi-chevron-down"></i>
            </button>

            <div
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="filesListDropdown1"
              style={{ minWidth: "13rem" }}
            >
              <span className="dropdown-header">Opciones</span>

              <a
                className="dropdown-item"
                href={`${import.meta.env.VITE_API_BASE_URL}/files/${
                  file.id
                }/download`}
              >
                <i className="bi-download dropdown-item-icon"></i> Descargar
              </a>
              <a className="dropdown-item" href="#" onClick={() => hanldeDeleteFile(fileName)} >
                <i className="bi-trash dropdown-item-icon"></i> Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
