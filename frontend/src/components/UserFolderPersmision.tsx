import { addUser, addUsers, deleteUser, updateUser } from '@/actions'
import { SearchUser } from '@/components'
import { useInitTooltip } from '@/hooks'
import { userFilePermissionReducer } from '@/reducers'
import { IFolderPermission, IUserSummary } from '@/types'
import { format } from 'date-fns'
import React, { useEffect, useReducer, useRef } from 'react'

declare const HSCore: any

const initialState = {
  users: [],
}
interface userFolderPermissionProps {
  onUpdateUsers: (users: IFolderPermission[]) => void
  initialUsers?: { users: IFolderPermission[] | [] }
}

export const UserFolderPersmision = React.memo(
  ({
    initialUsers = { users: [] },
    onUpdateUsers,
  }: userFolderPermissionProps) => {
    const [state, dispatch] = useReducer(
      userFilePermissionReducer,
      initialState
    )
    const inputDateRef = useRef<HTMLInputElement>(null)

    useInitTooltip()

    const handleSelectedUser = (userSummary: IUserSummary) => {
      if (
        state?.users?.find(
          (user: IFolderPermission) => user.userId === userSummary.id
        )
      )
        return

      const user: IFolderPermission = {
        userId: userSummary.id,
        name: userSummary.name,
        expirationDate: '',
        canView: false,
        canDownload: true,
        isDateExpired: false,
        email: userSummary.email,
      }
      dispatch(addUser(user))
      /*  onUpdateUsers(state?.users) */
    }

    useEffect(() => {
      if (state.users.length == 0) return

      HSCore.components.HSFlatpickr.init(inputDateRef.current, {
        onChange: function (
          _selectedDates: Array<Date>,
          dateStr: string,
          instance: any
        ) {
          const userId = Number(instance.input.dataset.userId)
          handleExpirationDate(userId, dateStr, true)
        },
      })
      onUpdateUsers(state?.users)
    }, [state.users])

    useEffect(() => {
      if (initialUsers.users.length == 0) {
        return
      }

      const users = initialUsers.users.map((user: IFolderPermission) => {
        const expirationDate = user.expirationDate
          ? format(new Date(user.expirationDate), 'dd/MM/yyyy')
          : ''
        return {
          ...user,
          expirationDate,
        }
      })
      dispatch(addUsers(users))
    }, [initialUsers.users])

    /*   const handleCanview = (id: number) => {
			const user = state?.users?.find(
				(user: IUserFilePermission) => user.userId === id
			);
			if (!user) return;
			dispatch(updateUser({ ...user, canView: !user?.canView }));
			};
		*/
    const handleCandownload = (id: number) => {
      const user = state?.users?.find(
        (user: IFolderPermission) => user.userId === id
      )
      if (!user) return
      dispatch(updateUser({ ...user, canDownload: !user?.canDownload }))
    }

    const handleExpirationDate = (
      id: number,
      expirationDate: string,
      isDateExpired: boolean
    ) => {
      const user = state?.users?.find(
        (user: IFolderPermission) => user.userId === id
      )

      if (!user) return
      dispatch(updateUser({ ...user, expirationDate, isDateExpired }))
    }

    const handleDeleteUser = (id: number) => {
      dispatch(deleteUser(id))
    }

    return (
      <>
        <SearchUser onSelectedUser={handleSelectedUser} />
        {state?.users?.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Usuario</th>
                {/*        <th scope="col">Ver</th> */}
                <th scope="col">Descargar</th>
                <th scope="col">
                  Expiración
                  <i
                    className="bi bi-question-circle ms-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Expiración de los permisos de los archivos"
                  ></i>
                </th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {state?.users?.map((user: IFolderPermission) => (
                <tr key={user.userId}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <span className="avatar avatar-soft-primary avatar-circle">
                          <span className="avatar-initials">
                            {user?.name?.charAt(0)}
                          </span>
                        </span>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="text-body mb-0">{user.name}</h5>
                        <span className="d-block small">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  {/*         <td className="align-middle">
										<label
										className="row form-check form-switch"
										htmlFor={`addfileCanViewSwitch${user.userId}`}
										>
										<span className="col-4 col-sm-3 text-end">
											<input
											type="checkbox"
											onChange={() => handleCanview(user.userId)}
											className="form-check-input"
											id={`addfileCanViewSwitch${user.userId}`}
											defaultChecked={user.canView}
											/>
										</span>
										</label>
									</td> */}
                  <td className="align-middle">
                    <label
                      className="row form-check form-switch"
                      htmlFor={`addfileCanLoadSwitch${user.userId}`}
                    >
                      <span className="col-4 col-sm-3 text-end">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onChange={() => handleCandownload(user.userId)}
                          id={`addfileCanLoadSwitch${user.userId}`}
                          defaultChecked={user.canDownload}
                        />
                      </span>
                    </label>
                  </td>
                  <td className="align-middle">
                    {user.isDateExpired && (
                      <div className="d-flex align-items-center position-relative justify-content-end">
                        <input
                          style={{ width: '200px !important' }}
                          ref={inputDateRef}
                          type="text"
                          className="form-control js-flatpickr flatpickr-custom"
                          data-hs-flatpickr-options='{
													"dateFormat": "d/m/Y"
													}'
                          value={user.expirationDate ?? ''}
                          defaultValue={user.expirationDate?.toString()}
                          data-user-id={user.userId}
                        />
                        <i
                          className="bi bi-x-circle text-danger position-absolute"
                          onClick={() =>
                            handleExpirationDate(user.userId, '', false)
                          }
                          style={{ right: '10px', cursor: 'pointer' }}
                        ></i>
                      </div>
                    )}

                    {!user.isDateExpired && (
                      <div
                        onClick={() =>
                          handleExpirationDate(
                            user.userId,
                            new Date().toLocaleDateString(),
                            true
                          )
                        }
                        className="d-flex justify-content-start align-items-center gap-2"
                        style={{ cursor: 'pointer' }}
                      >
                        <div>
                          <span className="legend-indicator bg-success"></span>
                          No expira
                        </div>
                        <i className="bi bi-pencil-square"></i>
                      </div>
                    )}
                  </td>
                  <td>
                    <div
                      role="button"
                      className="w-100"
                      style={{ fontSize: '2rem' }}
                      onClick={() => handleDeleteUser(user.userId)}
                    >
                      <i className="bi-x text-danger"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {state?.users?.length === 0 && (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            aria-live="polite"
            role="alert"
          >
            <img
              height={200}
              width={200}
              src="../assets/svg/illustrations/oc-empty-cart.svg"
              className="mb-2"
              alt="list empty"
              data-hs-theme-appearance="default"
            />
            <img
              height={200}
              width={200}
              src="../assets/svg/illustrations-light/oc-empty-cart.svg"
              className="mb-2"
              alt="list empty"
              data-hs-theme-appearance="dark"
            />
            <p className="text-center text-muted">Ningun usuario agregado</p>
          </div>
        )}
      </>
    )
  }
)
