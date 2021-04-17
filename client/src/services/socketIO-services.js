import io from "socket.io-client";

export default class SocketIOServices {
	//212.22.70.92:3000
    socket = io('212.22.70.92:3000/', {transports: ['websocket'], upgrade: false});

    reconnectServer = () => {
		this.socket.on('reconnect', () => {
			console.log("user reconnect");
		});
    }

    sendDataMessage = (data) => {
        this.socket.emit('data_message', data);
    }

    receiveDataMessage = (setData) => {
        this.socket.on('data_message', function(msg){
            setData(msg);
        });
    }

    sendUrlMessage = (url) => {
        this.socket.emit('change_url', url);
    }

    changeUrlMessage = (setUrl) => {
        this.socket.on('change_url', function(url){
            setUrl(url);
        });
    }

    sendStatusMessage = (status) => {
        this.socket.emit('change_status', status);
    }

    changeStatusMessage = (setStatus) => {
        this.socket.on('change_status', function(status){
            setStatus(status);
        });
    }

    sendMessageText = (message) => {
        this.socket.emit('message', message);
    }

    sendUserData = (name) => {
        this.socket.emit('set_user_data', name);
    }

    receiveID = (setID) => {
        this.socket.on('set_id', function(id){
            setID(id);
        });
    }

    receiveMessageText = (setMessage) => {
        this.socket.on('message', function(message){
            setMessage(message);
        });
    }

    receiveUserList = (setUserList) => {
        this.socket.on('change_users', function(list){
            setUserList(list);
        });
    }

    receiveRoomList = (setRoomList) => {
        this.socket.on('change_rooms', function(list){
            setRoomList(list);
        });
    }

}