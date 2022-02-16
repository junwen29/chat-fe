import { chatService } from '../_services';
import { createChatRoomsGroup } from "../_mock";

const state = {
    isSearchingUsers: false,
    selectedUser: null,
    selectedChatRoom: {},
    chatRooms: createChatRoomsGroup("Today"),
    messageGroups: {}, // based on the selected chat room / user
}

const actions = {
    clickedNewChatButton({ dispatch, commit }) {
        commit('clickedNewChatButton')
        dispatch('users/getAll', null, { root: true });
    },

    clickedBackButton({ commit }) {
        commit('clickedBackButton')
    },

    setSelectedUser({ dispatch, commit }, user) {
        commit('setSelectedUser', user);
        dispatch('chat/getChatRoomWithSelectedUser', user, { root: true });
    },

    getMessageGroups({ commit }, selectedUser) {
        commit('getMessageGroups');

        // selected user should not be null here. 
        chatService.getMessageGroups(selectedUser)
            .then(
                messageGroups => commit('getMessageGroupsSuccess', messageGroups),
                error => commit('getMessageGroupsFailure', error)
            );
    },

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
        console.log(user);

        // selected user should not be null here. 
        chatService.getChatRoomWithSelectedUser(user)
            .then(
                // there should only be 1 chat room returned
                chatRooms => commit('getChatRoomWithSelectedUserSuccess', chatRooms[0]),
                error => commit('getChatRoomWithSelectedUserFailure', error)
            );
    }
}

const mutations = {
    clickedNewChatButton(state) {
        state.isSearchingUsers = true;
    },

    clickedBackButton(state) {
        state.isSearchingUsers = false;
    },

    setSelectedUser(state, user) {
        state.selectedUser = user;
        state.isSearchingUsers = false; // set this to reset left column navigation
    },

    getMessageGroups(state) {
        state.messageGroups = { loading: true };
    },

    getMessageGroupsSuccess(state, messageGroups) {
        state.all = {
            items: messageGroups
        };
    },

    getMessageGroupsFailure(state, error) {
        state.messageGroups = { error };
    },

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
    }
}

export const chat = {
    namespaced: true,
    state,
    actions,
    mutations
};