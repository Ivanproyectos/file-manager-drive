
import { ISubFolder } from "@/types"


interface SubFolderListProps {
  folders: ISubFolder[]
  loading: boolean
  onSelectSubFolder: (folderId: number, folderName: string) => void,
}

export const UserSubFolderList = ({ folders, onSelectSubFolder}: SubFolderListProps) => {
  return (
    <>
    {folders.map(({ id, name }) => (
      <div
        className="col mb-3 mb-lg-5"
        key={id}
        onClick={() => onSelectSubFolder(id, name)}
      >
        <div className="card card-sm card-hover-shadow h-100">
          <div className="card-body d-flex">
            <div className="d-flex align-items-center">
              <i className="bi-folder fs-2 text-body me-2"></i>

              <h5 className="text-truncate ms-2 mb-0">{name}</h5>
             
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
  )
}
