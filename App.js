import React from 'react';
import {Button} from 'react-native';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import HomeScreen from './Components/HomeScreen.js';
import AgendaScreen from './Components/AgendaScreen.js';
import LibraryScreen from './Components/LibraryScreen.js';
import ChatScreen from './Components/ChatScreen.js';
import LoginScreen from './Components/Login.js';
import CompositionDetails from './Components/Library/CompositionDetails.js';
import InstrumentDetails from './Components/Library/InstrumentDetails.js';
import Profile from './Components/Profile.js';
import * as LoginService from './Services/LoginService.js';

//Ingelogd
const HomeStack = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: (props) => ({
            headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1},
            title: 'Home',
        })
    }
});

const AgendaStack = StackNavigator({
    Agenda: {
        screen: AgendaScreen,
        navigationOptions: (props) => ({
            headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1},
            title: "Agenda",
        })
    }
});

const LibraryStack = StackNavigator({
    Library: {
        screen: LibraryScreen,
    },
    CompositionDetails: {
        screen: CompositionDetails,
        navigationOptions: (props) => ({
            headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1},
            title: "Details",
        })
    },
    InstrumentDetails: {
        screen: InstrumentDetails,
        navigationOptions: (props) => ({
            headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1},
            title: "InstrumentDetails",
        })
    }
});

const ChatStack = StackNavigator({
    Chat: {
        screen: ChatScreen,
        navigationOptions: (props) => ({
            headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1},
            title: "Chat",
        })
    }
});

const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: (props) => ({
            headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1},
            title: "Profiel",
        })
    }
});

const TabNav = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='home' size={26} style={{ color: tintColor }} />
        },
    },
    Agenda: {
        screen: AgendaStack,
        navigationOptions: {
            tabBarLabel: 'Agenda',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='schedule' size={26} style={{ color: tintColor }} />
        },
    },
    Library: {
        screen: LibraryStack,
        navigationOptions: {
            tabBarLabel: 'Bib',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='local-library' size={26} style={{ color: tintColor }} />
        },
    },
    Chat: {
        screen: ChatStack,
        navigationOptions: {
            tabBarLabel: 'Chatt',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='chat' size={26} style={{ color: tintColor }} />
        },
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='account-circle' size={26} style={{ color: tintColor }} />
        },
    }
}, {
    tabBarOptions: {
        activeTintColor: '#222',
        showIcon: true,
        showLabel: false
    },
    tabBarPosition: 'bottom',
});

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: TabNav,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: LoginScreen,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        LoginService.isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => alert("An error occurred"));
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);
        return <Layout />;
    }
}

export default App;