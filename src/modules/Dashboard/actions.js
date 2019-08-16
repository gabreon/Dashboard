import api from '../../services/api';
import { Alert } from 'react-native';
import {
  APPOINTMENTS_MONTH_FETCH_START,
  APPOINTMENTS_MONTH_FETCH_FAIL,
  APPOINTMENTS_MONTH_FETCHED,

  SURGERY_MONTH_FETCH_START,
  SURGERY_MONTH_FETCH_FAIL,
  SURGERY_MONTH_FETCHED,

  APPOINTMENTS_PAST_MONTHS_FETCH_START,
  APPOINTMENTS_PAST_MONTHS_FETCH_FAIL,
  APPOINTMENTS_PAST_MONTHS_FETCHED,

  SURGERIES_PAST_MONTHS_FETCH_START,
  SURGERIES_PAST_MONTHS_FETCH_FAIL,
  SURGERIES_PAST_MONTHS_FETCHED,

  NPS_FETCH_START,
  NPS_FETCH_FAIL,
  NPS_FETCHED,
} from './consts';

const baseUrl = 'doctors/dashboard';

export const getAppointmentsOfMonth = userId => {
  return async dispatch => {
    dispatch({ type: APPOINTMENTS_MONTH_FETCH_START });
    try {
      const response = await api.get(`${baseUrl}/appointments/month/${userId}`);

      const { data } = response.data;

      dispatch({ type: APPOINTMENTS_MONTH_FETCHED, payload: data });

      return true;
    } catch (e) {
      dispatch({ type: APPOINTMENTS_MONTH_FETCH_FAIL });
      Alert.alert('Atenção', e.message, [{ text: 'Ok' }]);
      return false;
    }
  };
};

export const getSurgeriesOfMonth = userId => {
  return async dispatch => {
    dispatch({ type: SURGERY_MONTH_FETCH_START });
    try {
      const response = await api.get(`${baseUrl}/surgicalProcedures/month/${userId}`);

      const { data } = response.data;

      dispatch({ type: SURGERY_MONTH_FETCHED, payload: data });

      return true;
    } catch (e) {
      dispatch({ type: SURGERY_MONTH_FETCH_FAIL });

      Alert.alert('Alerta', e.message, [{ text: 'Ok' }]);

      return false;
    }
  }
}

export const getPastAppointments = userId => {
  return async dispatch => {
    dispatch({ type: APPOINTMENTS_PAST_MONTHS_FETCH_START });
    try {
      const response = await api.get(`${baseUrl}/appointments/latest/${userId}`);

      const { data } = response.data;

      dispatch({ type: APPOINTMENTS_PAST_MONTHS_FETCHED, payload: data });

      return true;
    } catch (e) {
      dispatch({ type: APPOINTMENTS_PAST_MONTHS_FETCH_FAIL });

      Alert.alert('Alerta', e.message, [{ text: 'Ok' }]);

      return false;
    }
  }
}

export const getPastSurgeries = userId => {
  return async dispatch => {
    dispatch({ type: SURGERIES_PAST_MONTHS_FETCH_START });

    try{
      const response = await api.get(`${baseUrl}/surgicalProcedures/latest/${userId}`);

      const { data } = response.data;

      dispatch({ type: SURGERIES_PAST_MONTHS_FETCHED, payload: data });

      return true;
    } catch (e) {
      dispatch({ type: SURGERIES_PAST_MONTHS_FETCH_FAIL });

      Alert.alert('Alerta', e.message, [{ text: 'Ok' }]);

      return false;
    }
  }
}

export const getNps = userId => {
  return async dispatch => {
    dispatch({ type: NPS_FETCH_START });

    try{
      const response = await api.get(`${baseUrl}/nps/${userId}`);

      const { data } = response.data;

      dispatch({ type: NPS_FETCHED, payload: data });

      return true;
    } catch (e) {
      dispatch({ type: NPS_FETCH_FAIL });

      Alert.alert('Alerta', e.message, [{ text: 'Ok' }]);

      return false;
    }
  }
}