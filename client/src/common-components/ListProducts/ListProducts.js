import React from 'react'

import styles from './ListProducts.module.scss'

import ProductItem from './ProductItem'
import SortBar from './SortBar'

import SmallSpinner from 'common-components/UI/LoadingSpinner/SmallSpinner'

function ListProducts({ listProducts, onFilter, onLoad, sortBar, ...props }) {
    return (
        <div className={styles.ListProducts}>
            {onLoad && <SmallSpinner />}

            {!onLoad && (
                <>
                    {sortBar && <SortBar onFilter={onFilter} />}
                    <div className='row'>
                        {listProducts.map((prod) => (
                            <ProductItem key={prod.id} data={prod} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ListProducts
