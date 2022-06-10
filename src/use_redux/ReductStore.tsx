import { combineReducers, createStore } from "redux";
import { NoteReducer } from "./reducers/NoteReducer";

const combineReducer = combineReducers({
    NoteReducer
})

export type StateType =  ReturnType<typeof combineReducer>
export const store = createStore( combineReducer )