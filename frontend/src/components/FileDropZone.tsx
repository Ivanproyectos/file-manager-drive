
import { useDropZoneServer } from '@/hooks/useDropZoneServer'

declare const HSCore : any
export const FileDropZone = () => {
  
  useDropZoneServer();
 
  return (
    <div
      id="attachFiles"
      className="js-dropzone dz-dropzone dz-dropzone-card"
    >
      <div className="dz-message">
        <img
          className="avatar avatar-xl avatar-4x3 mb-3"
          src="../assets/svg/illustrations/oc-browse.svg"
          alt="Image Description"
          data-hs-theme-appearance="default"
        />
        <img
          className="avatar avatar-xl avatar-4x3 mb-3"
          src="../assets/svg/illustrations-light/oc-browse.svg"
          alt="Image Description"
          data-hs-theme-appearance="dark"
        />

        <h5>Arrastre y suelte su archivo aquí</h5>

        <p className="mb-2">o</p>

        <span className="btn btn-white btn-sm">Explorar archivos</span>
      </div>
    </div>
  
  )
}
