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
        console.log(this.state.instruments);


    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <List>
                <FlatList
                    data={this.state.instruments}
                    renderItem={({ item }) => (
                        <ListItem
                            key={item.instrumentid}
                            roundAvatar
                            title={`${item.instrumentname}`}
                            subtitle={item.type}
                            onPress={() => {
                                navigate('InstrumentDetails', {
                                    instrumentId: item.instrumentid
                                });
                            }}
                        />
                    )}
                    keyExtractor={item => item.instrumentid}
                />
            </List>
        );
    }
}

export default Instruments;