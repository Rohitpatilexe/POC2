import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for AsyncPipe
import { RouterModule } from '@angular/router'; // 
import { NoteService } from '../note.service'; // 
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import { ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList {
  private noteService = inject(NoteService);
  private authService=inject(AuthService);
  private router = inject(Router);
  private fb=inject(FormBuilder);
  notes$ = this.noteService.notes$;
  noteform=this.fb.group({
    title:['',Validators.required],
    content:['',Validators.required]
  });
  deleteNote(id: number) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(id);
    }
  }
  addnote(){
    if(this.noteform.valid){
      const formvalue=this.noteform.value;
      this.noteService.addNote({
        id:Date.now(),
        title:formvalue.title!,
        content:formvalue.content!

      });
      this.noteform.reset();
    }
  }
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