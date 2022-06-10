import { INote } from "../../models/INote";
import { decrypt, encrypt } from "../../Util";
import { NoteType } from "../types/NoteType";

export interface NoteAction {
    type: NoteType,
    payload: INote
}

export function NoteReducer(  state: INote[] = fncNotes(),  action: NoteAction  ) {

    switch (action.type) {

        case NoteType.LIST:
            return fncNotes()

        case NoteType.SAVE:
            //state.push( action.payload )
            const saveState = [ ...state, action.payload  ]
            return fncNotes(saveState)

        case NoteType.DELETE:
            const index = state.findIndex( item => item === action.payload )
            state.splice(index, 1)
        return fncNotes(state)

        default:
            return fncNotes()
    }

}


const fncNotes = ( note?:INote[], index?:number ) : INote[]  => {
    if ( note ) {
        localStorage.setItem("notes", encrypt(JSON.stringify(note)))
    }
    const stNotes = localStorage.getItem('notes')
    let notes:INote[] = []
    if ( stNotes ) {
        notes = JSON.parse( decrypt(stNotes) )
    }
    return notes
}