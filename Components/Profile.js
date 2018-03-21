import React, { Component } from 'react';
import { Button,View, Text,StyleSheet,TextInput,ScrollView,TouchableOpacity } from 'react-native';
import * as LoginService from '../Services/LoginService.js';
import Groups from './Groups';
import { Container,Content, Header, ListItem, Radio, Right,Left } from 'native-base';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            failLogin: false,
            redirect: false,
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
                    <View
                        style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{maxWidth:'50%',fontSize:20,marginTop:10}}>Mijn groepen</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Groups  navigation={this.props.navigation}/>
                    </View>
                    <View style={{height: 50 }}>
                        <TouchableOpacity style={styles.button} onPress={() => LoginService.onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}>
                            <Text style={{color:'white'}}>Uitloggen</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#dd2c00',
        padding: 10,
        height: 100
    },
    text: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    }
});