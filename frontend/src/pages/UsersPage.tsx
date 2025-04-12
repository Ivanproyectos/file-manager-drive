import {
  UserTable,
  CreateUserForm,
  EditUserForm,
  UserCount,
} from '@/components'
import { useState, useEffect, useRef } from 'react'
import * as api from '@/api/users'
import { showError } from '@/utils/alerts'
import { CreateUser, UpdateUser, IUser } from '@/types'
import {
  convertDateStringToIso,
  convertIsoDateToString,
} from '@/utils/dateFormat'

declare const bootstrap: any

export const UsersPage = () => {
  const modalUpdateRef = useRef<HTMLDivElement | null>(null)
  const modalCreateRef = useRef<HTMLDivElement | null>(null)
  const [userId, setUserId] = useState(0)
  const [userById, setUserById] = useState<IUser | null>(null)
  const [refresh, setRefresh] = useState(false)
  const [users, setUsers] = useState<IUser[]>([])

  const handleCreateUser = async (user: CreateUser): Promise<boolean> => {
    try {
      const bussinessName = user.people.bussinessName
      user.people.identification = user.people.identification.toString()
      user.people.phone = user.people.phone.toString()
      user.people.bussinessName = bussinessName ? bussinessName : ''
      user.expirationDate = convertDateStringToIso(user.expirationDate) || null
      debugger
      await api.addUser(user)
      setRefresh((prev) => !prev)
      closeModlal(modalCreateRef)
      return true
    } catch (error) {
      console.error('Error al crear el usuario:', error)
      showError(
        'Ocurrio un error al crear el usuario, vuelva a intentalor mas tarde'
      )
      return false
    }
  }

  const handleUpdateUser = async (user: UpdateUser): Promise<boolean> => {
    try {
      const bussinessName = user.people.bussinessName
      user.people.identification = user.people.identification.toString()
      user.people.phone = user.people.phone.toString()
      user.people.bussinessName = bussinessName ? bussinessName : ''
      user.expirationDate = convertDateStringToIso(user.expirationDate) || null
      await api.updateUser(user)
      setRefresh((prev) => !prev)
      closeModlal(modalUpdateRef)
      return true
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
      showError(
        'Ocurrio un error al actualizar el usuario, vuelva a intentalor mas tarde'
      )
      return false
    }
  }
  const closeModlal = (ref: React.RefObject<HTMLDivElement | null>) => {
    const modal = bootstrap.Modal.getInstance(ref.current)
    modal.hide()
  }

  useEffect(() => {
    if (!userId || userId === 0) return
    const loadUser = async () => {
      try {
        debugger
        const user = await api.getUserById(userId)
        user.expirationDate = convertIsoDateToString(user.expirationDate ?? '')
        setUserById(user)
      } catch (error) {
        console.error('Error al actualizar el usuario:', error)
        showError(
          'Error al actualizar el usuario, vuelva a intentalor mas tarde'
        )
      }
    }
    loadUser()
  }, [userId])

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await api.getUsers()
        setUsers(users)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    loadUsers()
  }, [refresh])

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
          <UserCount users={users} />
        </div>

        <UserTable
          onUpdateUserId={setUserId}
          users={users}
          onReload={setRefresh}
        />

        {/*End Tab Content */}
      </div>

      <CreateUserForm modalRef={modalCreateRef} onSubmit={handleCreateUser} />
      <EditUserForm
        user={userById}
        modalRef={modalUpdateRef}
        onSubmit={handleUpdateUser}
      />
    </>
  )
}
