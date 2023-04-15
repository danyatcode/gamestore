import { combineReducers } from "redux";
import { gamesReducer, queryReducer, selectedGameReducer } from "./gamesReducer";

const reducers = combineReducers({
    games: gamesReducer,
    selectedGame: selectedGameReducer,
    query: queryReducer,
})

export default reducers