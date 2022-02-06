import { chatService } from '../_services';

const state = {
    isSearchingUsers: false,
    selectedUser: null,
    chatRooms: [
        { header: "Today" },
        {
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            title: "Brunch this weekend?",
            subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
            avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
            avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
            title: "Oui oui",
            subtitle:
                '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
            avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
            title: "Birthday gift",
            subtitle:
                '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
            avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            title: "Recipe to try",
            subtitle:
                '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
    ],
    messageGroups: {}, // based on the selected chat room / user
}

const actions = {
    clickedNewChatButton({ dispatch, commit }) {
        commit('clickedNewChatButton')
        dispatch('users/getAll', '', { root: true });
    },

    clickedBackButton({ commit }) {
        commit('clickedBackButton')
    },

    setSelectedUser({ commit }, user) {
        commit('setSelectedUser', user);
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