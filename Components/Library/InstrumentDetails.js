import React, { Component } from "react";
import { Image,StyleSheet,View } from "react-native";
import * as InstrumentService from "../../Services/InstrumentService.js";
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';

class InstrumentDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            image: "",
            instrumentCategoryId: 1,
            categoryName: "",
            name: "",
            type: "",
            details: "",
        };
    }

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: "Instrumentdetails",
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
        const instrumentId = params ? params.instrumentId : null;
        console.log("compid: " + instrumentId);

        InstrumentService.getInstrumentFromBackend(instrumentId).then(instrument => {
            this.setState({
                image: instrument.image,
                instrumentCategoryId: instrument.instrumentCategory.instrumentCategoryId,
                categoryName: instrument.instrumentCategory.categoryName,
                name: instrument.instrumentname,
                type: instrument.type,
                details: instrument.details
            });
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header style={{alignItems:'center',flex:1,justifyContent:'center'}}>
                            <Text style={{fontSize:20}}>{this.state.name}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={styles.titleText}>Type</Text>
                            <Text style={styles.itemText}>
                                {this.state.type}
                            </Text>
                            <Text style={styles.titleText}>Uitvoering</Text>
                            <Text style={styles.itemText}>
                                {this.state.details}
                            </Text>
                            <Text style={styles.titleText}>Soort</Text>
                            <Text style={styles.itemText}>
                                {this.state.categoryName}
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem cardBody>
                            {
                                this.state.image === "" ?  <Image style={{ height: 300, flex: 1 }} source={require('../../Images/NoImageAvailable.gif')} /> : <Image style={{flex: 1 }} source={{uri: `data:image/gif;base64,${this.state.image}`}} />
                            }
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default InstrumentDetails;

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