import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROLES } from 'constants/roles.constants'

function RequireAuth({ allowRoles = [ROLES.USER] }) {
    const location = useLocation()
    const userInfo = useSelector((state) => state.user.info)

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const isAllow = allowRoles.includes(userInfo.role)

    return isAllow ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate state={{ from: location }} replace to='/not-author' />
    ) : (
        isLoggedIn && <Navigate state={{ from: location }} replace to='/auth/login' />
    )
}

export default RequireAuth
