import StateActionTypes from "./state.types";
import axios from "axios";

const getMakesStart = () => ({
  type: StateActionTypes.GET_MAKES_START,
});
const getMakesSuccess = (makes) => ({
  type: StateActionTypes.GET_MAKES_SUCCESS,
  payload: makes,
});
const getMakesFailure = (message) => ({
  type: StateActionTypes.GET_MAKES_FAILURE,
  payload: message,
});

export const getMakesStartAsync = () => {
  return (dispatch) => {
    dispatch(getMakesStart());
    const url = `http://localhost:8080/api/makes`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        const makes = res.data;
        console.log(makes);
        dispatch(getMakesSuccess(makes));
      })
      .catch((err) => {
        dispatch(getMakesFailure(err.message));
      });
  };
};
const getModelsStart = () => ({
  type: StateActionTypes.GET_MODELS_START,
});
const getModelsSuccess = (models) => ({
  type: StateActionTypes.GET_MODELS_SUCCESS,
  payload: models,
});
const getModelsFailure = (message) => ({
  type: StateActionTypes.GET_MODELS_FAILURE,
  payload: message,
});

export const getModelsStartAsync = (make) => {
  return (dispatch) => {
    dispatch(getModelsStart());
    console.log(make);
    const url = `http://localhost:8080/api/models?make=${make}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        const models = res.data;
        console.log(models);
        dispatch(getModelsSuccess(models));
      })
      .catch((err) => {
        dispatch(getModelsFailure(err.message));
      });
  };
};
const getVehiclesStart = () => ({
  type: StateActionTypes.GET_VEHICLES_START,
});
const getVehiclesSuccess = (vehicles) => ({
  type: StateActionTypes.GET_VEHICLES_SUCCESS,
  payload: vehicles,
});
const getVehiclesFailure = (message) => ({
  type: StateActionTypes.GET_VEHICLES_FAILURE,
  payload: message,
});

export const getVehiclesStartAsync = (make, model) => {
  return (dispatch) => {
    dispatch(getVehiclesStart());
    const url = `http://localhost:8080/api/vehicles?make=${make}&model=${model}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        const vehicles = res.data;
        console.log(vehicles);
        console.log(res);
        dispatch(getVehiclesSuccess(vehicles));
      })
      .catch((err) => {
        dispatch(getVehiclesFailure("Something Went wrong, try again"));
      });
  };
};
