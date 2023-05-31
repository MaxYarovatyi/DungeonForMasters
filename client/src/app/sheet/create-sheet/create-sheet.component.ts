import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AccountService } from '../../account/account.service';
@Component({
  selector: 'app-create-sheet',
  templateUrl: './create-sheet.component.html',
  styleUrls: ['./create-sheet.component.scss'],
})
export class CreateSheetComponent implements OnInit {
  sheetForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
    this.changeModifiers();
  }

  createForm() {
    this.sheetForm = this.fb.group({
      charName: ['', [Validators.required]],
      playerName: ['', [Validators.required]],
      abilityScores: this.fb.group({
        strength: ['', [Validators.required]],
        dexterity: ['', [Validators.required]],
        constitution: ['', [Validators.required]],
        intelligence: ['', [Validators.required]],
        wisdom: ['', [Validators.required]],
        charisma: ['', [Validators.required]],
      }),
      modificators: this.fb.group({
        strengthModificator: ['', [Validators.required]],
        dexterityModificator: ['', [Validators.required]],
        constitutionModificator: ['', [Validators.required]],
        intelligenceModificator: ['', [Validators.required]],
        wisdomModificator: ['', [Validators.required]],
        charismaModificator: ['', [Validators.required]],
      }),
    });
  }
  changeModifiers() {
    const chars = [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma',
    ];
    for (let char of chars) {
      this.sheetForm
        .get('abilityScores')
        .get(char)
        .valueChanges.subscribe((value) => {
          if (value > 0) {
            const modifier = Math.floor((+value - 10) / 2);
            this.sheetForm
              .get('modificators')
              .get(char + 'Modificator')
              .setValue((modifier > 0 ? '+' : '') + modifier);
          }
        });
    }
    document.getElementById('passiveWisdom').innerText =
      10 + this.sheetForm.get('modificators').get('wisdomModificator').value;
    //console.log(this.sheetForm.get('abilityScores').get('strength').value);
  }
}
