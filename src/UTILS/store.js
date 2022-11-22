import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../REDUCERS/root.reducer";

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
