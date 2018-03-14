import React, { Component } from 'react';
import { Button,View, Text,StyleSheet,TextInput } from 'react-native';
import * as LoginService from '../Services/LoginService.js';

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

    _userLogin = () => {
        let user = this.state.username;
        let pass = this.state.password;
        let result = LoginService.userLogin(user, pass);
        console.log("result: " + result);
    };

    render() {
        return (
            <View>
                <Button style={{position: 'absolute',
                    bottom:0,
                    left:0
                }} title="Logout" block primary onPress={() => LoginService.onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}/>
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