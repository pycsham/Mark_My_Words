import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteService } from '../../providers/note-service/note-service';
import { Note } from '../../models/note-model'
import { FormGroup, FormControl } from '@angular/forms';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html'
})
export class AddNotePage {
  formGroup: FormGroup;
  note: Note;
  date: Date = new Date();
  title: string = '';
  content: string = '';
  matches: String[];
  isRecording = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private noteService: NoteService,
    private SpeechRecognition: SpeechRecognition,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      date: new FormControl()
    })
  }

  saveNote(note: Note){
    this.noteService.saveNote(note);
    this.navCtrl.pop();

  }

  startListening(){
    let options = {
      language: 'en-US',
      showPartial: true
    }
    this.SpeechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
      this.ChangeDetectorRef.detectChanges();
    });
    this.isRecording = true;
  }

  stopListening(){
    this.SpeechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission(){
    this.SpeechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.SpeechRecognition.requestPermission();
      }
    })
  }





}
