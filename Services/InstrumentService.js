import {AsyncStorage} from 'react-native';

const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';

let userToken = "";

export async function getInstrumentenFromBackend() {
    userToken = JSON.parse(await AsyncStorage.getItem('userToken'));

    return fetch(URL + "instruments", {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}

export async function getInstrumentFromBackend(instrumentNr) {
    userToken = JSON.parse(await AsyncStorage.getItem('userToken'));
    
    return fetch(URL + "instruments/" + instrumentNr, {
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
            const instrument = {naam: "instrument niet gevonden"};
            return instrument;
        });
}