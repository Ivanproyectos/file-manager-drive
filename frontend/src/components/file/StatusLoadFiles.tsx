
import { useEffect, useRef, useState } from "react"; 
import { StatusUploadFile } from "@/types"

declare const bootstrap: any;
interface Props {
  filesNames: string[] | null;
  status: StatusUploadFile | null;
}
export const StatusLoadFiles = ({ filesNames, status }: Props) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const [alert, setAlert] = useState<any>(null);
  const [localFilesNames, setLocalFilesNames] = useState<any[] | null>(null);

  useEffect(() => {
    if (!alertRef.current) return;

    const liveToast = new bootstrap.Toast(alertRef.current);
    setAlert(liveToast);
  }, [alertRef.current]);

  useEffect(() => {
    setLocalFilesNames(filesNames);
  }, [filesNames]);

  useEffect(() => {

    if (!alert || !localFilesNames) return;

    if (status == StatusUploadFile.LOADING) {
      // abrir toast
      alert.show();
    } else {
      setTimeout(() => {
        alert.hide();
      }, 5000);
    }
  }, [localFilesNames, status]);

  return (
    <div
      ref={alertRef}
      className="position-fixed toast hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ top: "20px", right: "20px", zIndex: 1000, width: "500px" }}
      data-bs-autohide="false"
    >
      <div className="toast-header">
        <div className="d-flex align-items-center flex-grow-1">
          <ul className="list-group flex-grow-1 list-group-flush">
            {localFilesNames?.map((fileName) => (
              <li className="list-group-item d-flex align-items-center" key={fileName}>
                {StatusUploadFile.LOADING == status && (
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                {StatusUploadFile.SUCCESS == status && (
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                )}
                {StatusUploadFile.ERROR == status && (
                  <i className="bi bi-x-circle-fill text-danger me-2"></i>
                )}

                {fileName}
              </li>
            ))}
          </ul>
          <div className="text-end align-self-start">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
      <div className="toast-body">
        {status === StatusUploadFile.LOADING && (
          <>Estamos procesando tus archivos. Esto puede tardar un momento.</>
        )}
        {status === StatusUploadFile.SUCCESS && (
          <>Tus archivos se han cargado correctamente.</>
        )}
        {status === StatusUploadFile.ERROR && (
          <>Uno o más archivos no pudieron ser cargados.</>
        )}
      </div>
    </div>
  );
};
