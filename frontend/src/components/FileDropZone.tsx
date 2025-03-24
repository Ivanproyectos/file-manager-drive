
import { useDropZoneServer } from '@/hooks/useDropZoneServer'
import { useEffect, useRef} from 'react'

declare const HSCore : any
interface Props {
  onGetUploadId: (uploadId: string) => void
}
export const FileDropZone = ({ onGetUploadId }: Props) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { uploadId } =  useDropZoneServer({ elementRef });

  useEffect(() => {
    onGetUploadId(uploadId as string);
  }, [uploadId])

  return (
    <div
      id="dropzoneFileUpload"
      ref={elementRef}
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
