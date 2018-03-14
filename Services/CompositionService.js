import {AsyncStorage} from 'react-native';

const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';

let userToken = "";

export async function getCompositionsFromBackend() {
    userToken = JSON.parse(await AsyncStorage.getItem('userToken'));
    console.log(userToken.access_token);
    return fetch(URL + "compositions", {
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

export async function getCompositionFromBackend(compositionId) {
    userToken = JSON.parse(await AsyncStorage.getItem('userToken'));

    return fetch(URL + "compositions/" + compositionId, {
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

    /*export function filterCompositions(search){
        return fetch(URL + "compositions/filter/" + search, {
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
    }*/