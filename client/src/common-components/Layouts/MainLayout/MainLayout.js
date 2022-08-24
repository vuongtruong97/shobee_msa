import React from 'react'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'

import Header from './Header/Header'
import Footer from '../Footer/Footer'

const MiniChat = React.lazy(() => import('common-components/MiniChat/MiniChat'))

function MainLayout() {
    return (
        <>
            <Header />
            <main className={styles.wrap}>
                <Outlet />
            </main>
            <Footer />
            <MiniChat />
        </>
    )
}

export default MainLayout
