import { IFolderProcessHistories, IFolderProcessStatus, IFolderProcessState } from "@/types";
import { useEffect, useState } from "react";
import { getFolderProcessStatus } from "@/api/folderStatus";

declare const bootstrap: any;

interface Props {
    modalRef: React.RefObject<HTMLDivElement | null>;
    folderStatusHistories: IFolderProcessHistories[] | null;
    onSubmit: (statusId: number, comment: string) => Promise<boolean>;
    onCloseModal?: () => void
}

export const ChangeFolderStatus = ({ modalRef, onSubmit, onCloseModal, folderStatusHistories }: Props) => {
    const [statusId, setStatusId] = useState(0);
    const [comment, setComment] = useState('');
    const [isValid, setValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [folderStatus, setFolderStatus] = useState<IFolderProcessState[] | null>(null);
    /* const modalRef = useRef<HTMLDivElement>(null); */

    const handleSelectedStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (parseInt(e.target.value) === 0) {
            setValid(false);
            return;
        }
        setStatusId(parseInt(e.target.value));
        setValid(true);
    }

    const handleSubmit = async () => {
        if (statusId === 0) {
            setValid(false);
            return;
        }
        setIsLoading(true);
        const result = await onSubmit(statusId, comment);
        if (result) {
            closeModal();
        }
        setIsLoading(false);
    }

    const closeModal = () => {
        const modal = bootstrap.Modal.getInstance(modalRef.current!);
        modal.hide();
    }


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
            id="changeFolderStatusModal"
            tabIndex={-1}
            aria-labelledby="changeFolderStatusModallabel"
            aria-hidden="true"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="uploadFilesModalLabel">
                            Estados del folder
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

                              /*   <li className="step-item" key={id}>
                                    <div className="step-content-wrapper">

                                        <span className={`step-icon ${getStatusClassName(id as number)}`}>
                                            <span className="avatar-initials">
                                                {id === IFolderProcessStatus.PENDING ? (<i className="bi-clock"></i>) : "" }
                                            </span>
                                        </span>
                                        <div className="step-content d-flex align-items-center">
                                            <h5 >{name}</h5>
                                        </div>
                                    </div>
                                </li> */


                            ))}

                        </ul>

                        <div className="mb-4">
                            <label className="form-label">Cambiar estado a:</label>
                            <select className={`form-select ${!isValid ? "is-invalid" : ""}`} onChange={handleSelectedStatus} value={statusId}>
                                <option value="0" disabled>Seleccionar</option>
                                {folderStatus?.map(({ id, name }) => (
                                    <option key={id} value={id} disabled={statusIdExistsInFolderHistory(id)}>{name}</option>
                                ))}
                            </select>
                            {!isValid && <span className="invalid-feedback">El campo es requerido</span>}
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Observaciones: <span className="text-muted">(Opcional)</span></label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="form-control" rows={3}
                                placeholder="Ingrese las observaciones">
                            
                            </textarea>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={onCloseModal}
                            type="button"
                            className="btn btn-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`btn btn-primary d-flex justify-content-center align-items-center `}
                            onClick={handleSubmit}
                            disabled={isLoading}>

                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
