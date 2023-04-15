import { Action } from "redux";
import { ActionTypes } from "../constants/action-types";
import { DataProps, SelectedGame } from "../constants/types";


interface IState {
    list: DataProps[];
}
  
const initState: IState = {
    list: []
};

interface IGamesAction extends Action {
    payload: {
        results: DataProps[]
    }
}

interface SelectedGameAction extends Action{
    type: string,
    payload: SelectedGame
}


export const gamesReducer = (state: IState = initState, action: IGamesAction) => {
    switch(action.type){
        case ActionTypes.SET_LIST: return {...state, list: [...action.payload.results]}
        case ActionTypes.REMOVE_LIST: return {}
        default: return state
    }
}
export const selectedGameReducer = (state: any = {}, {type, payload}: SelectedGameAction) => {
    switch(type){
        case ActionTypes.SELECTED_GAME: return {...state, ...payload}
        case ActionTypes.REMOVE_SELECTED_GAME: return {}
        default: return state
    }
}
