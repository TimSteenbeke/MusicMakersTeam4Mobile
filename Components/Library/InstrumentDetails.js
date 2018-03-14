import React, { Component } from "react";
import { View, FlatList,Image } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as InstrumentService from "../../Services/InstrumentService.js";
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

class InstrumentDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            afbeelding: "",
            instrumentsoortid: 1,
            soortnaam: "",
            naam: "",
            type: "",
            uitvoering: "",
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const instrumentId = params ? params.instrumentId : null;
        console.log("compid: " + instrumentId);

        InstrumentService.getInstrumentFromBackend(instrumentId).then(instrument => {
            this.setState({
                afbeelding: instrument.afbeelding,
                instrumentsoortid: instrument.soort.instrumentSoortId,
                soortnaam: instrument.soort.soortNaam,
                naam: instrument.naam,
                type: instrument.type,
                uitvoering: instrument.uitvoering
            });
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>Instrument</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                <Text>{this.state.naam}</Text>
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Text>Type</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                <Text>{this.state.type}</Text>
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>


                    <Card>
                        <CardItem header>
                            <Text>Uitvoering</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                <Text>{this.state.uitvoering}</Text>
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>


                    <Card>
                        <CardItem header>
                            <Text>Soort</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                <Text>{this.state.soortnaam}</Text>
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                            <Text>Afbeelding</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Image style={{ height: 300, flex: 1 }} source={{uri: `data:image/gif;base64,${this.state.afbeelding}`}} />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default InstrumentDetails;