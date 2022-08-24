import React from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { default as Rting } from 'react-rating'

function Rating(props) {
    return (
        <Rting
            {...props}
            emptySymbol={
                <div style={{ color: 'var(--primary)' }}>
                    <BsStar />
                </div>
            }
            fullSymbol={
                <div style={{ color: 'var(--primary)' }}>
                    <BsStarFill />
                </div>
            }
        />
    )
}

export default Rating
