import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Note } from '../models/note.model';
import { Subject } from 'rxjs';

// Makes this service a singleton so that this becomes a single shared service that can be used throughout the entire application.
@Injectable({providedIn: 'root'})
export class NoteService{

    private apiURL = 'http://localhost:21094/api/ToDoApp';

    // dependency inject an HttpClient to use in this service
    constructor(private http: HttpClient){}

    // note added subject 
    private noteAddedSubject = new Subject<void>();
    noteAdded$ = this.noteAddedSubject.asObservable();

    // create a method to handle get request to the WebAPI that will return a Note array
    getNotes(): Observable<Note[]> {  
        return this.http.get<Note[]>(`${this.apiURL}/GetNotes`);
    }

    // create a method to call the http delete request via API
    deleteNote(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/DeleteNote?id=${id}`);
    }

    // create a method to call the http POST request via API
    addNote(newNoteText: string): Observable<Note>{

        // Form Data with the field "newNote" is expected by the WebAPI, attach the value of the newNoteText to a newNote field of the formData object.
        const formData = new FormData();

        formData.append(`newNote`, newNoteText)

        return this.http.post<Note>(`${this.apiURL}/AddNote`, formData).pipe(
            tap(() => {
              this.noteAddedSubject.next(); // Emit an event when a note is added
            }));
    }

}// end class