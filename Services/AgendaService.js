import {AsyncStorage} from 'react-native';

const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';

let userToken = "";

export async function getMyAgenda() {
    userToken = JSON.parse(await AsyncStorage.getItem('userToken'));

    return fetch(URL + 'agenda',
        {
            mode: 'cors',
            headers: {
                'Authorization': userToken.token_type + " " +  userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}