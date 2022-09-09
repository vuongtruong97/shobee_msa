import React, { useState } from 'react'
import styles from './SortBar.module.scss'

import { Transition } from 'react-transition-group'
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const duration = 300
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
}

function SortBar({ onFilter }) {
    const [showPriceOptions, setShowPriceOptions] = useState(false)

    const handleShowPriceFilter = () => {
        setShowPriceOptions(true)
    }
    const handleHidePriceFilter = () => {
        setShowPriceOptions(false)
    }

    const handleSetFilter = (value) => {
        onFilter(value)
    }
    return (
        <div className={styles.sortBar}>
            <span className={styles.label}>Sắp xếp theo</span>
            <div className={styles.sortOptions}>
                <div
                    onClick={() => {
                        onFilter({ sort: 'pop' })
                    }}
                    className={styles.option}
                >
                    Phổ biến
                </div>
                <div
                    onClick={() => {
                        onFilter({ sortBy: 'sold', order: '-1' })
                    }}
                    className={styles.option}
                >
                    Bán chạy
                </div>
                <div
                    onClick={() => {
                        onFilter({ sortBy: 'createdAt', order: '-1' })
                    }}
                    className={styles.option}
                >
                    Mới nhất
                </div>
                <div
                    onMouseEnter={handleShowPriceFilter}
                    onMouseLeave={handleHidePriceFilter}
                    className={`${styles.option} ${styles.priceOptions}`}
                >
                    <span>Giá</span>
                    <span>
                        <IoIosArrowDown />
                    </span>

                    <Transition
                        mountOnEnter
                        unmountOnExit
                        in={showPriceOptions}
                        timeout={duration}
                    >
                        {(state) => (
                            <div
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state],
                                }}
                                className={styles.list}
                            >
                                <div
                                    onClick={() => {
                                        onFilter({ sortBy: 'price', order: '1' })
                                    }}
                                    className={styles.priceOption}
                                >
                                    giá thấp đến cao
                                </div>
                                <div
                                    onClick={() => {
                                        onFilter({ sortBy: 'price', order: '-1' })
                                    }}
                                    className={styles.priceOption}
                                >
                                    giá cao đến thấp
                                </div>
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
            <div className={styles.miniPaging}>
                <div className={styles.pageState}>{`${1}/${50}`}</div>
                <div className={`${styles.pageControl} ${styles.prev}`}>
                    <IoIosArrowBack />
                </div>
                <div className={styles.pageControl}>
                    <IoIosArrowForward />
                </div>
            </div>
        </div>
    )
}

export default SortBar
