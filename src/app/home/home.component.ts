import { Component } from '@angular/core';
import data from '../../assets/trivia2.json';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { saveAs } from 'file-saver';

interface question {
  pregunta: string, opciones: string[], respuesta: string
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  filteredQuestions:question[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    for(let item of data) {
      this.filteredQuestions.push(item);
    }

    this.filteredQuestions.sort(this.compare);

    console.log(this.filteredQuestions)
  }

  compare(a:question, b:question) {
    if(a.respuesta < b.respuesta) return -1;
    if(a.respuesta > b.respuesta) return 1;
    return 0;
  }

  delete(item: question, index: number) {
    this.filteredQuestions.splice(index, 1);
  }

  exportToJson() {
    let exportData = this.filteredQuestions;
    return saveAs(new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }), 'trivia.json')
  }
}
