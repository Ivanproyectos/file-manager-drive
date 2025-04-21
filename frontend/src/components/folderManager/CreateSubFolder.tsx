import { createFile } from '@/api/files'
import { createSubFolder } from '@/api/folderApi'
import { ButtonSubmit, FileDropZone } from '@/components'
import { ICreateFile, ICreateSubFolder } from '@/types'
import { showError } from '@/utils/alerts'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

declare const bootstrap: any
interface Props {
  folderId: number
  isModalOpen: boolean
  onModalOpen: (isOpen: boolean) => void
  onCreated: React.Dispatch<React.SetStateAction<boolean>>
  onUploadedFiles: (filesNames: string[]) => void
}

export const CreateSubFolder = ({
  folderId,
  isModalOpen,
  onModalOpen,
  onCreated,
  onUploadedFiles,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [dropzoneInstance, setdropzoneInstance] = useState<any>({
    dropzone: null,
    uploadId: null,
  })
  /*   const signalr = useConnectSignalr();
   */
  const handleDropzone = (uploadId: string, dropzone?: any) => {
    setdropzoneInstance({ dropzone, uploadId })
  }
  const handleCreateSubFolder = async (data: any) => {
    let subFolderId: number
    const { uploadId, dropzone } = dropzoneInstance

    try {
   
      const folder: ICreateSubFolder = {
        folderId,
        name: data.name,
        description: data.description,
      }
      subFolderId = await createSubFolder(folder)

    } catch (error) {
      showError('Error al crear la carpeta, vuelva a intentalor mas tarde')
    }

    try {

      if (dropzone.files.length !== 0){

        const file: ICreateFile = { folderId: subFolderId!, uploadId }
        await createFile(file)
        onUploadedFiles(dropzone.files.map((file: any) => file.name))
      }
 
    } catch (error) {
      console.error(error)
    }
    reset()
    onCreated((preve: boolean) => !preve)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      onModalOpen(false)
    }, 500)
    const modal = bootstrap.Modal.getInstance(modalRef.current)
    modal.hide()
  }

  /*   useEffect(() => {
      if (signalr) {
        signalr.on("FileUploaded", (response: StatusUploadedFile) => {
       
          setFiles(response.files);
          setStatus(response.status);
          onFilesRefresh((prev)=> !prev); 
        });
      }
      return () => {
        if (signalr) {
          signalr.off("FileUploaded");
        }
      };
    }, [signalr]);
   */
  return (
    <>
      <div
        ref={modalRef}
        className="modal fade"
        id="newFolderModal"
        tabIndex={-1}
        aria-labelledby="newFolderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newProjectModalLabel">
                Nuevo folder
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit(handleCreateSubFolder)}
                id="newSubFolder"
              >
                <div className="mb-4">
                  <label htmlFor="nameSubfolder" className="form-label">
                    Folder{' '}
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Displayed on public forums, such as Front."
                    ></i>
                  </label>

                  <div className="js-form-message">
                    <input
                      {...register('name', { required: true })}
                      type="text"
                      className={`form-control ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                      name="name"
                      id="nameSubfolder"
                      placeholder="Ingrese el nombre del folder"
                      aria-label="Ingrese el nombre del folder"
                      required
                      data-msg="Nombre de folder es requerido."
                    />
                    {errors.name && (
                      <span className="invalid-feedback">
                        Nombre del folder es requerido
                      </span>
                    )}
                  </div>
                </div>

                {/*End Form */}

                <div className="mb-4">
                  <label className="form-label">
                    Descripción{' '}
                    <span className="form-label-secondary">(Optional)</span>
                  </label>
                  <div className="js-form-message">
                    <textarea
                      {...register('description')}
                      className="form-control"
                      name="description"
                      placeholder="Ingrese una descripción"
                      aria-label="Ingrese una descripción"
                    ></textarea>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label">Adjuntar archivos</label>
                  {isModalOpen && (
                    <FileDropZone
                      validate={true}
                      onGetUploadId={handleDropzone}
                    />
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCloseModal}
                type="button"
                className="btn btn-white"
                /*       data-bs-dismiss="modal" */
                aria-label="Close"
              >
                Cancelar
              </button>
              {/*  <button
              disabled={!isValid}
              form="newSubFolder"
              type="submit"
              className="btn btn-primary d-flex justify-content-center align-items-center"
            >
              Crear folder 
            </button> */}
              <ButtonSubmit
                title="Crear folder"
                formName="newSubFolder"
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
