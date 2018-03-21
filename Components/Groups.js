import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as GroupService from "../Services/GroupService";

export default class Groups extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            groups: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        GroupService.getGroupsByUser().then(groups => {
            this.setState({
                groups: groups,
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
                    data={this.state.groups}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.name}`}
                            onPress={() => {
                                navigate('GroupDetails', {
                                    groupId: item.groupid
                                });
                            }}
                        />
                    )}
                    keyExtractor={item => item.groupid}
                />
            </List>
        );
    }
}

