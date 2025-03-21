import { useEffect, useState } from "react"
import { getUsers } from "@/api/users"
import { IUserSummary } from "@/types"

declare const HSFormSearch: any
declare const HSGoTo: any
declare const HSCore: any

interface SearchUserProps {
  onSelectedUser: (user: IUserSummary) => void
}

export const SearchUser = ({ onSelectedUser }: SearchUserProps) => {
  const [users, setUsers] = useState<IUserSummary[]>([]);

    useEffect(() => {
        HSCore.components.HSList.init('#docsSearch');
        new HSGoTo('.js-go-to')
        new HSFormSearch('.js-form-search')
    })

    useEffect(() => {

      const loadUsers = async () => {
        try {
          const users = await getUsers();
          setUsers(users);
          console.log(users);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
         // setLoading(false);
        }
      }
      loadUsers();
        
    }, []);


  const handleSelectedUser = (user: IUserSummary) => {
    onSelectedUser(user)
  }

  return (
<div className="position-relative z-index-2">

  <div className="mb-4">
    <div className="input-group input-group-merge">
      <input type="text" className="js-form-search form-control" placeholder="Buscar por nombre o correo..."
             data-hs-form-search-options='{
               "clearIcon": "#clearIconMenuEg",
               "defaultIcon": "#defaultIconMenuEg",
               "dropMenuElement": "#dropMenuEg",
               "dropMenuOffset": 20
             }' />
      <button type="button" className="input-group-append input-group-text">
        <i id="clearIconMenuEg" className="bi-x-lg" style={{ display: "none" }}></i>
        <i id="defaultIconMenuEg" className="bi-search" style={{ display: "none" }}></i>
      </button>
    </div>
  </div>

  <div id="dropMenuEg" className="hs-form-search-menu-content dropdown-menu dropdown-menu-form-search navbar-dropdown-menu-borderless">
  
    <div className="card-body-height">

      <span className="dropdown-header">Usuarios</span>
      {
        users.map((user) => (
          <a className="dropdown-item" href="javascript:;" onClick={() => handleSelectedUser(user)} key={user.id}>
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <img className="avatar avatar-xs avatar-circle" src="../assets/img/160x160/img10.jpg" alt="Image Description" />
            </div>
            <div className="flex-grow-1 text-truncate ms-2">
              <span>{user.name} <i className="bi-patch-check-fill text-primary" data-toggle="tooltip" data-placement="top" title="Top endorsed"></i></span>
            </div>
          </div>
        </a>
      ))
      }
     

   {/*    <a className="dropdown-item" href="../index.html">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <img className="avatar avatar-xs avatar-circle" src="../assets/img/160x160/img3.jpg" alt="Image Description" />
          </div>
          <div className="flex-grow-1 text-truncate ms-2">
            <span>David Harrison</span>
          </div>
        </div>
      </a>

      <a className="dropdown-item" href="../index.html">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className="avatar avatar-xs avatar-soft-info avatar-circle">
              <span className="avatar-initials">A</span>
            </div>
          </div>
          <div className="flex-grow-1 text-truncate ms-2">
            <span>Anne Richard</span>
          </div>
        </div>
      </a> */}

    </div>
  
  {/*   <a className="card-footer text-center" href="../index.html">
      See all results <i className="bi-chevron-right small"></i>
    </a> */}
  
  </div>
  
</div>
  )
}
