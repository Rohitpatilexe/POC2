import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for AsyncPipe
import { RouterModule } from '@angular/router'; // 
import { NoteService } from '../note.service'; // 
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList {
  private noteService = inject(NoteService);
  private authService=inject(AuthService);
  private router = inject(Router);
  notes$ = this.noteService.notes$;
  addDummyNote() {
    this.noteService.addNote({
      id: Date.now(), 
      title: `New Idea ${Math.floor(Math.random() * 100)}`, 
      content: 'Generated automatically to test RxJS flow.'
    });
  }
  logout(){
     this.authService.logout();
     this.router.navigate(['/login']);
  }
}