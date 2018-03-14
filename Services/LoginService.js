import {AsyncStorage} from 'react-native';

const AuthStr = 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=';
// const URL = 'http://localhost:8080/oauth/token';
const URL = 'https://musicmaker-api-team4.herokuapp.com/oauth/token';

export const USER_KEY = "userToken";

export const onSignIn = (username,password) => {
    console.log("userrr: " + username + " "+ password);
    AsyncStorage.setItem(USER_KEY,"true");
};

/*export const onSignIn = (username,password) =>
{
    console.log("Username: " + username + " " + password);

    fetch(URL + '?grant_type=password&username='+ username +'&password='+password, {
        method: 'POST',
        headers: {
            'Authorization': AuthStr,
            'Content-Type': 'application/json'
        },
        mode: "cors",
    })
        .then((response) =>
            response.json()
        )
        .then((responseData) => {
            console.log(responseData);
            if (responseData.hasOwnProperty("access_token")) {
                try {
                    AsyncStorage.setItem(USER_KEY, JSON.stringify(responseData));
                    console.log("Ok");
                } catch (error) {
                    // Error saving data
                }
            }
        })
    //AsyncStorage.setItem(USER_KEY, "true");
};*/

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                console.log("res: " + res);
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};

export function userLogin(username, password) {
    console.log(username + " " + password);
    fetch(URL + '?grant_type=password&username='+ username +'&password='+password, {
        method: 'POST',
        headers: {
            'Authorization': AuthStr,
            'Content-Type': 'application/json'
        },
        mode: "cors",
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            if (responseData.hasOwnProperty("access_token")) {
                try {
                    AsyncStorage.setItem('userToken', JSON.stringify(responseData));
                    console.log("Ok");
                    return isSignedIn();
                } catch (error) {
                    // Error saving data
                }
            }
            return false;
        })
        .done();
}

export function checkToken(){
    if(AsyncStorage.getItem('userToken')!== null){
        let jwt = AsyncStorage.getItem('userToken');
        let current_time = Date.now() / 1000;
        if ( jwt.exp < current_time) {
            AsyncStorage.removeItem('userToken');
            return false;
        } else{
            return true;
        }
    }
        return false;
}



