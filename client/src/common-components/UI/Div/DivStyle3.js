import React from 'react'
import styles from './DivStyle3.module.scss'

function DivStyle3({ children, ...props }) {
    return (
        <div {...props} className={styles.style3}>
            {children}
        </div>
    )
}

export default DivStyle3
