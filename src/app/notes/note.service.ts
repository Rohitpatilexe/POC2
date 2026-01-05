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
    this._notes.next([...CurrentNotes,note]);
  }
  deleteNote(id: number) {
    const currentNotes = this._notes.getValue();
    const updatedNotes = currentNotes.filter(n => n.id !== id);
    this._notes.next(updatedNotes);
  }
}
