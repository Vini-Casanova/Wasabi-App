import { Navigate, Outlet } from 'react-router-dom'
import { useLocalStorage } from '../utils/useLocalStorage'

export const PrivateRoute = ({ children }: any) => {
  const [user] = useLocalStorage('user', {})

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />
  }

  return children || <Outlet />
}
