import { useEffect } from 'react'
declare const HSCore : any
export const FileDropZone = ({url}: {url: string} ) => {

  useEffect(() => {
   HSCore.components.HSDropzone.init('#attachFiles', {
    paramName: 'file',
    chunking: true, 
    retryChunks: true,
    chunkSize: 5 * 1024 * 1024, // 5mb
    url : url,
    params : function (files: File[], xhr: XMLHttpRequest, chunk: any) {
      const parameters = { uploadId: '1f5864ef-99d7-45d6-a7f7-a4bf131b560d' };
    if (chunk) {
          return {
            ...parameters,
            uuid: chunk.file.upload.uuid,
            chunkindex: chunk.index,
            totalfilesize: chunk.file.size,
            chunksize: this.options.chunkSize,
            totalchunkcount: chunk.file.upload.totalChunkCount,
            chunkbyteoffset: chunk.index * this.options.chunkSize,
          };
        }
        return parameters;
    },
 /*    sending: function(file: File, xhr: XMLHttpRequest, formData: FormData) {
       formData.append("userId", "12"); // Agregar parámetro personalizado
    }, */
/*     complete: function (file: any) {
     // console.log(file);
    } */
   });

   return () => {
    HSCore.components.HSDropzone.destroy('#attachFiles');
   }
  }, [])

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

        <h5>Drag and drop your file here</h5>

        <p className="mb-2">or</p>

        <span className="btn btn-white btn-sm">Browse files</span>
      </div>
    </div>
  
  )
}
