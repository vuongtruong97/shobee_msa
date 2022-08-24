import React from 'react'

function WrapStyle({ children, ...props }) {
    return (
        <div
            style={{
                backgroundColor: '#fff',
                marginBottom: '2rem',
                padding: '2rem',
                borderRadius: '.3rem',
                boxShadow: ' 0 1px 1px 0 rgb(0 0 0 / 5%)',
            }}
            {...props}
            className='row'
        >
            {children}
        </div>
    )
}

export default WrapStyle
