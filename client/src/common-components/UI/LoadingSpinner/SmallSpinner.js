import React from 'react'
import styles from './SmallSpinner.module.scss'

function SmallSpinner() {
    return (
        <div className={styles.wrap}>
            <div className={styles.spinner}></div>
        </div>
    )
}

export default SmallSpinner
