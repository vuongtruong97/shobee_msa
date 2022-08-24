import React from 'react'

import styles from './SwitchButton.module.scss'

function SwitchButton({ ...props }) {
    return (
        <div className={styles['switch__container']}>
            <input {...props} id='switch-flat' className={`${styles['switch']} ${styles['switch--flat']}`} type='checkbox' />
            <label htmlFor='switch-flat'></label>
        </div>
    )
}

export default SwitchButton
