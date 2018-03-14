import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as CompositionService from "../../Services/CompositionService.js";

class Compositions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            compositions: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({
                compositions: compositions,
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
                    data={this.state.compositions}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.titel}`}
                            subtitle={item.artist}
                            onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                navigate('CompositionDetails', {
                                    compositionId: item.muziekstukId
                                });
                            }}
                        />
                    )}
                    keyExtractor={item => item.muziekstukId}
                />
            </List>
        );
    }
}

export default Compositions;