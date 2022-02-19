import { chatService } from '../_services';

const state = {
    isSearchingUsers: false,
    selectedUser: null,
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
        dispatch('chatRooms/getChatRoomWithSelectedUser', user, { root: true });
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
}

export const chat = {
    namespaced: true,
    state,
    actions,
    mutations
};