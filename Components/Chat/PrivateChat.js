import React, { Component } from "react";
import { Container,Content,List,ListItem,Text} from "native-base";
import Navigation from '../../Navigation/Navigation';


export default  class PrivateChat extends React.Component{
    render() { // eslint-disable-line
        const { navigate } = this.props.navigation;

        const items = [
            'Somin Mignolet',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
            'Emre Can',
        ];

        return (
            <Container>
                <Content padder>
                    <List
                        dataArray={items}
                        renderRow={item =>
                            <ListItem>
                                <Text onPress={() =>
                                    navigate('ChatDetails')
                                }>{item}</Text>
                            </ListItem>
                        }
                    />
                </Content>
            </Container>
        );
    }
}