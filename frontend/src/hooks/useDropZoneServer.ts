import { useEffect, useState } from 'react';
import { getUploadId } from '@/api/uploadFile';

declare const HSCore: any;
interface Props {
  elementRef: React.RefObject<HTMLDivElement | null>
}
export const useDropZoneServer = ({ elementRef }: Props) => {

  const [uploadId, setUploagId] = useState<string | null>(null);
  const [dropzone, setDropzone] = useState<any>(null);

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
    if (!elementRef.current) return

    if (!dropzone) {
      HSCore.components.HSDropzone.init(elementRef.current, {
        paramName: 'file',
        chunking: true,
        retryChunks: true,
        chunkSize: 5 * 1024 * 1024, // 5MB
        url: urlUpload,
      });
      setDropzone(HSCore.components.HSDropzone.getItem(0));
    }
    return () => {

      if (dropzone) {
        dropzone.destroy();
      }
      HSCore.components.HSDropzone.collection = [];
    };
  }, [elementRef.current]);

  useEffect(() => {
    if (dropzone) {
      dropzone.options.params = function (files: File[], xhr: XMLHttpRequest, chunk: any) {
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
      }
    }
  }, [uploadId, dropzone])

  return { uploadId, dropzone };
};