import { IFolderProcessHistories, IFolderProcessStatus } from "@/types";
import { useState } from "react";

declare const bootstrap: any;

interface Props {
    modalRef: React.RefObject<HTMLDivElement | null>;
    folderStatusHistories: IFolderProcessHistories[] | null;
    onSubmit: (statusId: number) => Promise<boolean>;
    onCloseModal?: () => void
}

export const ChangeFolderStatus = ({ modalRef, onSubmit, onCloseModal, folderStatusHistories }: Props) => {
    const [statusId, setStatusId] = useState(0);
    const [isValid, setValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
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
        const result = await onSubmit(statusId);
        if (result) {
            closeModal();
        }
        setIsLoading(false);
    }

    const closeModal = () => {
        const modal = bootstrap.Modal.getInstance(modalRef.current!);
        modal.hide();
    }

    const getStatusClassName = (statusId: number): string => {
        switch (statusId) {
            case IFolderProcessStatus.PENDING:
                return "avatar avatar-xs avatar-warning avatar-circle";
            case IFolderProcessStatus.PROCESS:
                return "avatar avatar-xs avatar-info avatar-circle";
            case IFolderProcessStatus.FINISHED:
                return "avatar avatar-xs avatar-success avatar-circle";
            default:
                return "";
        }
    };

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
            <div className="modal-dialog modal-dialog-centered modal-lg">
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

                            {folderStatusHistories?.map(({ id, state: { id: stateId, name } = {} }) => (

                                <li className="step-item" key={id}>
                                    <div className="step-content-wrapper">

                                        <span className={`step-icon ${getStatusClassName(stateId as number)}`}>
                                            <span className="avatar-initials"></span>
                                        </span>
                                        <div className="step-content d-flex align-items-center">
                                            <h5 >{name}</h5>
                                        </div>
                                    </div>
                                </li>


                            ))}

                        </ul>

                        <div className="mb-4">
                            <label className="form-label">Cambiar estado a:</label>
                            <select className={`form-select ${!isValid ? "is-invalid" : ""}`} onChange={handleSelectedStatus} value={statusId}>
                                <option value="0" disabled>Seleccionar</option>
                                <option value="1">Pendiente</option>
                                <option value="2">En proceso</option>
                                <option value="3">Atendido</option>
                            </select>
                            {!isValid && <span className="invalid-feedback">El campo es requerido</span>}
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
