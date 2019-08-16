import api from '../../services/api';
import { Alert, AsyncStorage } from 'react-native';
import {
  USER_SIGNIN_START,
  USER_SIGNIN_FAIL,
  USER_AUTHENTICATED,
} from './consts';

export const signIn = (email, password) => {
  return async dispatch => {
    dispatch({ type: USER_SIGNIN_START })
    try {
      const response = await api.post('account/authenticate', {
        email,
        password,
        profile: 'Doctor', 
        product: 'PlasticCare', 
      });

      const { data } = response.data;

      await AsyncStorage.setItem('@dashboardApp:token', data.token);

      dispatch({ type: USER_AUTHENTICATED, payload: data.user });
      
      return true;
    } catch (e) {
      dispatch({ type: USER_SIGNIN_FAIL });
      Alert.alert('Atenção', e.message, [{ text: 'Ok' }] );
      return false;
    }
  }
}