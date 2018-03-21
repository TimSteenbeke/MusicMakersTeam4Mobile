import React from 'react';
import { Button,View, Text,StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {AsyncStorage} from 'react-native';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


const serverUrl = 'https://musicmaker-api-team4.herokuapp.com/socket';
// const serverUrl = 'http://localhost:8080/socket';
const currentUser = AsyncStorage.getItem('currentUser');

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'WebSockets chat',
            text: "",
            chatroom: 'Poef',
            messages: ["Welcome to chatroom Poef", "Tim: Hello there", "Jos: jo test"],
            message: "Hello world !",
            name: currentUser.firstname
        };
        this.stompClient = null;
    }

    componentDidMount() {
        this.initializeWebSocketConnection();
    }

    ChangeRoom() {
        let self = this;
        self.setState({
            messages: ["Welcome to Chatroom " + self.state.chatroom]
        });
        this.initializeWebSocketConnection();
    }

    initializeWebSocketConnection() {
        const self = this;
        const ws = new SockJS(serverUrl);
        self.stompClient = Stomp.over(ws);
        console.log("initializeWebSocketConnection");
        console.log(ws);
        self.stompClient.connect({}, () => {
            self.stompClient.subscribe('/chat/' + self.state.chatroom, (message) => {
                console.log("msg");
                console.log(message);
                if (message.body) {
                    self.setState({messages: [...self.state.messages, message.body]});
                    console.log(message.body);
                }
            });
        });
        console.log("init is done");
    }

    sendMessage() {
        let name = this.state.name;
        let content = this.state.message;
        let message = name + ': ' + content;
        this.stompClient.send('/chat/' + this.state.chatroom, {}, message);
        this.setState({message: ''});
    }

    render() {
        return (
            <View>
                {this.state.messages.map((msg, key) => {
                        return (<Text id={key}>{msg}</Text>)
                    }
                )}
            </View>
        )
    }
}