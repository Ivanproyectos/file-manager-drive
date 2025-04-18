import { useEffect, useRef } from "react";

interface userFilePermissionProps {
  id : number
  onViewStatus(id : number): void
}
export const UserFolderActions = ({id, onViewStatus }: userFilePermissionProps) => {
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
      <span className="dropdown-header">Opciones </span>

      <a className="dropdown-item" href="#" onClick={() => onViewStatus(id)}>
        <i className="bi-info-circle"></i> Ver seguimiento
      </a>
    </div>
  </div>
  )
}
