import axiosClient from '../axiosClient'
import CHAT_API from './api-url'

const chatAPI = {
    getConversations() {
        const url = CHAT_API.GET_CONVERSATION
        return axiosClient.get(url)
    },
    createConversations(payload) {
        const url = CHAT_API.CREATE_CONVERSATION
        return axiosClient.post(url, payload)
    },
    getMessages(convId) {
        const url = CHAT_API.GET_MESSAGES + '/' + convId
        return axiosClient.get(url)
    },
    sendMessage(msg) {
        const url = CHAT_API.SEND_MESSAGE
        return axiosClient.post(url, msg)
    },
    getListChat() {
        const url = CHAT_API.GET_LIST_CHAT
        return axiosClient.get(url)
    },
}

export default chatAPI
