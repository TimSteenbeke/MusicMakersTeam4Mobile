import React, { Component } from "react";
import { Container,Content,List,ListItem,Text} from "native-base";

export default  class GroupChat extends React.Component{
    render() { // eslint-disable-line

        const items = [
            'Team vier'
        ];

        return (
            <Container>
                <Content padder>
                    <List
                        dataArray={items}
                        renderRow={item =>
                            <ListItem>
                                <Text>{item}</Text>
                            </ListItem>
                        }
                    />
                </Content>
            </Container>
        );
    }
}