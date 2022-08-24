import { toast } from 'react-toastify'

function toastPromise(fetch, loadingMess) {
    return toast.promise(fetch, {
        pending: {
            render() {
                return loadingMess
            },
            icon: false,
        },
        success: {
            render({ data }) {
                return data.data.message
            },
            icon: '😉',
        },
        error: {
            render({ data }) {
                return data.message
            },
            icon: '🤦‍♀️',
        },
    })
}

export default toastPromise
