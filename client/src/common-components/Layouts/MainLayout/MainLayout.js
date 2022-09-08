import React from 'react'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './Header/Header'
import Footer from '../Footer/Footer'

const MiniChat = React.lazy(() => import('common-components/MiniChat/MiniChat'))

function MainLayout() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    console.log(isLoggedIn)
    return (
        <>
            <Header />
            <main className={styles.wrap}>
                <Outlet />
            </main>
            <Footer />
            {isLoggedIn && <MiniChat />}
        </>
    )
}

export default MainLayout
