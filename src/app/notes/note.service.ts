import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from './notes.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private _notes=new BehaviorSubject<Note[]>([]);
  readonly notes$=this._notes.asObservable();
  constructor(){
    this._notes.next([
      { id: 1, title: 'Learn Angular', content: 'Understand RxJS and Signals' },
      { id: 2, title: 'Buy Groceries', content: 'Milk, Eggs, Bread' }
    ]);
  }
  addNote(note:Note){
    const CurrentNotes=this._notes.getValue();
    this._notes.next([...CurrentNotes,note]);//spread syntax [...old, new],.next(...) pushes the new list down the stream to all listeners.
  }
  deleteNote(id: number) {
    const currentNotes = this._notes.getValue();
    const updatedNotes = currentNotes.filter(n => n.id !== id);// Filter keeps everything that DOES NOT match the ID.
    this._notes.next(updatedNotes);
  }
}







/*
========================= THE OUTSIDE WORLD =========================
                                    |
[USER BROWSER] ---------------------+ (1. Types URL or Clicks Link)
                                    |
============================ YOUR ANGULAR APP =======================
                                    |
                                    V
+-------------------------------------------------------------------+
|  THE ROUTER (Traffic Control)                                     |
|  [app.routes.ts] & [notes.routes.ts]                              |
|                                                                   |
|  "User wants '/notes'. I will lazy load that code chunk           |
|   and activate the NoteListComponent."                            |
+-------------------------------------------------------------------+
                                    |
                                    | (2. Activates)
                                    V
+-------------------------------------------------------------------+
|  COMPONENT (The View / The Waiter)                                |
|  [note-list.ts] & [note-list.html]                                |
|                                                                   |
|  "I am alive! But I am empty. I need data to show on the screen."  |
|                                                                   |
|  --> (3a. INJECTS) "Give me the Kitchen walkie-talkie!"           |
|  <-- (3b. SUBSCRIBES) "I am watching the conveyor belt via |async"|
+-------------------------------------------------------------------+
          | (Connection established via constructor/inject) |
          |                                                 |
          | (Data flows UP via Observable stream)           ^
          V                                                 |
+-------------------------------------------------------------------+
|  SERVICE (The Brain / The Kitchen Singleton)                      |
|  [note.service.ts]                                                |
|                                                                   |
|  "I am running 24/7. I hold the master state."                     |
|                                                                   |
|  [ RxJS BehaviorSubject (The Conveyor Belt) ]                     |
|   -> Holds: [Note1, Note2]                                        |
|   -> Actions: addNote(), deleteNote()                             |
+-------------------------------------------------------------------+
                                    |
                                    | (4. Enforces Rules)
                                    V
+-------------------------------------------------------------------+
|  INTERFACE (The Blueprint / Rulebook)                             |
|  [note.model.ts]                                                  |
|                                                                   |
|  "A 'Note' MUST have an 'id' and a 'title'. No exceptions."       |
+-------------------------------------------------------------------+
*/
