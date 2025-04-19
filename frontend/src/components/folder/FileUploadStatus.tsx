import { getFileStorageStatus } from '@/api/files'
import { useEffect, useState} from 'react'
import { IFileStorageStatus } from '@/types'
import { convertBytes } from '@/utils/formatBytes'

export const FileUploadStatus = () => {4
    const [fileStorageStatus, setFileStorageStatus] = useState<IFileStorageStatus>();

  
    const percent = Math.round((fileStorageStatus?.usedStorageBytes || 0) / (fileStorageStatus?.totalStorageBytes || 1) * 100);

    useEffect(() => {
      const fetchFileStorageStatus = async () => {
        try {
          const status = await getFileStorageStatus();
          setFileStorageStatus(status);
        } catch (error) {
          console.error('Error fetching file storage status:', error);
        }
      }

      fetchFileStorageStatus();
    }, [])

  return (
    <>
     <div className="row justify-content-start mb-2">
        <div className="col-auto">
        <span className="legend-indicator bg-primary"></span>
        <strong>{convertBytes(fileStorageStatus?.usedStorageBytes || 0)}</strong>{' '}
        <span className="text-muted">
            de {convertBytes(fileStorageStatus?.totalStorageBytes || 0)} utilizados.
        </span>
        </div>
    </div>
    
    <div className="progress rounded-pill">
        <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${percent}%` }}
        aria-valuenow={40}
        aria-valuemin={0}
        aria-valuemax={100}
        ></div>
        {/*  <div className="progress-bar bg-success" role="progressbar" style={{width: "30%"}} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}></div> */}
    </div>
    </>
    
                   
  )
}
