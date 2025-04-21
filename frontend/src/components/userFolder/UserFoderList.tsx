import {
  IFolderProcessHistories,
  IFolderProcessStatus,
  ISubFolder,
} from '@/types'
import { UserFolderActions } from "./UserFolderActions"

interface FolderListProps {
  folders: ISubFolder[]
  loading: boolean
  onSelectSubFolder: (folderId: number, folderName: string) => void
  onViewStatus: (id : number) => void
}
export const UserFoderList = ({
  folders,
  onSelectSubFolder,
  onViewStatus
}: FolderListProps) => {
  const renderStatusBadge = (histories: IFolderProcessHistories[]) => {
    const activeStatus = histories?.find((history) => history.isActive)
    const { id: statusId, name: statusName } = activeStatus?.state || {}

    switch (statusId) {
      case IFolderProcessStatus.PENDING:
        return (
          <span className="badge bg-warning">
            {statusName}
          </span>
        )
      case IFolderProcessStatus.PROCESS:
        return (
          <span className="badge bg-info">{statusName}</span>
        )
      case IFolderProcessStatus.FINISHED:
        return (
          <span className="badge bg-success">
            {statusName}
          </span>
        )
      default:
        return null
    }
  }

  return (
    <>
      {folders.map(({ id, name, folderProcessHistories }) => (
        <div
          className="col mb-3 mb-lg-5"
          key={id}
          onClick={() => onSelectSubFolder(id, name)}
          title={name}
        >
          {/*Card */}
          <div className="card card-sm card-hover-shadow h-100">
            <div className="card-body d-flex">
              <div className="d-flex align-items-center w-100">
                <i className="bi-folder fs-2 text-body me-2"></i>

                <h5 className="text-truncate ms-2 mb-0">{name}</h5>
              </div>
              {folderProcessHistories && folderProcessHistories.length > 0 && (
                <div className='ms-auto  d-flex align-items-center'>
                   <div className="d-flex align-items-center">
                    {renderStatusBadge(folderProcessHistories)}
                  </div>
                  <UserFolderActions id={id} onViewStatus={onViewStatus} />
                </div>
             
              )}
            </div>

            {/*  <a className="stretched-link" href="#"></a> */}
          </div>
          {/*End Card */}
        </div>
      ))}
    </>
  )
}
