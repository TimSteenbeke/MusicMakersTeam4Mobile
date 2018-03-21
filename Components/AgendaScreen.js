import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import * as AgendaService from '../Services/AgendaService.js';

export default class AgendaScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            items2: [],
            agendaItems: [],
        };
    }

    componentDidMount() {
        AgendaService.getMyAgenda().then(agendaItems => {
            this.mapAgendaItems(agendaItems)
        });

    }

    render() {
        return (
            <Agenda
                items={this.state.items}
                selected={'2018-03-20'}
                renderItem={AgendaScreen.renderItem.bind(this)}
                renderEmptyDate={AgendaScreen.renderEmptyDate.bind(this)}
                rowHasChanged={AgendaScreen.rowHasChanged.bind(this)}
            />
        );
    }

    static renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text><Text>{item.type}</Text><Text>{item.date}</Text></View>
        );
    }

    static renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>Geen activiteit!</Text></View>
        );
    }

    static rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    static timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    mapAgendaItems = (agendaItems) => {
        if (agendaItems !== undefined) {
            setTimeout(() => {

                let dte = new Date();

                for(let i = -15 ; i < 50 ; i++){
                    const time = dte.getTime() + i * 24 * 60 * 60 * 1000;
                    const strTime = AgendaScreen.timeToString(time);

                    if (!this.state.items[strTime]) {
                        this.state.items[strTime] = [];

                        for (let i= 0; i < agendaItems.lessons.length; i++) {
                            let les = {
                                name: agendaItems.lessons[x].description,
                                startDateTime: AgendaScreen.timeToString(new Date(agendaItems.lessons[i].startDateTime)),
                                type: 'Les',
                            };

                            const strTime2 = les.startDateTime;

                            if(strTime2 === strTime){
                                this.state.items[strTime].push({
                                    name: les.name + " - " + les.type,
                                    height: Math.max(50, 50)
                                });
                            }
                        }

                        for (let x= 0; x < agendaItems.performances.length; x++) {
                            let optreden = {
                                name: agendaItems.performances[x].description,
                                startDateTime: AgendaScreen.timeToString(new Date(agendaItems.performances[x].startDateTime)),
                                type: 'Optreden'
                            };

                            const strTime2 = optreden.startDateTime;

                            if(strTime2 === strTime){
                                this.state.items[strTime].push({
                                    name: optreden.name,
                                    type: optreden.type,
                                    date: optreden.startDateTime,
                                    height: Math.max(50, 50)
                                });
                            }
                        }
                    }
                }

                //console.log(this.state.items);
                const newItems = {};
                Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
                this.setState({
                    items: newItems
                });
            }, 1000);

        }
    };
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});