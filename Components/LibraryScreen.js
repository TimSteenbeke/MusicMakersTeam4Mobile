import React from 'react';
import { View,StyleSheet,Modal,Button, Text, TouchableHighlight,Image,TouchableOpacity } from 'react-native';
import { Container,Content, Header, ListItem, Radio, Right,Left } from 'native-base';
import Compositions from './Library/Compositions.js';
import Instruments from './Library/Instruments.js';
import { MaterialIcons } from '@expo/vector-icons';

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
            visibleModal: null,
            visiblescreen:1,
            itemSelected: 'Instrumenten',
        }
    }

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: "Bibliotheek",
            headerTitleStyle: {textAlign: 'center', alignSelf:'center',flex:1,color:'white'},
            headerRight: (
                <MaterialIcons onPress = {() => params.handleSave && params.handleSave()} name='search' size={26} style={{ color: "white" }} />
            ) ,
            headerStyle: {
                backgroundColor: '#242728',
            },
            headerLeft : (<View/>)
        }
    };

    componentDidMount () {
        this.props.navigation.setParams({handleSave: () => this.setModalVisible(true)});
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    render() {
        const instruments = <Instruments navigation={this.props.navigation}/>;
        const compositions = <Compositions navigation={this.props.navigation}/>;

        let screen;

        if (this.state.itemSelected === 'Instrumenten') {
            screen = instruments
        } else {
            screen = compositions
        }

        return (
            <View style={styles.container}>
               <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{margin:20}}>
                        <View>
                            <ListItem>
                                <Left>
                                    <Text>Instrumenten</Text>
                                </Left>
                                <Right>
                                    <Radio onPress={() => this.setState({ itemSelected: 'Instrumenten' })}
                                           selected={this.state.itemSelected === 'Instrumenten'}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Muziekstukken</Text>
                                </Left>
                                <Right>
                                    <Radio onPress={() => this.setState({ itemSelected: 'Muziekstukken' })}
                                           selected={this.state.itemSelected === 'Muziekstukken' }
                                    />
                                </Right>
                            </ListItem>
                             <Button title="Ok" style={{marginTop:20}} onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}/>

                        </View>
                    </View>
                </Modal>
                <Content>
                    <View
                        style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{maxWidth:'50%',fontSize:20,marginTop:10}}>{this.state.itemSelected}</Text>

                    </View>
                    {screen}
                </Content>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3eeee'
    },
});

export default LibraryScreen;