import { websocketService } from '../_services';

const state = {
    isConnecting: false,
    isConnected: false
}

const actions = {
    connect({ dispatch, commit },) {
        commit('connectRequest');

        websocketService.connect()
            .then(
                () => {
                    commit('connectSuccess');
                },
                error => {
                    commit('connectFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    disconnect({ dispatch, commit }) {
        websocketService.disconnect();
        commit('disconnect');
        dispatch('alert/error', 'Web socket connection disconnected', { root: true });
    },
    failure({ dispatch, commit }) {
        commit('connectFailure');
        dispatch('alert/error', 'Web socket connection failed', { root: true });
    }
}

const mutations = {
    connectRequest(state) {
        state.isConnecting = true;
        console.log(state.isConnecting)
    },
    connectSuccess(state) {
        state.isConnecting = false;
        state.isConnected = true;
    },
    connectFailure(state) {
        state.isConnecting = false;
        state.isConnected = false;
    },
    disconnect(state) {
        state.isConnecting = false;
        state.isConnected = false;
    },

}

export const websocket = {
    namespaced: true,
    state,
    actions,
    mutations
};