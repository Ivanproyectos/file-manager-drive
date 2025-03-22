import { useEffect, useState } from 'react'
import { getUploadId } from '../api/uploadFile'

declare const HSCore : any
export const FileDropZone = () => {
  const [uploadId, setUploagId] = useState<String | null>(null);
  const urlUpload = `${import.meta.env.REACT_APP_API_URL}/upload/upload-chunk`;

  useEffect(() => {
    const loadUploadId = async () => {
      try {
        setUploagId(await getUploadId());
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
       // setLoading(false);
      }
    }
    loadUploadId();
  }, [])

  useEffect(() => {
 /*    const dropzoneId = 'attachFiles';

    const removeDropzone = (id: string) => {
      const currentDropzones = HSCore.components.HSDropzone.collection;
      HSCore.components.HSDropzone.collection = currentDropzones.filter(
        (dropzone: { id: string }) => dropzone.id !== id
      );
    }; */

    debugger;
    const currentDropzones = HSCore.components.HSDropzone.collection;
    if (currentDropzones.some((dropzone: { id: string }) => dropzone.id === 'attachFiles')) {
      const currentDropzon = currentDropzones.find((dropzone: { id: string }) => dropzone.id === 'attachFiles'); //currentDropzon 
      currentDropzon.$initializedEl.destroy();
      //removeDropzone(dropzoneId);
    }

    HSCore.components.HSDropzone.init('#attachFiles', {
      paramName: 'file',
      chunking: true,
      retryChunks: true,
      chunkSize: 5 * 1024 * 1024, // 5MB
      url: urlUpload,
      params: function (files: File[], xhr: XMLHttpRequest, chunk: any) {
        const params = {
          uploadId: uploadId,
          isLastChunk: chunk !== null,
        };

        if (chunk) {
          return {
            ...params,
            uuid: chunk.file.upload.uuid,
            chunkIndex: chunk.index,
            totalFileSize: chunk.file.size,
            chunkSize: this.options.chunkSize,
            totalChunkCount: chunk.file.upload.totalChunkCount,
            chunkByteOffset: chunk.index * this.options.chunkSize,
          };
        }

        return params;
      },
    });

    return () => {
    /*   const currentDropzones = HSCore.components.HSDropzone.collection;
      HSCore.components.HSDropzone.collection = currentDropzones.filter(
        (dropzone: { id: string }) => dropzone.id !== 'attachFiles'
      ); */
    };
  }, [uploadId]);

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
