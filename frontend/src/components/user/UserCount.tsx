import { IUser } from '@/types'
import { useState, useEffect } from 'react'

interface Props {
  users: IUser[]
}

export const UserCount = ({ users }: Props) => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [disabledUsers, setDisabledUsers] = useState(0)
  const [expiresUsers, setExpiresUsers] = useState(0)

  useEffect(() => {
    setTotalUsers(users.length)
    setActiveUsers(users.filter((user) => user.status).length)
    setDisabledUsers(users.filter((user) => !user.status).length)
    setExpiresUsers(users.filter((user) => user.isExpired).length)
  }, [users])

  return (
    <>
      <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
        <div className="card h-100">
          <div className="card-body">
            <h6 className="card-subtitle mb-2">Total de usuarios</h6>

            <div className="row align-items-center gx-2">
              <div className="col">
                <span className="js-counter display-4 text-dark">
                  {totalUsers}
                </span>
              </div>

              <div className="col-auto">
                <span className="badge bg-soft-secondary text-secondary p-1 fs-1">
                  <i className="bi-person"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
        <div className="card h-100">
          <div className="card-body">
            <h6 className="card-subtitle mb-2">Total activos</h6>

            <div className="row align-items-center gx-2">
              <div className="col">
                <span className="js-counter display-4 text-dark">
                  {activeUsers}
                </span>
                <span className="text-body fs-5 ms-1">de {totalUsers}</span>
              </div>

              <div className="col-auto">
                <span className="badge bg-soft-success text-success p-1 fs-1">
                  <i className="bi-person"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
        <div className="card h-100">
          <div className="card-body">
            <h6 className="card-subtitle mb-2">Total inactivos</h6>

            <div className="row align-items-center gx-2">
              <div className="col">
                <span className="js-counter display-4 text-dark">
                  {disabledUsers}
                </span>
                <span className="text-body fs-5 ms-1">de {totalUsers}</span>
              </div>

              <div className="col-auto">
                <span className="badge bg-soft-warning text-warning p-1 fs-1">
                  <i className="bi-person"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
        <div className="card h-100">
          <div className="card-body">
            <h6 className="card-subtitle mb-2">Total expirados</h6>

            <div className="row align-items-center gx-2">
              <div className="col">
                <span className="js-counter display-4 text-dark">
                  {expiresUsers}
                </span>
                <span className="text-body fs-5 ms-1">de {totalUsers}</span>
              </div>

              <div className="col-auto">
                <span className="badge bg-soft-danger text-danger p-1 fs-1">
                  <i className="bi-person"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
