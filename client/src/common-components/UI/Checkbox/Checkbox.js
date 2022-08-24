import React from 'react'
import styles from './Checkbox.module.scss'

function Checkbox({ id = Math.random(), ...props }, ref) {
    return (
        <div className={styles.checkbox}>
            <input ref={ref} {...props} id={id} type='checkbox' />
            <label htmlFor={id}></label>
        </div>
    )
}

export default React.forwardRef(Checkbox)
