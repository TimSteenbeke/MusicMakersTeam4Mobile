import * as fetchService from "./FetchService";
import {AsyncStorage} from 'react-native';

const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
let userToken = "";

export async function getGroupsByUser() {
    userToken = JSON.parse(await AsyncStorage.getItem('userToken'));
    console.log(userToken.access_token);
    return fetch(URL + "groups/", {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " + userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log(userToken.token_type);
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        })
}

export async function getGroupFromBackend(groupId) {
    userToken = JSON.parse(await AsyncStorage.getItem('userToken'));

    return fetch(URL + "groups/" + groupId, {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json()
        )
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            const muziekstuk = {naam: "muziekstuk niet gevonden"};
            return muziekstuk;
        });
}
