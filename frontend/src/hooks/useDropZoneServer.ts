import { useEffect, useState } from 'react';
import { getUploadId } from '../api/uploadFile';

declare const HSCore : any;
export const useDropZoneServer = () => {

    const [uploadId, setUploagId] = useState<String | null>(null);  
    const urlUpload = `${import.meta.env.VITE_API_BASE_URL}/api/upload/upload-chunk`;

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
        const currentDropzones = HSCore.components.HSDropzone.collection;
        const currentDropzon = currentDropzones.find((dropzone: { id: string }) => dropzone.id === 'attachFiles'); 
        currentDropzon.$initializedEl.destroy();
      };
    }, [uploadId]);

};