import React, {Component} from 'react';
import { Text, View,FlatList,Header,Left,Icon,Body,Title,Right,Container,Content,StyleSheet,Tabs,Tab} from 'native-base';
import stl from '../Css/stylesheet';
import PrivateChat from "./Chat/PrivateChat";
import Groupchat from "./Chat/GroupChat";
import Testchat from './TestChat';

export default class ChatScreen extends React.Component {
    render(){
        return(
<Testchat/>
        )
    }
}

const styles = {
    container: {

    },
    header: {
        paddingRight: 15,
        paddingLeft: 15
    },
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center"
    }
};