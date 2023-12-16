import { Component } from "@angular/core";
import { NoteService } from "../services/note.service";

@Component({
    selector: 'add-note',
    templateUrl: 'add-note.component.html'
})

export class AddNoteComponent{
    
    newNoteText: string = '';

    constructor(private noteService: NoteService){}

    onAddNote(){
        this.noteService.addNote(this.newNoteText).subscribe(note => {
            
            alert(note);

            // clear note field
            this.newNoteText = '';

        });
    }// end addNote method

}// end AddNote

