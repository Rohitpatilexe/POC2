import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoteService } from '../note.service';
import { Note } from '../notes.model';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.scss'
})
export class NoteDetail implements OnInit {
  private route = inject(ActivatedRoute); // Used to read the URL
  private noteService = inject(NoteService);

  note: Note | undefined;

  ngOnInit() {
    // 1. Get the 'id' from the URL
    // The '+' converts the string "123" into the number 123
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 2. Ask the service for the data
    if (id) {
      this.note = this.noteService.getNote(id);
    }
  }
}