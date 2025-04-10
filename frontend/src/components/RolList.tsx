import { useEffect, useState } from 'react'
import { RoleId } from '@/types';

const roles = [
    {
        id: RoleId.ADMIN,
        icon: "bi bi-shield-lock-fill",
        name: "administrador",
        description : "Permisos para gestionar todos los archivos"
    },
    {
        id: RoleId.USER,
        icon: "bi bi-person",
        name: "Usuario",
        description : "Permisos para ver solo archvios asignados"
    }
]
interface Props {
    onSelected: (selectedRoles: RoleId[]) => void
    selectedRoles?: RoleId[]
}
export const RolList = ({ onSelected, selectedRoles }: Props) => {
    const [selectedIds, setSelectedIds] = useState<RoleId[] >(selectedRoles ?? []);

    useEffect(() => {
        setSelectedIds(selectedRoles || []);
    }, [selectedRoles]);

    const handleSelectedRole = (id: RoleId) => {
        let newSelectedIds = [];
        if (selectedIds.includes(id)) {
            newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
        } else {
            newSelectedIds = [...selectedIds, id];
        }
        setSelectedIds(newSelectedIds);
        onSelected(newSelectedIds);
    }

    return (
        <div className="list-group list-group-lg list-group-flush list-group-no-gutters">

            {roles.map(role => (
                  <div className="list-group-item" key={role.id}>
                  <div className="d-flex">
                      <div className="flex-shrink-0">
                          <i className={`${role.icon} fs-2`}></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                          <div className="row align-items-center">
                              <div className="col">
                                  <h4 className="mb-0">{role.name}</h4>
                                  <p className="fs-5 text-body mb-0">{role.description}</p>
                              </div>
                              <div className="col-auto">
                                  <div className="form-check form-switch">
                                      <input className="form-check-input"
                                      onChange={() => handleSelectedRole(role.id)}
                                      name='role' 
                                      value={role.id} 
                                      type="checkbox" 
                                      checked={selectedIds.includes(role.id)}
                                      id={`input-role-${role.id}`} />
                                      <label className="form-check-label" htmlFor={`input-role-${role.id}`}></label>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
  
            ))}

        </div>
    )
}
