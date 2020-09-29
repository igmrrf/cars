import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import car from "./static/logo512.png";
import Card from "@material-ui/core/Card";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import {
  getMakesStartAsync,
  getModelsStartAsync,
  getVehiclesStartAsync,
} from "./state/state.actions";

const useStyles = makeStyles((theme) => ({
  select: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    margin: theme.spacing(2, 2),
  },

  pagination: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
}));
const App = ({
  getMakesStartAsync,
  getModelsStartAsync,
  getVehiclesStartAsync,
  vehicles,
  makes,
  models,
  errorMessage,
}) => {
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageVehicles, setPageVehicles] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const count = Math.ceil(vehicles.length / 10);
  const classes = useStyles();

  useEffect(() => {
    if (makes.length < 1) getMakesStartAsync();
  }, [getMakesStartAsync, makes]);

  useEffect(() => {
    setPageVehicles(vehicles.slice(minimum, maximum));
  }, [minimum, page, maximum, vehicles]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
    console.log(value);
  };

  const handleMake = (event) => {
    getModelsStartAsync(event.target.value);
    setMake(event.target.value);
  };
  const handleModel = (event) => {
    getVehiclesStartAsync(make, event.target.value);
    setModel(event.target.value);
    console.log(model);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Grid container justify={"center"} alignItems={"center"}>
          {errorMessage ? (
            <Typography color={"secondary"}>{errorMessage}</Typography>
          ) : null}
          <Grid item xs={12} md={6}>
            <FormControl className={classes.select}>
              <label>Select Make</label>
              <option />
              <select onChange={handleMake}>
                {makes.map((make, i) => (
                  <option value={make} key={i}>
                    {make}
                  </option>
                ))}
              </select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl className={classes.select}>
              <label>Select Model</label>
              <select onChange={handleModel}>
                {models.map((model, i) => (
                  <option value={model} key={i}>
                    {model}
                  </option>
                ))}
              </select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant={"h3"} component={"h3"}>
          Vehicles
        </Typography>
        <Grid container justify={"center"} alignItems={"center"} spacing={3}>
          {pageVehicles.map((vehicle, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card>
                <img src={car} width={150} alt={""} />
                <Typography>Make: {vehicle.make}</Typography>
                <Typography>Model: {vehicle.model}</Typography>
                <Typography>
                  Engine Power(PS): {vehicle.enginePowerPS}
                </Typography>
                <Typography>
                  Engine Power(KW): {vehicle.enginePowerKW}
                </Typography>
                <Typography>Fuel Type: {vehicle.fuelType}</Typography>
                <Typography>Body Type: {vehicle.bodyType}</Typography>
                <Typography>
                  Engine Capacity: {vehicle.engineCapacity}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        {vehicles.length > 1 ? (
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            className={classes.pagination}
            color="primary"
            variant="outlined"
            size="small"
          />
        ) : null}
      </header>
    </div>
  );
};

const mapStateToProps = (state) => ({
  vehicles: state.vehicles,
  makes: state.makes,
  models: state.models,
  errorMessage: state.errorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  getMakesStartAsync: () => dispatch(getMakesStartAsync()),
  getModelsStartAsync: (make) => dispatch(getModelsStartAsync(make)),
  getVehiclesStartAsync: (make, model) =>
    dispatch(getVehiclesStartAsync(make, model)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
