import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Modal, Image, Platform } from 'react-native';
import { Spinner, Text, View, Content, Container, Header, Title,Subtitle, Button, Icon, InputGroup, Input, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3,Left, Right,Body } from 'native-base';

export default class Instruments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedItem: undefined,
            results: []
        }
    }

    getInstrumentenFromBackend() {
        return fetch("https://musicmaker-api-team4.herokuapp.com/api/instruments", { mode: 'cors'})
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
        this.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({results: instrumenten,loading: false});
        });
    }

    render(){
        return (
            <Content>
                {this.state.loading? <Spinner /> : <List dataArray={this.state.results} renderRow={(item) =>
                    <ListItem>
                        <Thumbnail style={{margin: 10 ,height: 50, width: 50,borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da'}} source={{uri: `data:image/gif;base64,${item.afbeelding}`}} />
                        <Body>
                        <Text onPress={()=>this.setModalVisible(true, item)}>{item.naam}</Text>
                        </Body>
                        <Icon name="arrow-forward" onPress={()=>this.setModalVisible(true, item)} />
                    </ListItem>
                } />}

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    {!this.state.selectedItem ?
                        <View />
                        :
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{uri: `data:image/gif;base64,${this.state.selectedItem.afbeelding}`}} />
                                    <Body>
                                    <Text>{this.state.selectedItem.naam}</Text>
                                    <Text note>{this.state.selectedItem.soort.soortNaam}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image style={{ height: 300, flex: 1 }} source={{uri: `data:image/gif;base64,${this.state.selectedItem.afbeelding}`}} />
                            </CardItem>
                            <CardItem>
                                <Text>{this.state.selectedItem.naam} is een {this.state.selectedItem.soort.soortNaam} instrument.</Text>
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
                    }
                </Modal>

            </Content>
        )
    }
}

