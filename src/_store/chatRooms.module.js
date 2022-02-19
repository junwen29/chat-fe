import { chatService } from '../_services';
import { createChatRoomsGroup } from "../_mock";

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
                error => commit('getMessageGroupsFailure', error)
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
        state.chatRooms1 = { loading: true };
    },

    getChatRoomsSuccess(state, chatRooms) {
        state.chatRooms1 = {
            items: chatRooms
        };
    },

    getChatRoomsFailure(state, error) {
        state.chatRooms1 = { error };
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