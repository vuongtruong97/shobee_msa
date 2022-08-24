import React from 'react'
import { Transition } from 'react-transition-group'
import styles from './PopOver.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const duration = 150

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
}

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, transform: 'scale(0)' },
}

function PopOver({ children = 'Pop Over', right, show, ...props }) {
    return (
        <Transition mountOnEnter={true} unmountOnExit={true} in={show} timeout={duration}>
            {(state) => (
                <div
                    style={{ ...defaultStyle, ...transitionStyles[state] }}
                    className={cx('popover', { right: right })}
                >
                    <div className={styles.content}>{children}</div>
                </div>
            )}
        </Transition>
    )
}

export default PopOver
