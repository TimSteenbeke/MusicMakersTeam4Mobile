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
                //loadItemsForMonth={this.loadItems.bind(this)}
                selected={'2018-03-13'}
                renderItem={AgendaScreen.renderItem.bind(this)}
                renderEmptyDate={AgendaScreen.renderEmptyDate.bind(this)}
                rowHasChanged={AgendaScreen.rowHasChanged.bind(this)}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                //theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        );
    }

    static renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
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
                console.log("dte: " + dte.getTime());

                for(let i = -15 ; i < 50 ; i++){
                    const time = dte.getTime() + i * 24 * 60 * 60 * 1000;
                    const strTime = AgendaScreen.timeToString(time);
                    console.log("strTime: " + strTime);

                    if (!this.state.items[strTime]) {
                        console.log("create");
                        this.state.items[strTime] = [];

                        for (let i= 0; i < agendaItems.lessons.length; i++) {
                            let les = {
                                name: "Les coming soon (relatie ligt nog niet)",
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
                                name: agendaItems.performances[x].beschrijving,
                                startDateTime: AgendaScreen.timeToString(new Date(agendaItems.performances[x].startDateTime)),
                                type: 'Optreden'
                            };

                            const strTime2 = optreden.startDateTime;

                            if(strTime2 === strTime){
                                this.state.items[strTime].push({
                                    name: optreden.name + " - " + optreden.type,
                                    height: Math.max(50, 50)
                                });
                            }
                        }

                        console.log("einde " + this.state.items[strTime].length);

                    }

                }



                /*for (let x= 0; x < agendaItems.performances.length; x++) {
                    let optreden = {
                        name: agendaItems.performances[x].beschrijving,
                        startDateTime: AgendaScreen.timeToString(new Date(agendaItems.performances[x].startDateTime)),
                        type: 'Optreden'
                    };

                    const strTime = optreden.startDateTime;

                    if (!this.state.items[strTime]) {
                        this.state.items[strTime] = [];
                        this.state.items[strTime].push({
                            name: optreden.name + " - " + optreden.type,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    } else {
                        this.state.items[strTime].push({
                            name: optreden.name + " - " + optreden.type,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }*/


                //console.log(this.state.items);
                const newItems = {};
                Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
                this.setState({
                    items: newItems
                });


            }, 1000);

            console.log("kleir");

            //Over lessons loopen en info in AgendaItem steken
            //type en basic info


            //over performances loopen en info in AgendaItem steken
            //type en basic info
            /*for (let x= 0; x < agendaItems.performances.length; x++) {
                let optreden = {
                    _id: guid(),
                    id: agendaItems.performances[x].performanceId,
                    name: agendaItems.performances[x].beschrijving,
                    startDateTime: new Date(agendaItems.performances[x].startDateTime),
                    endDateTime: new Date(agendaItems.performances[x].endDateTime),
                    type: 'Optreden',
                    classes: 'color-2'
                };
                AgendaItems.push(optreden);
            }*/
        }

    };
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
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