import { Component } from "@angular/core";
import { NoteService } from "../services/note.service";
import { Note } from "../models/note.model";

@Component({
    selector: 'add-note',
    templateUrl: 'add-note.component.html'
})

export class AddNote{
    
    newNote: string = '';

    constructor(private noteService: NoteService){}

    addNote(){
        this.noteService.addNote(this.newNote).subscribe(note => {

            // clear the newNote input field after a response is recieved.
            this.newNote = '';
            
        });
    }// end addNote method

}// end AddNote

