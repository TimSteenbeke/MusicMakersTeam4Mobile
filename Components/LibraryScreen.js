import React from 'react';
import { View,StyleSheet,Button,Modal, Text, TouchableHighlight,Image } from 'react-native';
import { Container, Header, Content, ListItem, Radio, Right } from 'native-base';
import Compositions from './Library/Compositions.js';
import Instruments from './Library/Instruments.js';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


class LibraryScreen extends React.Component {
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

    static navigationOptions = ({navigation}) => {

        const {params} = navigation.state;

        return {
            title: "Bib",
            headerTitleStyle: {textAlign: 'center', alignSelf:'center',flex:1},
            headerRight: (
                <MaterialIcons onPress = {() => params.handleSave && params.handleSave()} name='home' size={26} style={{ color: "black" }} />
            ) }
    };


    saveDetails = () => {
        console.log('Details');
    };

    componentDidMount () {
        this.props.navigation.setParams({handleSave: () => this.setModalVisible(true)});
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    render() {
        const that = this;

        const instruments = <Instruments navigation={this.props.navigation}/>;
        const compositions = <Compositions navigation={this.props.navigation}/>;
        const accords = <Compositions navigation={this.props.navigation}/>;

        let screen;

        if (this.state.itemSelected === 'itemOne') {
            screen = instruments
        } else if (this.state.itemSelected === 'itemTwo') {
            screen = compositions
        } else {
            screen = accords
        }

        return (
            <View style={{
                flexDirection: "row",
            }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
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

                            <Button title="Back" onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}/>

                        </View>
                    </View>
                </Modal>
                <Content>
                    {screen}
                </Content>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LibraryScreen;