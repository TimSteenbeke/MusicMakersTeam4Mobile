import React, { Component } from 'react';
import {  StyleSheet,Image } from 'react-native';
import * as LoginService from '../Services/LoginService.js';
//import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            failLogin: false,
            redirect: false,
            username: "",
            password: ""
        }
    }

    userLogin = () => {
        let user = this.state.username;
        let pass = this.state.password;
        const res = LoginService.userLogin(user, pass);
        console.log("resultt: " + res);

        console.log("restultt2: " + LoginService.checkToken());

        this.props.navigation.navigate("SignedIn");
    };

    render() {
        return (
            <View flex paddingH-25 paddingT-120>
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../Images/logo.png')}
                />
                <Text blue50 text20 center>Welkom</Text>
                <TextInput style={{textAlign: 'center'}} onChangeText={(username) => {this.setState({'username': username})}} text50 placeholder="Gebruikersnaam" dark10/>
                <TextInput style={{textAlign: 'center'}} onChangeText={(password) => {this.setState({'password': password})}} text50 placeholder="Wachtwoord" secureTextEntry dark10/>
                <View marginT-100 center>
                    <Button onPress={this.userLogin} text70 white background-orange30 label="Login"/>
                </View>
            </View>

            /*<View>
                <Card >
                    <FormLabel>Gebruikersnaam</FormLabel>
                    <FormInput onChangeText={(username) => {this.setState({'username': username})}} placeholder="Gebruiksernaam..." />
                    <FormLabel>Wachtwoord</FormLabel>
                    <FormInput onChangeText={(password) => {this.setState({'password': password})}}  secureTextEntry placeholder="Wachtwoord..." />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="LOG IN"
                        onPress={this.userLogin}
                    />
                </Card>
            </View>*/
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