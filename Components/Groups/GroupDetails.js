import React, { Component } from 'react';
import { Button,View,StyleSheet,TextInput,ScrollView,TouchableOpacity,FlatList } from 'react-native';
import * as GroupService from '../../Services/GroupService';
import { List, ListItem, Text,Thumbnail,Left,Body } from 'native-base';
import {Divider} from 'react-native-elements';

export default class GroupDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            supervisor: "",
            students: [],
            group: "",
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const groupId = params ? params.groupId : null;

        GroupService.getGroupFromBackend(groupId).then(group => {
            this.setState({
                supervisor: group.supervisor.firstname,
                students: group.users,
                loading: false,
                group: group.name
            });
        });

        console.log(this.state.students);
    }

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: "Groep details",
            headerTitleStyle: {textAlign: 'center', alignSelf:'center',flex:1,color:'white'},
            headerRight: (<View/>) ,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#242728',
            },
        }
    };

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <View style={{height: 50,marginBottom:20,marginTop:10}}>
                    <Text style={styles.groupText}>{this.state.group}</Text>
                    <Text style={styles.begeleider}>Begeleider: {this.state.supervisor}</Text>
                </View>
                <Divider style={{ backgroundColor: 'gray' }} />
                <View style={{flex:1}}>
                    <List>
                        {this.state.students.map((item) => {
                        return (
                            <ListItem avatar key={item.firstname}>
                                <Left>
                                    {
                                        item.userImage === "" ?  <Thumbnail style={{borderRadius:50}} source={require('../../Images/NoImageAvailable.gif')} /> : <Thumbnail source={{uri: `data:image/gif;base64,${item.userImage}`}} />
                                    }
                                </Left>
                                <Body>
                                <Text>{item.firstname}</Text>
                                </Body>
                            </ListItem>
                        )})}
                    </List>
                </View>
                <View style={{height: 50, }}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        height: 100
    },
    groupText: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:20
    },
    begeleider: {
        fontSize:15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }

});