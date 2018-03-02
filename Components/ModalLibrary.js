import React, { Component } from 'react';

export default class ModalLibrary extends React.Component{
    render (){
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.optionsMosdal}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <ListItem>
                    <Text>Instrumenten</Text>
                    <Right>
                        <Radio selected={true} />
                    </Right>
                </ListItem>
                <ListItem>
                    <Text>Muziekstukken</Text>
                    <Right>
                        <Radio selected={false} />
                    </Right>
                </ListItem>
                <ListItem>
                    <Text>Akkoorden</Text>
                    <Right>
                        <Radio selected={false} />
                    </Right>
                </ListItem>
                <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                    this.setOptionsVisible(!this.state.optionsModal)
                }}>
                    <Text>Back</Text>
                </Button>
            </Modal>
        )
    }
}
