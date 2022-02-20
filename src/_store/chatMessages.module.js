import { chatService } from '../_services';
import { showTodayYesterdayAndDayName } from '../_helpers';

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
                    // reload the chat rooms after sending message
                    dispatch('chatRooms/getChatRooms', '', { root: true })
                    // reload the selected chat room's messages after sending message
                    console.log(selectedChatRoom)
                    dispatch('chatMessages/getChatRoomMessages', selectedChatRoom.id, { root: true })
                },
                error => commit('sendMessageFailure', error)
            )
    },
    getChatRoomMessages({ commit }, chatRoomId) {
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
        // parse the message groups from backend and transform accordingly
        const transformed = messageGroups.map(mg => {
            return ({
                date: showTodayYesterdayAndDayName(mg.date),
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

        // add a hidden element for scroll into view later when chat room re-renders after loading recent messsage groups
        let transformedWithHiddenBottomElement = [...transformed, { messages: [{ bottom: true }] }]

        state.selectedChatRoomMessages = {
            messageGroups: transformedWithHiddenBottomElement
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