import { chatService } from '../_services';

const state = {
    messageGroups: {}, // based on the selected chat room / user
}

const actions = {
    sendMessage({ commit }, request) {
        const { message, selectedChatRoom } = request
        console.log({ message, selectedChatRoom })
        commit('sendMessage', message, selectedChatRoom);
        chatService.sendMessage(message, selectedChatRoom)
            .then(
                message => commit('sendMessageSuccess', message),
                error => commit('sendMessageFailure', error)
            )
    }
}

const mutations = {
    sendMessage(state) {
        state.sendMessage = { loading: true }
    },
    sendMessageSuccess(state, message) {
        state.sendMessage = { message }
    },
    sendMessageFailure(state, error) {
        state.sendMessage = { error }
    },
}

export const chatMessages = {
    namespaced: true,
    state,
    actions,
    mutations
};