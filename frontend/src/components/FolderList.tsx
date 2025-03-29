import { useEffect, useState } from "react";
import { ISubFolder } from "@/types";
import { getSubFoldersAsync } from "@/api/folderApi";
import { FolderOptions } from "@/components";
interface FolderListProps {
  folderId: number;
}
export const FolderList = ({ folderId }: FolderListProps) => {
  const [folders, setFolders] = useState<ISubFolder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folders = await getSubFoldersAsync(folderId);
        setFolders(folders);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchFolders();
  }, []);

  return (
    <>
      {folders.map(({ id, name }) => (
        <div className="col mb-3 mb-lg-5" key={id}>
          {/*Card */}
          <div className="card card-sm card-hover-shadow h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex align-items-center">
                <i className="bi-folder-plus fs-2 text-body me-2"></i>

                <h5 className="text-truncate ms-2 mb-0">{name}</h5>

                {/*Dropdown */}
                <FolderOptions />
                {/*End Dropdown */}
              </div>
              {/*           <span className="text-muted">24 elementos</span> */}
            </div>
            <a className="stretched-link" href="#"></a>
          </div>
          {/*End Card */}
        </div>
      ))}
    </>
  );
};
