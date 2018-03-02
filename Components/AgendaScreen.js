import React, {Component} from 'react';
import { Text, View,FlatList,Header,Left,Icon,Body,Title,Right,Container,Content,StyleSheet} from 'native-base';
import stl from '../Css/stylesheet';


export default class AgendaScreen extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <Header style={stl.header}>
                    <Body style={stl.headerstyle}>
                    <Title>Agenda</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.content} >
                    <Text>Hoi</Text>
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
