import React, {Component} from 'react';
import { Text, View,Header,Left,Icon,Body,Title,Right,Container,Content,StyleSheet} from 'native-base';
import { List, ListItem,SearchBar } from "react-native-elements";
import { FlatList } from "react-native";
import stl from '../Css/stylesheet';


export default class LibraryScreen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            instrumenten: []
        };
    }

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    getInstrumentenFromBackend() {
        return fetch("http://musicmaker-api-team4.herokuapp.com/api/instruments", { mode: 'cors'})
            .then((response) =>
                response.json())
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
            })
            .catch((err) => {
                console.log("geen response");
                console.log(err);
            });
    }

    componentDidMount() {
        this.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left style={{flex:1}}>
                    </Left>
                    <Body style={{flex:1}}>
                    <Title>Lib</Title>
                    </Body>
                    <Right style={{flex:1}}>
                        <Icon name='md-options' />
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content} >
                    <List>
                        <FlatList
                            data={this.state.instrumenten}
                            renderItem={({ item }) => (

                                <ListItem
                                    roundAvatar
                                    title={`${item.naam}`}
                                    subtitle={"In"}
                                />
                            )}
                            ListHeaderComponent={this.renderHeader}
                            keyExtractor={item => item.naam}
                        />
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {

    },
    header: {
        paddingRight: 15,
        paddingLeft: 15
    },
    content: {
        display: "flex",
        flex: 1
    }
};


