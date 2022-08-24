import React from 'react'
import { Outlet } from 'react-router-dom'

import AuthNav from './AuthNav'
import Footer from '../Footer/Footer'

function AuthLayout() {
    return (
        <>
            <AuthNav />
            <Outlet />
            <Footer />
        </>
    )
}

export default AuthLayout
