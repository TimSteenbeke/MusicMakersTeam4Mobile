import React, { Component } from 'react';
import {  StyleSheet,Image,View,Text } from 'react-native';
import * as LoginService from '../Services/LoginService.js';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Account = t.struct({
    username: t.String,
    password: t.String
});

const options = {
    auto: 'placeholders',
    fields: {
        username: {
            error: 'Geef een gebruiksernaam in'
        },
        password: {
            error: 'Geef een wachtoord in'
        }
    }
};

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameError: '',
            failLogin: false,
            redirect: false,
            username: 'tim',
            password: 'tim'
        }
    }


    userLogin = () => {
        const value = this.refs.form.getValue();
        if (value) {
            let user = value.username;
            let pass = value.password;
            console.log(user  + " " + pass);
            const res = LoginService.userLogin(user, pass);
            this.props.navigation.navigate("SignedIn");
        }
    };

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <View style={{height: 200,alignItems: 'center'}}>
                    <Image
                        source={require('../Images/logo.png')}
                    />
                </View>
                <View style={styles.container}>
                    <Form
                        ref="form"
                        type={Account}
                        options={options}
                    />
                    <Button
                        buttonStyle={{ marginTop: 20,backgroundColor:'#dd2c00'}}
                        backgroundColor="#dd2c00"
                        title="LOG IN"
                        onPress={this.userLogin}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 20,
        padding: 20
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});