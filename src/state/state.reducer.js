import StateActionTypes from "./state.types";

const initialState = {
  makes: null,
  models: null,
  vehicles: null,
  isFetching: false,
  errorMessage: null,
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case StateActionTypes.GET_MAKES_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case StateActionTypes.GET_MAKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        makes: action.payload,
        errorMessage: null,
      };
    case StateActionTypes.GET_MAKES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case StateActionTypes.GET_MODELS_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case StateActionTypes.GET_MODELS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        models: action.payload,
        errorMessage: null,
      };
    case StateActionTypes.GET_MODELS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case StateActionTypes.GET_VEHICLES_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case StateActionTypes.GET_VEHICLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        vehicles: action.payload,
        errorMessage: null,
      };
    case StateActionTypes.GET_VEHICLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default stateReducer();
