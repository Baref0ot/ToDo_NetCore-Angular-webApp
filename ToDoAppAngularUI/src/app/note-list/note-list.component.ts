import { Component, OnInit } from "@angular/core";
import { NoteService } from "../services/note.service";
import { Note } from "../models/note.model";

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
        this.noteService.getNotes().subscribe(data => {this.notes = data;})
    }

    // add request

    // delete request 

    
}// end NoteListComponent