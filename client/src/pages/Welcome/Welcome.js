import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Wellcome() {
    const navigate = useNavigate()
    const navigateHandler = () => {
        // use when finish fetch api
        // navigate(-1,-2,-3,...) // go backward
        // navigate(+1) // go foward
        navigate('/dashboard', { replace: true })
    }
    return (
        <div className='container'>
            <div className='row'></div>
            <button onClick={navigateHandler}>useNavigate to Dashboard</button>
            <h1>Wellcome</h1>
            <Link to='new-user'>Link To Show Nested Route New User</Link>
            <Outlet />
        </div>
    )
}

export default Wellcome
