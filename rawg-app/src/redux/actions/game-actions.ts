import { ActionTypes } from "../constants/action-types";
import { DataProps, SelectedGame } from "../constants/types";

export const setGames = (games:DataProps[]) => {
    return {
        type: ActionTypes.SET_LIST,
        payload: games
    }
}
export const selectedGame = (game:DataProps) => {
    return {
        type: ActionTypes.SELECTED_GAME,
        payload: game
    }
}
export const removeSelectedGame = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_GAME
    }
}
