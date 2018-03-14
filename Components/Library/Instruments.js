import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as InstrumentService from "../../Services/InstrumentService.js";

class Instruments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            instruments: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        InstrumentService.getInstrumentenFromBackend().then(instruments => {
            this.setState({
                instruments: instruments,
                loading: false,
                refreshing: false
            });
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <List>
                <FlatList
                    data={this.state.instruments}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.naam}`}
                            subtitle={item.type}
                            onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                navigate('InstrumentDetails', {
                                    instrumentId: item.instrumentId
                                });
                            }}
                        />
                    )}
                    keyExtractor={item => item.instrumentId}
                />
            </List>
        );
    }
}

export default Instruments;