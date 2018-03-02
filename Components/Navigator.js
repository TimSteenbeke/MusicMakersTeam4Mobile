import React, { Component } from "react";
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
import Homescreen from '../Components/HomeScreen';
import Chatscreen from '../Components/HomeScreen';
import Agendascreen from '../Components/HomeScreen';
import Libraryscreen from '../Components/HomeScreen';

export default (MainScreenNavigator = TabNavigator(
    {
        Home: { screen: Homescreen },
        Agenda: { screen: Agendascreen },
        Library: { screen: Libraryscreen },
        Chat: { screen: Chatscreen }
    },
    {
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("Home")}>
                            <Icon name="home" />
                            <Text>Home</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("Agenda")}>
                            <Icon name="calendar" />
                            <Text>Agenda</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("Library")}>
                            <Icon name="book" />
                            <Text>Library</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("Chat")}>
                            <Icon name="ios-chatboxes" />
                            <Text>Chat</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
));