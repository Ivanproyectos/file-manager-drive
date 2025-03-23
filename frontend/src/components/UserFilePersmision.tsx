import { SearchUser } from "@/components";
import { userFilePermissionReducer, initialState } from "@/reducers";
import { useEffect, useReducer, useRef } from "react";
import { IUserFilePermission, IUserSummary } from "@/types";
import { addUser, updateUser, deleteUser } from "@/actions";
import { useInitTooltip } from "@/hooks";

declare const HSCore: any;

interface userFilePermissionProps {
  onUpdateUsers: (users: IUserFilePermission[]) => void;
}

export const UserFilePersmision = ({
  onUpdateUsers,
}: userFilePermissionProps) => {
  const [state, dispatch] = useReducer(userFilePermissionReducer, initialState);
  const inputDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    HSCore.components.HSFlatpickr.init(inputDateRef.current, {
      onChange: function (selectedDates: Array<Date>, dateStr:string, instance: any) {
        const userId = Number(instance.input.dataset.userId);
        handleExpirationDate(userId, dateStr);
      }
 
    });
  }, [state.users]);

  useInitTooltip();

  const handleSelectedUser = (userSummary: IUserSummary) => {
    if (
      state?.users?.find(
        (user: IUserFilePermission) => user.id === userSummary.id
      )
    )
      return;
    const user: IUserFilePermission = {
      id: userSummary.id,
      name: userSummary.name,
      expirationDate: new Date().toISOString(),
      canView: true,
      canDownload: true,
      email: userSummary.email,
    };
    dispatch(addUser(user));
    onUpdateUsers(state?.users);
  };

  const handleCanview = (id: number) => {
    const user = state?.users?.find(
      (user: IUserFilePermission) => user.id === id
    );
    if (!user) return;
    dispatch(updateUser({ ...user, canView: !user?.canView }));
    onUpdateUsers(state?.users);
  };

  const handleCandownload = (id: number) => {
    const user = state?.users?.find(
      (user: IUserFilePermission) => user.id === id
    );
    if (!user) return;
    dispatch(updateUser({ ...user, canDownload: !user?.canDownload }));
    onUpdateUsers(state?.users);
  };

  const handleExpirationDate = (id: number, expirationDate: string) => {
    const user = state?.users?.find(
      (user: IUserFilePermission) => user.id === id
    );
    if (!user) return;
    dispatch(updateUser({ ...user, expirationDate }));
    onUpdateUsers(state?.users);
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
    onUpdateUsers(state?.users);
  };

  return (
    <>
      <SearchUser onSelectedUser={handleSelectedUser} />
      {state?.users?.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Ver</th>
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
            {state?.users?.map((user: IUserFilePermission) => (
              <tr key={user.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="avatar avatar-sm avatar-circle">
                        <img
                          className="avatar-img"
                          src="../assets/img/160x160/img3.jpg"
                          alt="Image Description"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="text-body mb-0">{user.name}</h5>
                      <span className="d-block small">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <label
                    className="row form-check form-switch"
                    htmlFor={`addfileCanViewSwitch${user.id}`}
                  >
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        onChange={() => handleCanview(user.id)}
                        className="form-check-input"
                        id={`addfileCanViewSwitch${user.id}`}
                        defaultChecked={user.canView}
                      />
                    </span>
                  </label>
                </td>
                <td className="align-middle">
                  <label
                    className="row form-check form-switch"
                    htmlFor={`addfileCanLoadSwitch${user.id}`}
                  >
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={() => handleCandownload(user.id)}
                        id={`addfileCanLoadSwitch${user.id}`}
                        defaultChecked={user.canDownload}
                      />
                    </span>
                  </label>
                </td>
                <td className="align-middle">
                  <input
                    style={{ width: "200px !important" }}
                    ref={inputDateRef}
                    type="text"
                    className="form-control js-flatpickr flatpickr-custom"
                    data-hs-flatpickr-options='{
                    "dateFormat": "d/m/Y"
                   }'
                    defaultValue={user.expirationDate}
                    data-user-id={user.id}
                  />
                </td>
                <td>
                  <div
                    role="button"
                    className="w-100"
                    style={{ fontSize: "2rem" }}
                    onClick={() => handleDeleteUser(user.id)}
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
          <p className="text-center text-muted">Ningun usuario seleccionado</p>
        </div>
      )}
    </>
  );
};
