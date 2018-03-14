import React from 'react';
import { ScrollView,StyleSheet} from 'react-native';
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import {View, Assets, Constants, Card, Button, Colors, Typography, Text} from 'react-native-ui-lib'; //eslint-disable-line

export default class HomeScreen extends React.Component {

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Card row height={160} containerStyle={{marginBottom: 15}} onPress={() => {}}>
                    <Card.Section body>
                        <Card.Section>
                            <Text text70 dark10>
                                Les gaat niet door
                            </Text>
                        </Card.Section>
                        <Card.Section>
                            <Text text80 dark10>
                                De les van 23 maart gaat niet door wegens dood
                            </Text>
                        </Card.Section>
                        <Card.Section footer>
                            <Text text90 dark50>
                                Admin
                            </Text>
                        </Card.Section>
                    </Card.Section>
                </Card>

                <Card shadowType="white10" row height={160} containerStyle={{marginBottom: 15}} onPress={() => {}} br10>
                    <Card.Section body>
                        <Card.Section>
                            <Text text70 dark10>
                                You’re Invited!
                            </Text>
                        </Card.Section>
                        <Card.Section>
                            <Text text80 dark10>
                                Join Old The Town Barbershop Official Store. Download the Wix app to...
                            </Text>
                        </Card.Section>
                        <Card.Section footer>
                            <Text text90 dark50>
                                wix.to/A465c
                            </Text>
                        </Card.Section>
                    </Card.Section>
                </Card>

                <Card containerStyle={{marginBottom: 15}} onPress={() => {}}>
                    <Card.Section body>
                        <Card.Section>
                            <Text text70 dark10>
                                You’re Invited!
                            </Text>
                        </Card.Section>
                        <Card.Section footer>
                            <Text text90 dark50>
                                join now
                            </Text>
                        </Card.Section>
                    </Card.Section>
                </Card>


            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: Colors.white,
    },
});