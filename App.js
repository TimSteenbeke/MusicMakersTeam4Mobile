import React, { Component } from "react";
import { Root,Text ,Header,Title,Content,Footer,Button,FooterTab,Icon,View} from "native-base";
import { Font, AppLoading } from "expo";
import Homescreen from './Components/HomeScreen';
import Chatscreen from './Components/ChatScreen';
import Agendascreen from './Components/AgendaScreen';
import Bibtest from './Components/BibTest';
import stl from './Css/stylesheet';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true ,index: 0};
    }

    switchScreen(index) {
        this.setState({index: index})
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    render() {
        let AppComponent = null;

        if(this.state.index == 0){
            AppComponent = Homescreen;
        }
        else if(this.state.index == 1) {
            AppComponent = Agendascreen;
        }else if(this.state.index == 2) {
            AppComponent = Bibtest;
        } else {
            AppComponent = Chatscreen;
        }


        if (this.state.loading) {
            return (
                <Root>
                    <AppLoading />
                </Root>
            );
        }
        return (
            <View style={styles.container}>
                <AppComponent/>
                <Footer >
                    <FooterTab style={{backgroundColor:"#DD2C00"}}>
                    <Button  onPress={() => this.switchScreen(0) }><Icon style={{color:"#fff"}} name="home" /><Text style={{color:"#fff"}}>Home</Text></Button>
                    <Button onPress={() => this.switchScreen(1) }><Icon style={{color:"#fff"}} name="calendar" /><Text style={{color:"#fff"}}>Agenda</Text></Button>
                    <Button onPress={() => this.switchScreen(2) }><Icon style={{color:"#fff"}} name="book" /><Text style={{color:"#fff"}}>Library</Text></Button>
                    <Button onPress={() => this.switchScreen(3) }><Icon style={{color:"#fff"}} name="ios-chatboxes" /><Text style={{color:"#fff"}}>Chat</Text></Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        marginTop: Expo.Constants.statusBarHeight
    },
    navbar: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
};