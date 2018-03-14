import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as CompositionService from "../../Services/CompositionService.js";
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

class CompositionDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            titel: "",
            artist: "",
            language: "",
            genre: "",
            subject: "",
            fileFormat: "",
            link: "",
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const compositionId = params ? params.compositionId : null;
        console.log("compid: " + compositionId);

        CompositionService.getCompositionFromBackend(compositionId).then(composition => {
            this.setState({
                titel: composition.titel,
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
                    <CardItem header>
                        <Text>Titel</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            <Text>{this.state.titel}</Text>
                        </Text>
                        </Body>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem header>
                        <Text>Artiest</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            <Text>{this.state.artist}</Text>
                        </Text>
                        </Body>
                    </CardItem>
                </Card>


                <Card>
                    <CardItem header>
                        <Text>Taal</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            <Text>{this.state.language}</Text>
                        </Text>
                        </Body>
                    </CardItem>
                </Card>


                <Card>
                    <CardItem header>
                        <Text>Genre</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            <Text>{this.state.genre}</Text>
                        </Text>
                        </Body>
                    </CardItem>
                </Card>


                <Card>
                    <CardItem header>
                        <Text>Onderwerp</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            <Text>{this.state.subject}</Text>
                        </Text>
                        </Body>
                    </CardItem>
                </Card>


                <Card>
                    <CardItem header>
                        <Text>Bestand</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            <Text>{this.state.fileFormat}</Text>
                        </Text>
                        </Body>
                    </CardItem>
                </Card>


                <Card>
                    <CardItem header>
                        <Text>Link</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>
                            <Text>{this.state.link}</Text>
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