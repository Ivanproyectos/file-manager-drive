import { useEffect, useRef, useState } from "react";

declare const bootstrap: any;
interface Props {
  files: File[];
}
export const StatusLoadFiles = ({ files }: Props) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const [alert, setAlert] = useState<any>(null);

  useEffect(() => {
    if (!alertRef.current) return;
    const liveToast = new bootstrap.Toast(alertRef.current);
    setAlert(liveToast);
    /*  document.querySelector('#liveToastBtn').addEventListener('click', () => liveToast.show()) */

    return () => {
      /*  if(alert) liveToast.hide(); */
    };
  }, [alertRef.current]);

  useEffect(() => {
    if (!alert || !files) return;
    if(files.length > 0){
        alert.show();
    }else{
        alert.hide();
    }
   
  }, [files]);

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
            {files?.map((file) => (
                <li className="list-group-item d-flex align-items-center">
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                {file.name}
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
         Estamos procesando tus archivos. Esto puede tardar un momento.
      </div>
    </div>
  );
};
