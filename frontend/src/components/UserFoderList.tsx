import { ISubFolder, IFolderProcessHistories, IFolderProcessStatus } from "@/types";
interface FolderListProps {
  folders: ISubFolder[];
  loading: boolean;
  onSelectSubFolder: (folderId: number, folderName: string) => void;
}
export const UserFoderList = ({ folders, onSelectSubFolder }: FolderListProps) => {

  const renderStatusBadge = (histories: IFolderProcessHistories[]) => {
    const activeStatus = histories.find((history) => history.isActive);
    const { state: { id: statusId, name: statusName } = {} } = activeStatus || {};

    switch (statusId) {
      case IFolderProcessStatus.PENDING:
        return <span className="badge bg-soft-warning text-warning">{statusName}</span>;
      case IFolderProcessStatus.PROCESS:
        return <span className="badge bg-soft-info text-info">{statusName}</span>;
      case IFolderProcessStatus.FINISHED:
        return <span className="badge bg-soft-success text-success">{statusName}</span>;
      default:
        return null;
    }
  };

  return (
    <>
      {folders.map(({ id, name, folderProcessHistories }) => (
        <div className="col mb-3 mb-lg-5" key={id} onClick={() => onSelectSubFolder(id, name)}>
          {/*Card */}
          <div className="card card-sm card-hover-shadow h-100">
            <div className="card-body d-flex">
              <div className="d-flex align-items-center">
                <i className="bi-folder fs-2 text-body me-2"></i>

                <h5 className="text-truncate ms-2 mb-0">{name}</h5>

              </div>
              <div className="ms-auto d-flex align-items-center">
                  {renderStatusBadge(folderProcessHistories)}
                </div>

            </div>

            {/*  <a className="stretched-link" href="#"></a> */}
          </div>
          {/*End Card */}
        </div>
      ))}
    </>
  );
};
