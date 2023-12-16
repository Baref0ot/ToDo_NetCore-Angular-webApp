import { Component, OnInit } from "@angular/core";
import { NoteService } from "../../services/note.service";
import { Note } from "../../models/note.model";

@Component({
    selector: 'app-note-list',
    templateUrl: 'note-list.component.html'
})

export class NoteListComponent implements OnInit{

    // declare an empty Note[] called notes to hold notes retrieved from the NoteService
    notes: Note[] = [];

    // dependency inject the NoteService into the class
    constructor(private noteService: NoteService){}

    // This is an lifecycle hook. Tells Angular that you want to preform this action/method when this component is initialized.
    ngOnInit() {
        this.refreshNotes();

        //subscribe to noteadded$ subject in the service. When a new note is created this method will be notified of the change.
        this.noteService.noteAdded$.subscribe(() => {
            this.refreshNotes(); // refresh list when a new note is added.
        });
    }

    refreshNotes(){
        this.noteService.getNotes().subscribe(data => {this.notes = data;});
    }


    // delete request 
    onDelete(id: number){
        this.noteService.deleteNote(id).subscribe(() => {
            this.notes = this.notes.filter(note => note.id !== id);
        });
    }

    
    
}// end NoteListComponent