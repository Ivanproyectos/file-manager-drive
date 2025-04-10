import { UserTable, CreateUserForm, EditUserForm } from "@/components";
import { useState,useEffect, useRef } from "react";
import  * as api from "@/api/users";
import { showError } from "@/utils/alerts";
import { CreateUser, UpdateUser, IUser } from "@/types";
import { convertDateStringToIso, convertIsoDateToString } from "@/utils/dateFormat";


declare const bootstrap: any;

export const UsersPage = () => {
  const modalUpdateRef = useRef<HTMLDivElement | null >(null);
  const modalCreateRef = useRef<HTMLDivElement | null>(null);
  const [userId, setUserId] = useState(0);
  const [userById, setUserById] = useState<IUser | null>(null);
  const [isReload, setIsReload] = useState(false);


  const handleCreateUser = async (user: CreateUser) : Promise<boolean> => {
   try {
       const bussinessName = user.people.bussinessName;
        user.people.identification = user.people.identification.toString();
        user.people.phone = user.people.phone.toString();
        user.people.bussinessName = bussinessName ? bussinessName : '';
        user.expirationDate = convertDateStringToIso(user.expirationDate || '');
        await api.addUser(user);
        setIsReload((prev) => !prev);
        closeModlal(modalCreateRef);
        return true;
      }
      catch (error) {
        console.error("Error al crear el usuario:", error);
        showError("Ocurrio un error al crear el usuario, vuelva a intentalor mas tarde");
        return false;
      }
  };

  const handleUpdateUser = async (user: UpdateUser) : Promise<boolean> => {
    try {
      const bussinessName = user.people.bussinessName;
      user.people.identification = user.people.identification.toString();
      user.people.phone = user.people.phone.toString();
      user.people.bussinessName = bussinessName ? bussinessName : '';
      user.expirationDate = convertDateStringToIso(user.expirationDate || '');
      await api.updateUser(user);
      setIsReload((prev) => !prev);
      closeModlal(modalUpdateRef);
      return true;
    }
    catch (error) {
      console.error("Error al actualizar el usuario:", error);
      showError("Ocurrio un error al actualizar el usuario, vuelva a intentalor mas tarde");
      return false;
    }
  };

  const closeModlal = (ref : React.RefObject<HTMLDivElement | null > ) => {
    const modal = bootstrap.Modal.getInstance(ref.current);
    modal.hide();
  }

  useEffect(() => {
    if (!userId || userId === 0) return
    const loadUser = async () => {
      try {
        const user = await api.getUserById(userId);
        user.expirationDate = convertIsoDateToString(user.expirationDate ?? '');
        setUserById(user);
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        showError("Error al actualizar el usuario, vuelva a intentalor mas tarde");
      }
    };
    loadUser();
  }, [userId]);


  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-end">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter">
                  <li className="breadcrumb-item">
                    <a className="breadcrumb-link" href="javascript:;">
                      Pages
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a className="breadcrumb-link" href="javascript:;">
                      Mis archivos
                    </a>
                  </li>
                </ol>
              </nav>

              <h1 className="page-header-title">Usuarios</h1>
            </div>

            <div className="col-sm-auto">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#createUserModal"
              >
                <i className="bi-plus me-1"></i> Nuevo usuario
              </button>
            </div>
            {/*End Col */}
          </div>
          {/*End Row */}
        </div>
        {/*Tab Content */}

        <div className="row">
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Total users</h6>

                <div className="row align-items-center gx-2">
                  <div className="col">
                    <span className="js-counter display-4 text-dark">24</span>
                    <span className="text-body fs-5 ms-1">from 22</span>
                  </div>

                  <div className="col-auto">
                    <span className="badge bg-soft-success text-success p-1">
                      <i className="bi-graph-up"></i> 5.0%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Active members</h6>

                <div className="row align-items-center gx-2">
                  <div className="col">
                    <span className="js-counter display-4 text-dark">12</span>
                    <span className="text-body fs-5 ms-1">from 11</span>
                  </div>

                  <div className="col-auto">
                    <span className="badge bg-soft-success text-success p-1">
                      <i className="bi-graph-up"></i> 1.2%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">New/returning</h6>

                <div className="row align-items-center gx-2">
                  <div className="col">
                    <span className="js-counter display-4 text-dark">56</span>
                    <span className="display-4 text-dark">%</span>
                    <span className="text-body fs-5 ms-1">from 48.7</span>
                  </div>

                  <div className="col-auto">
                    <span className="badge bg-soft-danger text-danger p-1">
                      <i className="bi-graph-down"></i> 2.8%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Active members</h6>

                <div className="row align-items-center gx-2">
                  <div className="col">
                    <span className="js-counter display-4 text-dark">28.6</span>
                    <span className="display-4 text-dark">%</span>
                    <span className="text-body fs-5 ms-1">from 28.6%</span>
                  </div>

                  <div className="col-auto">
                    <span className="badge bg-soft-secondary text-secondary p-1">
                      0.0%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <UserTable onUpdateUserId={setUserId} isReload={isReload} />

        {/*End Tab Content */}
      </div>

      <CreateUserForm modalRef={modalCreateRef} onSubmit={handleCreateUser} />
      <EditUserForm user={userById} modalRef={modalUpdateRef} onSubmit={handleUpdateUser} />
      
     
    </>
  );
};
