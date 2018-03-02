import React, {Component} from 'react';
import stl from '../Css/stylesheet';
import { AppRegistry, StyleSheet, Modal, Image, Platform } from 'react-native';
import { Spinner, Text, View, Content, Container, Header, Title,Subtitle, Button, Icon, InputGroup, Input, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3,Left, Right,Body } from 'native-base';

export default class HomeScreen extends React.Component {
    render(){
        return(
            <Container style={styles.container}>
                <Header style={stl.header}>
                    <Body style={stl.headerstyle}>
                    <Title>Home</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.content} >
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'https://publicdomainvectors.org/photos/revolverByJoan.png'}} />
                                <Body>
                                <Text>NativeBase</Text>
                                <Text note>Datum</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Image source={{uri: 'https://publicdomainvectors.org/photos/revolverByJoan.png'}} style={{height: 200, width: 200, flex: 1}}/>
                            <Text>
                                Nieuw bericht blablablablablabla...
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent textStyle={{color: '#87838B'}}>
                                    <Icon name="logo-github" />
                                    <Text>Read more</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = {
    container: {

    },
    content: {
        display: "flex",
        flex: 1
    }
};
