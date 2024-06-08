import { Component } from '@angular/core';
import { CharacterListComponent } from '../character-list/components/character-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharacterListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
