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
                title: `<span class="text--primary">${room.title}</span>`,
                subtitle: room.lastMessage,
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
}

export const chatRooms = {
    namespaced: true,
    state,
    actions,
    mutations
};