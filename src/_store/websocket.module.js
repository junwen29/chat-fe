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
    disconnect({ commit }) {
        websocketService.disconnect();
        commit('disconnect');
    },
    failure({ commit }){
        commit('connectFailure');
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