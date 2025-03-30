import { useEffect, useRef } from "react";

export const FolderActions = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
          const target = event.target as HTMLElement;
          if(target.nodeName === 'A'){
            dropdownRef.current?.classList.remove('show');
          }
        }

        dropdownRef.current?.addEventListener('click', handleOutsideClick);
        return () => {
          dropdownRef.current?.removeEventListener('click', handleOutsideClick);
        }
    },[])

  return (
    <div className="dropdown ms-auto" onClick={(e) => e.stopPropagation()}>
    <button
      type="button"
      className="btn btn-ghost-secondary btn-icon btn-sm card-dropdown-btn rounded-circle"
      id="folderDropdown1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="bi-three-dots-vertical"></i>
    </button>

    <div
       ref={dropdownRef}
      className="dropdown-menu dropdown-menu-end"
      aria-labelledby="folderDropdown1"
      style={{ minWidth: "13rem" }}
    >
      <span className="dropdown-header">Settings</span>

      <a className="dropdown-item" href="#">
        <i className="bi-share dropdown-item-icon"></i> Share folder
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
  )
}
