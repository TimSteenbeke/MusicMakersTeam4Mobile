import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Modal, Image, Platform,TouchableHighlight } from 'react-native';
import { Spinner, Text, View, Content, Container, Header, Title,Subtitle, Button, Icon, InputGroup, Input, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3,Left, Right,Body } from 'native-base';
import stl from '../Css/stylesheet';
import Instruments from '../Components/Library/Instruments.js';
import Compositions from '../Components/Library/Compositions.js';
import Accords from '../Components/Library/Accords.js';

export default class BibTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radio1 : true,
            check1: false,
            modalVisible: false,
            optionsModal: false,
            search: 'Library',
            selectedItem: undefined,
            results: [],
            visiblescreen:1,
            itemSelected: 'itemOne'
        }
    }

    setOptionsVisible(visible){
        this.setState({
            optionsModal: visible
        });
    }

    setVisibleScreen(screennmbr,visible){
        this.setOptionsVisible(visible);
        this.setState({
            visiblescreen: screennmbr
        });
    }

    toggleCheck() {
        this.setState({
            check1 : !this.state.check1
        })
    }

    render() {
        const that = this;

        const instruments = <Instruments/>;
        const compositions = <Compositions/>;
        const accords = <Accords/>;

        let screen;

        if (this.state.itemSelected === 'itemOne') {
            screen = instruments
        } else if (this.state.itemSelected === 'itemTwo') {
            screen = compositions
        } else {
            screen = accords
        }

        return (
            <Container>
                <Header style={stl.header}>
                    <Body style={stl.headerstyle}>
                    <Title>Biblio</Title>
                    </Body>
                        <Icon name='options' style={{color: '#fff'}} onPress={()=>this.setOptionsVisible(true)} />
                </Header>
                <Content>
                    {screen}
                </Content>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.optionsModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <Content>
                    <ListItem>
                        <Text>Instrumenten</Text>
                        <Right>
                            <Radio onPress={() => this.setState({ itemSelected: 'itemOne' })}
                                   selected={this.state.itemSelected == 'itemOne'}
                            />
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Text>Muziekstukken</Text>
                        <Right>
                            <Radio onPress={() => this.setState({ itemSelected: 'itemTwo' })}
                                   selected={this.state.itemSelected == 'itemTwo' }
                            />
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Text>Akkoorden</Text>
                        <Right>
                            <Radio onPress={() => this.setState({ itemSelected: 'itemThree' })}
                                   selected={this.state.itemSelected == 'itemThree' }
                            />
                        </Right>
                    </ListItem>
                    </Content>
                    <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {this.setVisibleScreen(this.state.itemSelected,!this.state.optionsModal)}}>
                        <Text>Back</Text>
                    </Button>
                </Modal>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header : {
        marginLeft: -5,
        marginTop: 5,
        marginBottom: (Platform.OS==='ios') ? -7 : 0,
        lineHeight: 24,
        color: '#5357b6'
    },
    modalImage: {
        resizeMode: 'contain',
        height: 200
    },
    bold: {
        fontWeight: '600'
    },
    negativeMargin: {
        marginBottom: -10
    }
});

