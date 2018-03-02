import React, {Component} from 'react';
import { Text, View,FlatList,Header,Left,Icon,Body,Title,Right,Container,Content,StyleSheet,Tabs,Tab} from 'native-base';
import stl from '../../Css/stylesheet';

export default  class ChatScreenDetails extends React.Component{
    render() { // eslint-disable-line
        return (
            <Container style={styles.container}>
                <Header style={stl.header}>
                    <Body style={stl.headerstyle}>
                    <Title>ChatdetailScreen</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.content} >
                    <Text>Chatdetail</Text>
                </Content>
            </Container>
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