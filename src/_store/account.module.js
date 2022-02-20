import { userService } from '../_services';
import router from '../_helpers/router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });

        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    // connect to chat ms web socket
                    dispatch('websocket/connect', '', { root: true })
                    dispatch('chatRooms/getChatRooms', '', { root: true })
                    router.push('/chats');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ dispatch, commit }) {
        userService.logout();
        commit('logout');
        router.push('/login');
        setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Logout successful', { root: true });
            // disconnect to chat ms web socket
            dispatch('websocket/disconnect', '', { root: true })
            dispatch('chatMessages/clear', '', { root: true })
        })
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    console.log(error)
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
        console.log("user:", user)
    },
    registerSuccess(state, user) {
        state.status = {};
        console.log("user:", user)
    },
    registerFailure(state, error) {
        state.status = {};
        console.log("error:", error)
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};