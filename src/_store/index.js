import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { websocket } from './websocket.module';
import { chat } from './chat.module';
import { chatMessages } from './chatMessages.module';
import { chatRooms } from './chatRooms.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        websocket,
        chat,
        chatMessages,
        chatRooms
    }
});