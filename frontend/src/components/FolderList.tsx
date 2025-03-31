import { useEffect, useState } from "react";
import { ISubFolder } from "@/types";
import { getSubFoldersAsync } from "@/api/folderApi";
import { FolderActions } from "@/components";
interface FolderListProps {
  folders: ISubFolder[];
  onSelectSubFolder: (folderId: number, folderName: string) => void;
}
export const FolderList = ({ folders, onSelectSubFolder }: FolderListProps) => {

  return (
    <>
      {folders.map(({ id, name }) => (
        <article className="col mb-3 mb-lg-5" key={id} onClick={() => onSelectSubFolder(id, name)}>
          {/*Card */}
          <div className="card card-sm card-hover-shadow h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex align-items-center">
                <i className="bi-folder fs-2 text-body me-2"></i>

                <h5 className="text-truncate ms-2 mb-0">{name}</h5>

                {/*Dropdown */}
                <FolderActions />
                {/*End Dropdown */}
              </div>
              {/*           <span className="text-muted">24 elementos</span> */}
            </div>
            <a className="stretched-link" href="#"></a>
          </div>
          {/*End Card */}
        </article>
      ))}
    </>
  );
};
