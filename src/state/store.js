import { createStore } from "redux";
import stateReducer from "./state.reducer";

const store = createStore({
  data: stateReducer,
});
