import { useEffect, useState } from "react";
import { getUsersSummary } from "@/api/users";
import { IUserSummary } from "@/types";
import { createAvatarHTML } from "@/utils/generateAvatarGroup";

declare const HSFormSearch: any;
declare const HSGoTo: any;
declare const HSCore: any;

interface SearchUserProps {
  onSelectedUser: (user: IUserSummary) => void;
}

export const SearchUser = ({ onSelectedUser }: SearchUserProps) => {
  const [users, setUsers] = useState<IUserSummary[]>([]);

  useEffect(() => {
    HSCore.components.HSList.init("#docsSearch");
    new HSGoTo(".js-go-to");
    new HSFormSearch(".js-form-search");
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsersSummary();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleSelectedUser = (user: IUserSummary) => {
    onSelectedUser(user);
  };

  return (
    <div className="position-relative z-index-2">
      <div className="mb-4">
        <div className="input-group input-group-merge">
          <input
            type="text"
            className="js-form-search form-control"
            placeholder="Buscar por nombre o correo..."
            data-hs-form-search-options='{
               "clearIcon": "#clearIconMenuEg",
               "defaultIcon": "#defaultIconMenuEg",
               "dropMenuElement": "#dropMenuEg",
               "dropMenuOffset": 20
             }'
          />
          <button type="button" className="input-group-append input-group-text">
            <i
              id="clearIconMenuEg"
              className="bi-x-lg"
              style={{ display: "none" }}
            ></i>
            <i
              id="defaultIconMenuEg"
              className="bi-search"
              style={{ display: "none" }}
            ></i>
          </button>
        </div>
      </div>

      <div
        id="dropMenuEg"
        className="hs-form-search-menu-content dropdown-menu dropdown-menu-form-search navbar-dropdown-menu-borderless"
      >
        <div className="card-body-height">
          <span className="dropdown-header">Usuarios</span>
          {users.map((user) => (
            <a
              className="dropdown-item"
              href="javascript:;"
              onClick={() => handleSelectedUser(user)}
              key={user.id}
            >
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  {/*  <img className="avatar avatar-xs avatar-circle" src="../assets/img/160x160/img10.jpg" alt="Image Description" /> */}

                  <span className="avatar avatar-soft-primary avatar-circle">
                    <span className="avatar-initials">
                      {user.name.charAt(0)}
                    </span>
                  </span>
                </div>
                <div className="flex-grow-1 text-truncate ms-2">
                  <span>{user.name} </span>
                </div>
              </div>
            </a>
          ))}

    
        </div>

      </div>
    </div>
  );
};
