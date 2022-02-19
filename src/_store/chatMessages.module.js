import { chatService } from '../_services';

const state = {
    selectedChatRoomMessages: {}, // based on the selected chat room / user
}

const actions = {
    sendMessage({ commit, dispatch }, request) {
        const { message, selectedChatRoom } = request

        commit('sendMessage', message, selectedChatRoom);

        chatService.sendMessage(message, selectedChatRoom)
            .then(
                message => {
                    commit('sendMessageSuccess', message)
                    dispatch('chatRooms/getChatRooms', '', { root: true }) // reload the chat rooms after sending message
                },
                error => commit('sendMessageFailure', error)
            )
    },
    getChatRoomMessage({ commit }, chatRoomId) {
        commit('getChatRoomMessages');

        chatService.getChatRoomMessages(chatRoomId)
            .then(
                message => {
                    commit('getChatRoomMessagesSuccess', message)
                },
                error => commit('getChatRoomMessagesFailure', error)
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
    getChatRoomMessages(state) {
        state.selectedChatRoomMessages = { loading: true }
    },
    getChatRoomMessagesSuccess(state, messageGroups) {
        state.selectedChatRoomMessages = {
            messageGroups: messageGroups.map(mg => {
                return ({
                    date: mg.date,
                    messages: mg.messages.map(m => {
                        return ({
                            id: m.id,
                            content: m.content,
                            time: m.createdAt,
                            avatar: m.avatar,
                            from: m.from
                        })
                    })
                })
            })
        }
    },
    getChatRoomMessagesFailure(state, error) {
        state.selectedChatRoomMessages = { error }
    },
}

export const chatMessages = {
    namespaced: true,
    state,
    actions,
    mutations
};