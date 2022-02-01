import { jwtQueryString } from '../_helpers';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { store } from '../_store';

const apiUrl = process.env.VUE_APP_WEB_SOCKET_SESSIONS_URL; 
const subscribedTopic = process.env.VUE_APP_WEB_SOCKET_SUBSCRIBED_TOPIC;

export const websocketService = {
    connect, disconnect
};

async function connect() {
    return new Promise((resolve) => {
        // GET request using fetch with error handling + put the jwt in a query string. E.g.'http://localhost/ws?token=AAA'
        this.socket = new SockJS(apiUrl + jwtQueryString());
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect(
            {},
            (frame) => {
                console.log(frame);
                this.stompClient.subscribe(subscribedTopic, (tick) => {
                    console.log(tick);
                    this.received_messages.push(JSON.parse(tick.body).content);
                });
            },
            // if disconnected halfway, this callback will also trigger
            (error) => {
                console.log(error);
                store.dispatch('websocket/failure')
            }
        );
        resolve()
    });


}

async function disconnect() {
    return new Promise((resolve, reject) => {
        if (this.stompClient) {
            this.stompClient.disconnect()
            resolve();
        }
        else {
            reject("No stomp client.")
        }
    })
}