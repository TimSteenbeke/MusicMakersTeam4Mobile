import * as fetchService from "./FetchService";
import {AsyncStorage} from 'react-native';

const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
let userToken = "";

export async function getNewsItemsFromBackend() {
    userToken = JSON.parse(await AsyncStorage.getItem('userToken'));
    console.log(userToken.access_token);
    return fetch(URL + "newsitems", {
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

export function getNewsItemFromBackend(newsitemId) {
    return fetchService.fetchWithHeader("newsitems/" + newsitemId, "GET", {}, {naam: "Melding niet gevonden"});
}