import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

// Makes this service a singleton so that this becomes a single shared service that can be used throughout the entire application.
@Injectable({providedIn: 'root'})
export class NoteService{

    private apiURL = 'http://localhost:21094/api/ToDoApp';

    // dependency inject an HttpClient to use in this service
    constructor(private http: HttpClient){}

    // create a method to handle get request to the WebAPI that will return a Note array
    getNotes(): Observable<Note[]> {  
        return this.http.get<Note[]>(`${this.apiURL}/GetNotes`);
    }

    // create a method to call the http delete request via API
    deleteNote(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/DeleteNote?id=${id}`);
    }

    // create a method to call the http POST request via API
    addNote(description: string): Observable<Note>{
        return this.http.post<Note>(`${this.apiURL}/AddNote`, {description});
    }

}// end class