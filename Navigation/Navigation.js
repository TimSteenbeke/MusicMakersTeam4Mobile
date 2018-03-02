import {
    StackNavigator,
} from 'react-navigation';

import Chatdetails from '../Components/Chat/ChatScreenDetails';

const Navigation = StackNavigator({
    ChatDetails: { screen: Chatdetails }
});