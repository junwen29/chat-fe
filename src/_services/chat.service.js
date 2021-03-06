import { authHeader } from '../_helpers';
import { userService } from './user.service';

const apiUrl = process.env.VUE_APP_API_BASE_URL;

export const chatService = {
    getChatRoomMessages, sendMessage, getChatRooms, getChatRoomWithSelectedUser
}

function getChatRoomWithSelectedUser(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${apiUrl}/chats/rooms?userId=${user.id}`, requestOptions).then(handleResponse);
}

async function getChatRooms() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        timeout: 3000
    };

    return await fetch(`${apiUrl}/chats/rooms`, requestOptions).then(handleResponse);
}

function getChatRoomMessages(chatRoomId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${apiUrl}/chats/rooms/${chatRoomId}/messages`, requestOptions).then(handleResponse);
}

function sendMessage(message, selectedChatRoom) {
    console.log({ message, selectedChatRoom })
    const chatRoomId = selectedChatRoom.id
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ message, chatRoomId })
    };

    return fetch(`${apiUrl}/chats/messages`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}