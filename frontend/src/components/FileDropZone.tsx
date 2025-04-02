
import { useDropZoneServer } from '@/hooks/useDropZoneServer'
import React, { useEffect, useRef, useState} from 'react'

interface Props {
  onGetUploadId: (uploadId: string, dropzone?: any) => void
  validate: boolean
}
export const FileDropZone = React.memo(({ onGetUploadId, validate = true}: Props) => {
  const [isValid, setIsValid] = useState(validate);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { uploadId, dropzone} =  useDropZoneServer({ elementRef });

  useEffect(() => {
    if(!dropzone) return
   
    dropzone.on('complete', function(file: File) {
      setIsValid(true);
    });
  },[dropzone])

  useEffect(() => {
    setIsValid(validate)
  },[validate])

  useEffect(() => {
    if(uploadId === null) return
    onGetUploadId(uploadId as string, dropzone);
  }, [uploadId])

  return (
    <div
      ref={elementRef}
      className="js-dropzone dz-dropzone dz-dropzone-card"
    >
      <div className="dz-message">
        <img
          className="avatar avatar-xl avatar-4x3 mb-3"
          src="/assets/svg/illustrations/oc-browse.svg"
          alt="Image Description"
          data-hs-theme-appearance="default"
        />
        <img
          className="avatar avatar-xl avatar-4x3 mb-3"
          src="/assets/svg/illustrations-light/oc-browse.svg"
          alt="Image Description"
          data-hs-theme-appearance="dark"
        />

        <h5>Arrastre y suelte su archivo aquí</h5>

        <p className="mb-2">o</p>

        <span className="btn btn-white btn-sm" role="button" aria-label="Explorar archivos">Explorar archivos</span>
      </div>
      {!isValid && <div className="mt-2 text-danger text-center w-100"> Agregue al menos un archivos para subir </div>  }
    </div>
  
  )
})
