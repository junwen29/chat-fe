import { authHeader } from '../_helpers';
import { userService } from './user.service';

const apiUrl = process.env.VUE_APP_API_BASE_URL;

export const chatService = {
    getMessageGroups, sendMessage, getChatRooms, getChatRoomWithSelectedUser
}

function getChatRoomWithSelectedUser(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${apiUrl}/chats/rooms?userId=${user.id}`, requestOptions).then(handleResponse);
}

function getChatRooms() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${apiUrl}/chats/rooms`, requestOptions).then(handleResponse);
}

function getMessageGroups(selectedUser) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${apiUrl}/chats/rooms/${selectedUser.id}`, requestOptions).then(handleResponse);
}

function sendMessage(message, recipientId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, recipientId })
    };

    return fetch(`${apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse);
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