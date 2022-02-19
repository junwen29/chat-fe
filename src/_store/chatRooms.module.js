import { chatService } from '../_services';
import { createChatRoomsGroup } from "../_mock";
import _ from 'lodash';

const state = {
    selectedChatRoom: {},
    chatRooms: createChatRoomsGroup("Today"),
}

const actions = {
    getChatRooms({ commit }) {
        commit('getChatRooms');

        // selected user should not be null here. 
        chatService.getChatRooms()
            .then(
                chatRooms => commit('getChatRoomsSuccess', chatRooms),
                error => commit('getChatRoomsFailure', error)
            );
    },

    getChatRoomWithSelectedUser({ commit }, user) {
        commit('getChatRoomWithSelectedUser');

        // selected user should not be null here. 
        chatService.getChatRoomWithSelectedUser(user)
            .then(
                // there should only be 1 chat room returned
                chatRooms => commit('getChatRoomWithSelectedUserSuccess', chatRooms[0]),
                error => commit('getChatRoomWithSelectedUserFailure', error)
            );
    },

    selectChatRoom({ commit, dispatch }, chatRoom) {
        commit('selectChatRoom', chatRoom);
        
        // download the selected chat room messages after selecting the chat room
        dispatch('chatMessages/getChatRoomMessage', chatRoom.id, { root: true })
    }
}

const mutations = {
    getChatRooms(state) {
        state.chatRooms = { loading: true };
    },

    // transform results from backend and add headers/dividers accordingly
    getChatRoomsSuccess(state, chatRooms) {
        let arr = [];
        const d = ({ divider: true, inset: true });

        _.each(chatRooms, (room, index) => {
            const r1 = ({
                id: room.id,
                avatar: `https://cdn.vuetifyjs.com/images/lists/${++index}.jpg`,
                title: room.title && `<h4>${room.title}</h4>`,
                subtitle: room.lastMessage && `<span class="text--primary">${room.lastMessage}</span>`,
                time: room.lastMessageAt,
                unreadMessageCount: 8
            });
            arr = _.concat(arr, r1, d)
        });

        state.chatRooms = {
            items: arr
        };
    },

    getChatRoomsFailure(state, error) {
        state.chatRooms = { error };
    },

    // after clicking and selecting the user,
    // get the chat room associated with the selected user 
    // and set it as selected chat room
    getChatRoomWithSelectedUser(state) {
        state.selectedChatRoom = {
            loading: true
        }
    },

    getChatRoomWithSelectedUserSuccess(state, chatRoom) {
        state.selectedChatRoom = { chatRoom };
    },

    getChatRoomWithSelectedUserFailure(state, error) {
        state.selectedChatRoom = { error };
    },

    selectChatRoom(state, chatRoom) {
        state.selectedChatRoom = { chatRoom }
    }
}

export const chatRooms = {
    namespaced: true,
    state,
    actions,
    mutations
};