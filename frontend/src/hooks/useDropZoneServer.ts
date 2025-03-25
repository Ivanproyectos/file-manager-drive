import { useEffect, useState } from 'react';
import { getUploadId } from '@/api/uploadFile';

declare const HSCore: any;
interface Props {
  elementRef: React.RefObject<HTMLDivElement | null>
}
export const useDropZoneServer = ({ elementRef }: Props) => {

  const [uploadId, setUploagId] = useState<string | null>(null);
  const urlUpload = `${import.meta.env.VITE_API_BASE_URL}/upload/upload-chunk`;

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

    if (!elementRef.current || !uploadId) return

    HSCore.components.HSDropzone.init(elementRef.current, {
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
      debugger;
      const currentDropzone = HSCore.components.HSDropzone.collection
      .find((dropzone: { id: string }) => dropzone.id === 'dropzoneFileUpload');

      currentDropzone?.$initializedEl.destroy(); 
    
   /*  const dropzoneItems = HSCore.components.HSDropzone?.getItems();
    dropzoneItems.forEach((element: any) => {
      element.destroy();
    });
 */
    
    };
  }, [uploadId]);

  return { uploadId };
};