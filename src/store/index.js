import { createStore } from "redux";
import { moviesReducer } from "./reducers";

const store = createStore(moviesReducer);

export default store;
