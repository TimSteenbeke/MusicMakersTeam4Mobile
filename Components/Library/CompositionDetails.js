import React, { Component } from "react";
import {StyleSheet,View} from 'react-native';
import * as CompositionService from "../../Services/CompositionService.js";
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

class CompositionDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            title: "",
            artist: "",
            language: "",
            genre: "",
            subject: "",
            fileFormat: "",
            link: "",
        };
    }

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: "Muziekstuk details",
            headerTitleStyle: {textAlign: 'center', alignSelf:'center',flex:1,color:'white'},
            headerRight: (<View/>) ,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#242728',
            },
        }
    };

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const compositionId = params ? params.compositionId : null;
        console.log("compid: " + compositionId);

        CompositionService.getCompositionFromBackend(compositionId).then(composition => {
            this.setState({
                title: composition.title,
                artist: composition.artist,
                language: composition.language,
                genre: composition.genre,
                subject: composition.genre,
                fileFormat: composition.fileFormat,
                link: composition.link,
                loading: false
            });
        });
    }

    render() {
        return (
            <Container>
                <Content>
                <Card>
                    <CardItem header style={{alignItems:'center',flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:20}}>{this.state.title} - {this.state.artist}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text style={styles.titleText}>Taal</Text>
                        <Text style={styles.itemText}>
                            {this.state.language}
                        </Text>
                        <Text style={styles.titleText}>Genre</Text>
                        <Text style={styles.itemText}>
                            {this.state.genre}
                        </Text>
                        <Text style={styles.titleText}>Onderwerp</Text>
                        <Text style={styles.itemText}>
                            {this.state.subject}
                        </Text>
                        <Text style={styles.titleText}>Link</Text>
                        <Text style={styles.itemText}>
                            {this.state.link}
                        </Text>
                        </Body>
                    </CardItem>
                </Card>
                </Content>
            </Container>
        );
    }
}

export default CompositionDetails;

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    itemText :{
        marginBottom: 10,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});