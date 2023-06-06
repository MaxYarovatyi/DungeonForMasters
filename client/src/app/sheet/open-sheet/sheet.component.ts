import { Component, OnInit } from '@angular/core';
import { Sheet } from '../../shared/models/sheet';
import { SheetService } from '../sheet.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent implements OnInit {
  sheet: Sheet;
  skillList = [
    'acrobatics',
    'animalHandling',
    'arcana',
    'athletics',
    'deception',
    'history',
    'insight',
    'intimidation',
    'investigation',
    'medicine',
    'nature',
    'perception',
    'performance',
    'persuasion',
    'religion',
    'sleightOfHand',
    'stealth',
    'survival',
  ];
  abilityScores = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
  ];
  skillsWithModifiers = {
    ['acrobatics']: 'dexterity',
    ['animalHandling']: 'wisdom',
    ['arcana']: 'intelligence',
    ['athletics']: 'strength',
    ['deception']: 'charisma',
    ['history']: 'intelligence',
    ['insight']: 'wisdom',
    ['intimidation']: 'charisma',
    ['investigation']: 'intelligence',
    ['medicine']: 'wisdom',
    ['nature']: 'intelligence',
    ['perception']: 'wisdom',
    ['performance']: 'charisma',
    ['persuasion']: 'charisma',
    ['religion']: 'intelligence',
    ['sleightOfHand']: 'dexterity',
    ['stealth']: 'dexterity',
    ['survival']: 'wisdom',
  };
  characterProps = [
    'charName',

    'level',

    'armorClass',

    'playerName',

    'expiriencePoints',

    'initiative',

    'speed',

    'background',

    'alignment',

    'currentHitPoints',

    'maxHitPoints',
  ];
  proficiencyBonus: number;
  ngOnInit(): void {
    this.getSheet();
  }

  constructor(private sheetService: SheetService) {}

  getSheet() {
    this.sheetService.getSheetById(4).subscribe(
      (sheet: Sheet) => {
        this.sheet = sheet;
        this.proficiencyBonus = Math.floor(this.sheet.level - 1) / 4 + 2;
        this.fillValues();
        console.log(this.sheet);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  fillValues() {
    for (let as of this.abilityScores) {
      document.getElementById(as).innerText = this.sheet.abilityScores[as];
      const modificator = this.sheet.modificators[as + 'Modificator'];
      document.getElementById(as + 'Modifier').innerText =
        modificator > 0 ? '+' + modificator : modificator;
    }
    for (let skill of this.skillList) {
      const returnedSkill = this.sheet.skills[skill];
      document.getElementById(skill).innerText =
        returnedSkill > 0 ? '+' + returnedSkill : returnedSkill;
      const skillIsChecked =
        this.sheet.skills[skill] - this.proficiencyBonus ==
        this.sheet.modificators[
          this.skillsWithModifiers[skill] + 'Modificator'
        ];
      if (skillIsChecked)
        document.getElementById(skill + 'Check').classList.add('checked');
    }
    for (let prop of this.characterProps) {
      document.getElementById(prop).innerText = this.sheet[prop];
    }
    document.getElementById('charClass').innerText = this.sheet.charClass.name;
    document.getElementById('charRace').innerText = this.sheet.charRace.name;
    document.getElementById('proficiencyBonus').innerText =
      '+' + this.proficiencyBonus;
    document.getElementById('passiveWisdom').innerText =
      '' +
      (10 + this.sheet.modificators.wisdomModificator + this.proficiencyBonus);
  }
}
