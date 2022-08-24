import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './User.module.scss'
import ProfileSideBar from './ProfileSideBar/ProfileSideBar'

function User() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col col-0 sm-0 md-3 lg-3 xl-3'>
                    <ProfileSideBar />
                </div>
                <div className='col col-12 sm-12 md-9 lg-9 xl-9'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default User
