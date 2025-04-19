import { IFolderProcessState, IFolderProcessStatus, IFolderProcessHistories} from "@/types";
import {useEffect, useState, useRef} from 'react'
import { getFolderProcessStatus } from "@/api/folderStatus";

interface Props {
    onCloseModal?: () => void;
    folderStatusHistories?: IFolderProcessHistories[] | null;
}

export const ViewFolderStatus = ({folderStatusHistories, onCloseModal}: Props) => {
    const [folderStatus, setFolderStatus] = useState<IFolderProcessState[] | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);


    const statusIdExistsInFolderHistory = (statusId: number): boolean =>
        folderStatusHistories?.some((history) => history.state.id === statusId) ?? false;

    const getCommentStatus = (statusId: number): string => {
        const history = folderStatusHistories?.find((history) => history.state.id === statusId);
        return history?.comment || "";
    };


     useEffect(() => {
           const getLoagedFolderStatus = async () => {
                try{
                    const folderStatus = await getFolderProcessStatus();
                    setFolderStatus(folderStatus);
                }catch(error){
                    console.error('Error fetching data:', error)
                }
           }
           getLoagedFolderStatus();
    
        }, [])
  return (
   
           <div
               ref={modalRef}
               className="modal fade"
               tabIndex={-1}
               aria-hidden="true"
               data-bs-backdrop="static"
               id="viewFolderStatusModal"
           >
               <div className="modal-dialog modal-dialog-centered modal-md">
                   <div className="modal-content">
                       <div className="modal-header">
                           <h5 className="modal-title" id="uploadFilesModalLabel">
                           Seguimiento del estado
                           </h5>
                           <button
                               onClick={onCloseModal}
                               type="button"
                               className="btn-close"
                               data-bs-dismiss="modal"
                               aria-label="Close"
                           ></button>
                       </div>
                       <div className="modal-body">
   
                           <ul className="step">
   
                               {folderStatus?.map(({ id, name }) => (
   
                                   <li className="step-item" key={id}>
                                       <div className="step-content-wrapper">
   
                                           <span className={`step-icon avatar avatar-sm avatar-${
                                               id === IFolderProcessStatus.PENDING ? "warning" : 
                                               statusIdExistsInFolderHistory(id) ? "success" : "light"} avatar-circle`
                                               }>
                                               <span className="avatar-initials">
                                               {id === IFolderProcessStatus.PENDING ?
                                                (<i className="bi-clock"></i>) :
                                                (<i className="bi bi-check"></i>) }
                                                  
                                               </span>
                                           </span>
                                           <div className="step-content d-flex justify-content-center flex-column">
                                               <span className="step-title">{name}</span>
                                               {statusIdExistsInFolderHistory(id) && getCommentStatus(id) && (
                                                 <div className="d-flex gap-1">
                                                     <i className="bi bi-chat"></i>
                                                     <p>{ getCommentStatus(id) }</p>
                                                 </div>
                                               )}
   
                                             
                                           </div>
                                    
                                       </div>
                                   </li> 

                               ))}
   
                           </ul>
   

                       </div>
                       <div className="modal-footer">
                           <button
                               onClick={onCloseModal}
                               type="button"
                               className="btn btn-white"
                               data-bs-dismiss="modal"
                               aria-label="Close"
                           >
                               Cerrar
                           </button>
                       </div>
                   </div>
               </div>
           </div>
  )
}
