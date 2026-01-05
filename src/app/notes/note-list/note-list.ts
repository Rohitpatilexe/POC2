import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for AsyncPipe
import { RouterModule } from '@angular/router'; // 
import { NoteService } from '../note.service'; // 

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList {
  private noteService = inject(NoteService);
  notes$ = this.noteService.notes$;
}