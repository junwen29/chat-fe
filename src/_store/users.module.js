import { userService } from '../_services';
import _ from 'lodash';

const state = {
    all: {},
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        userService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)

            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id)
            .then(
                () => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    },
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        let arr = [];
        const d = ({ divider: true, inset: true });

        // process backend data and add divider items
        _.each(users, (u) => {
            const u1 = ({
                id: u.id,
                avatar: u.avatarUrl,
                title: u.title,
                subtitle: JSON.parse(u.online) ? '<span class="blue--text text--lighten-1">Online</span>' : u.lastSeen,
                initials: u.initials
            });
            arr = _.concat(arr, u1, d)
        });

        state.all = {
            items: arr
        };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                console.log("deleting:", deleting)
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};