import {Routes} from '@angular/router';
import { NoteList } from './note-list/note-list';
import { NoteDetail } from './note-detail/note-detail';
export const NOTES_ROUTES:Routes=[
  {path:'',component:NoteList},
  {path:':id',component:NoteDetail}
  
];