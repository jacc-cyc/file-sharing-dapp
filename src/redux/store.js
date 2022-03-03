import { createStore } from "redux";
import reducers from "./reducers";

const initialState = {
    walletIsConnected: false,
    walletAddress: 'undefined'
}

function configureStore(state = initialState) {
    return createStore(reducers,state);
}

export default configureStore;