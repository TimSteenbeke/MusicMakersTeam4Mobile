import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Modal, Image, Platform ,TouchableHighlight} from 'react-native';
import { Spinner, Text, View, Content, Container, Header, Title,Subtitle, Button, Icon, InputGroup, Input, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3,Left, Right,Body } from 'native-base';

export default class Compositions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedItem: undefined,
            results: []
        }
    }

    getCompositionsFromBackend() {
        return fetch("https://musicmaker-api-team4.herokuapp.com/api/compositions", { mode: 'cors'})
            .then((response) =>
                response.json())
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
            })
            .catch((err) => {
                console.log("geen response");
                console.log(err);
            });
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
    }

    componentDidMount() {
        this.getCompositionsFromBackend().then(compositions => {
            this.setState({results: compositions,loading: false});
        });
    }

    render(){
        return (
            <Content>
                {this.state.loading? <Spinner /> : <List dataArray={this.state.results} renderRow={(item) =>
                    <ListItem>
                        <Body>
                        <Text onPress={()=>this.setModalVisible(true, item)}>{item.titel}</Text>
                        </Body>
                        <Icon name="arrow-forward" onPress={()=>this.setModalVisible(true, item)} />
                    </ListItem>
                } />}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    {!this.state.selectedItem ?
                        <View />
                        :
                        <View>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                        <Text>{this.state.selectedItem.titel}</Text>
                                        <Text note>{this.state.selectedItem.titel}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                    <Text>Titel: {this.state.selectedItem.titel}.</Text>
                                    <Text>Artiest: {this.state.selectedItem.artist}.</Text>
                                    <Text>Taal: {this.state.selectedItem.language}.</Text>
                                    <Text>Genre: {this.state.selectedItem.genre}.</Text>
                                    <Text>Onderwerp: {this.state.selectedItem.subject}.</Text>
                                    <Text>Type: {this.state.selectedItem.fileFormat}.</Text>
                                    <Text>Link: {this.state.selectedItem.link}.</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Right>
                                        <Button danger onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                                        }}>
                                            <Text>Terug</Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>

                    }
                </Modal>

            </Content>
        )
    }
}

