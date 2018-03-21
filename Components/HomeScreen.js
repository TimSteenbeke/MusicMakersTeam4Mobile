import React from 'react';
import { ScrollView,StyleSheet,Image} from 'react-native';
import * as NewsItemService from '../Services/NewsItemService';
import { Container, Header, Content, Card, CardItem, Text, Body,View } from 'native-base';
import MomentJs from 'moment';
import {Divider} from 'react-native-elements';

import {RkCard} from 'react-native-ui-kitten';

export default class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: 1,
            redirect:true,
            newsitems: [],
        }
    }

    componentDidMount(){
            NewsItemService.getNewsItemsFromBackend().then(newsitems => {
                this.setState({newsitems: newsitems});
            });
    }

    newsItemList() {

        return this.state.newsitems.map((item) => {
            return (
                <RkCard  key={item.newsItemId}>
                    <View rkCardHeader>
                        <Text style={{fontSize:20,fontWeight:'bold' }}>{item.title}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'gray' }} />
                    {
                        item.messageImage !== null ? <Image style={{padding:10}} rkCardImg source={{uri: `data:image/gif;base64,${item.messageImage}`}} /> : <Image style={{margin:10}} rkCardImg source={require('../Images/guitar.jpg')}/>
                    }
                    <Divider style={{ backgroundColor: 'gray' }} />
                    <View rkCardContent>
                        <Text>{item.message}</Text>
                    </View>
                    <View rkCardFooter>
                        <Text style={{fontSize:10}}>{MomentJs(item.date).utc().format('YYYY-MM-DD')} - {item.editor}</Text>
                    </View>
                </RkCard>
            )
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <ScrollView style={{margin:10}}>
                        {this.newsItemList()}
                    </ScrollView>
                </Content>
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "white",
    },
});