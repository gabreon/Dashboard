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

const INITIAL_STATE = {
  appointmentsOfMonth: {
    loading: false,
    data: {},
  },
  surgeriesOfMonth: {
    loading: false,
    data: {},
  },
  pastAppointments:{
    loading: false,
    data: [],
  },
  pastSurgeries:{
    loading: false,
    data: [],
  },
  nps:{
    loading: false,
    data: [],
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPOINTMENTS_MONTH_FETCH_START:
      return { ...state, appointmentsOfMonth: { ...INITIAL_STATE.appointmentsOfMonth, loading: true } };
    
    case APPOINTMENTS_MONTH_FETCH_FAIL:
      return { ...state, appointmentsOfMonth: { ...INITIAL_STATE.appointmentsOfMonth, loading: false } };

    case APPOINTMENTS_MONTH_FETCHED:
      return { ...state, appointmentsOfMonth: { loading: false, data: action.payload } };


    case SURGERY_MONTH_FETCH_START:
      return { ...state, surgeriesOfMonth: { ...INITIAL_STATE.surgeriesOfMonth, loading: true } };

    case SURGERY_MONTH_FETCH_FAIL:
      return { ...state, surgeriesOfMonth: { ...INITIAL_STATE.surgeriesOfMonth, loading: false } };

    case SURGERY_MONTH_FETCHED:
      return { ...state, surgeriesOfMonth: { loading: false, data: action.payload } };


    case APPOINTMENTS_PAST_MONTHS_FETCH_START:
      return { ...state, pastAppointments: { ...INITIAL_STATE.pastAppointments, loading: true } };

    case APPOINTMENTS_PAST_MONTHS_FETCH_FAIL:
      return { ...state, pastAppointments: { ...INITIAL_STATE.pastAppointments, loading: false } };

    case APPOINTMENTS_PAST_MONTHS_FETCHED:
      return { ...state, pastAppointments: { loading: false, data: action.payload } };  


    case SURGERIES_PAST_MONTHS_FETCH_START:
      return { ...state, pastSurgeries: { ...INITIAL_STATE.pastSurgeries, loading: true } };
    
    case SURGERIES_PAST_MONTHS_FETCH_FAIL:
      return { ...state, pastSurgeries: { ...INITIAL_STATE.pastSurgeries, loading: false} };
    
    case SURGERIES_PAST_MONTHS_FETCHED:
      return { ...state, pastSurgeries: { loading: false, data: action.payload } };

    
    case NPS_FETCH_START:
      return { ...state, nps: { ...INITIAL_STATE.nps, loading: true } };

    case NPS_FETCH_FAIL: 
      return { ...state, nps: { ...INITIAL_STATE.nps, loading: false } };

    case NPS_FETCHED:
      return { ...state, nps: { loading: false, data: action.payload } };


    default:
      return { ...state };
  }
}