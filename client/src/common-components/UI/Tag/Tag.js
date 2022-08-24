import React from 'react'
import styles from './Tag.module.scss'

function Tag({ children, ...props }) {
    return <div className={styles.tag}>{children}</div>
}

export default Tag
