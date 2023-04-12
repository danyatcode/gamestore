import { combineReducers } from "redux";
import { gamesReducer, selectedGameReducer } from "./gamesReducer";

const reducers = combineReducers({
    games: gamesReducer,
    selectedGame: selectedGameReducer,
})

export default reducers