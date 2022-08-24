import React from 'react'

import './LoadingSpinner.scss'

function LoadingSpinner() {
    return (
        <div
            style={{
                position: 'fixed',
                inset: '0 0 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                zIndex: '996',
            }}
        >
            <div className='loader'></div>
        </div>
    )
}

export default LoadingSpinner
