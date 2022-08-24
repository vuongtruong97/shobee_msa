import React from 'react'
import { ToastContainer as Toast } from 'react-toastify'
import { Slide } from 'react-toastify'

function ToastContainer() {
    return <Toast autoClose={3000} transition={Slide} hideProgressBar pauseOnHover={false} />
}

export default ToastContainer
