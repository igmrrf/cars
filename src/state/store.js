import { createStore, applyMiddleware } from "redux";
import stateReducer from "./state.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["makes", "vehicles", "models"],
};
const reducer = persistReducer(persistConfig, stateReducer);
const middlewares = [thunk, logger];
const store = createStore(reducer, applyMiddleware(...middlewares));
console.log(store);
const persistor = persistStore(store);

export { store, persistor };
