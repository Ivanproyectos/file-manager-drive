import { useEffect, useState, useRef } from "react";
import { ISubFolder } from "@/types";
import { FolderActions } from "@/components";

interface FolderListProps {
  folders: ISubFolder[];
  onSelectSubFolder: (folderId: number, folderName: string) => void;
  onDelete: (folderId: number) => void;
  onUpdateName: (folderId: number, folderName: string) => void;
}
export const FolderList = ({
  folders,
  onSelectSubFolder,
  onDelete,
  onUpdateName,
}: FolderListProps) => {
  const [localFolders, setLocalFolders] = useState<any[]>(folders || []);
  const [newName, setNewName] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  inputRefs.current =
    localFolders?.map((_, i) => inputRefs.current[i] || null) || [];

  const handleUpdateName = (id: number) => {
    const updatedFolders = localFolders.map((folder) => {
      if (folder.id === id) {
        return { ...folder, isUpdated: true };
      }
      return folder;
    });
    setLocalFolders(updatedFolders);
  };
  useEffect(() => {
    const editingIndex = localFolders.findIndex((folder) => folder.isUpdated);
    if (editingIndex !== -1 && inputRefs.current[editingIndex]) {
      inputRefs.current[editingIndex]?.focus();
    }
  }, [localFolders]);

  useEffect(() => {
    setLocalFolders(folders);
  }, [folders]);

  const cancelUpdate = (id: number) => {
    const updatedFolders = localFolders.map((folder) => {
      if (folder.id === id) {
        return { ...folder, isUpdated: false };
      }
      return folder;
    });
    setLocalFolders(updatedFolders);
  };

  const handleSaveName = (id: number, name: string) => {
    let newFolderName = "";
    const updatedFolders = localFolders.map((folder) => {
      if (folder.id === id) {
        newFolderName = name ? name : folder.name;
        return { ...folder, name: newFolderName, isUpdated: false };
      }
      return folder;
    });
    setLocalFolders(updatedFolders);
    onUpdateName(id, newFolderName);
  };

  return (
    <>
      {localFolders.map(({ id, name, isUpdated }, index) => (
        <article
          className="col mb-3 mb-lg-5"
          key={id}
          onClick={() => onSelectSubFolder(id, name)}
          title={name}
        >
          {/*Card */}
          <div className="card card-sm card-hover-shadow h-100">
            {isUpdated && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="position-absolute top-0 end-0  
                     h-100 d-flex align-items-start justify-content-center w-100 
                     flex-column"
                style={{
                  zIndex: 4,
                  borderRadius: "0.5rem",
                  background: "inherit",
                }}
              >
                <div
                  onClick={() => cancelUpdate(id)}
                  className="position-absolute top-0 end-0"
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    right: "1rem",
                  }}
                >
                  <i className="bi bi-x text-danger cursor-pointer"></i>
                </div>
                <div>
                  <div className="input-group">
                    <input
                      className="form-control ms-2"
                      type="text"
                      placeholder={name}
                      aria-label={name}
                      onChange={(e) => setNewName(e.target.value)}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      value={newName}
                    />
                    <button
                      onClick={() => handleSaveName(id, newName)}
                      className="btn btn-soft-success btn-icon"
                    >
                      <i className="bi bi-check"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="card-body d-flex flex-column">
              <div className="d-flex align-items-center w-100">
                <i className="bi-folder fs-2 text-body me-2"></i>

                <h5 className="text-truncate ms-2 mb-0">{name}</h5>

                {/*Dropdown */}
                <FolderActions
                  id={id}
                  onUpdate={handleUpdateName}
                  onDelete={onDelete}
                />
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
