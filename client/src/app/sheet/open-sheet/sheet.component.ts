import { Component, Input, OnInit } from '@angular/core';
import { Sheet } from '../../shared/models/sheet';
import { SheetService } from '../sheet.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent implements OnInit {
  @Input() sheetId: number;
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
    this.sheetService.getSheetById(this.sheetId + '').subscribe(
      (sheet: Sheet) => {
        this.sheet = sheet;
        this.proficiencyBonus = Math.floor((this.sheet.level - 1) / 4) + 2;
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
      let id = as + this.sheetId;
      document.getElementById(as).setAttribute('id', id);
      document.getElementById(id).innerText = this.sheet.abilityScores[as];
      const modificator = this.sheet.modificators[as + 'Modificator'];
      document
        .getElementById(as + 'Modifier')
        .setAttribute('id', id + 'Modifier');
      document.getElementById(id + 'Modifier').innerText =
        modificator > 0 ? '+' + modificator : modificator;
    }
    for (let skill of this.skillList) {
      let id = skill + this.sheetId;
      const returnedSkill = this.sheet.skills[skill];
      document.getElementById(skill).setAttribute('id', id);
      document.getElementById(skill + 'Check').setAttribute('id', id + 'Check');
      document.getElementById(id).innerText =
        returnedSkill > 0 ? '+' + returnedSkill : returnedSkill;
      const skillIsChecked =
        this.sheet.skills[skill] - this.proficiencyBonus ==
        this.sheet.modificators[
          this.skillsWithModifiers[skill] + 'Modificator'
        ];

      if (skillIsChecked)
        document.getElementById(id + 'Check').classList.add('checked');
    }
    for (let prop of this.characterProps) {
      document.getElementById(prop).setAttribute('id', prop + this.sheetId);
      document.getElementById(prop + this.sheetId).innerText = this.sheet[prop];
    }
    document
      .getElementById('charClass')
      .setAttribute('id', 'charClass' + this.sheetId);
    document.getElementById('charClass' + this.sheetId).innerText =
      this.sheet.charClass.name;
    document
      .getElementById('charRace')
      .setAttribute('id', 'charRace' + this.sheetId);
    document.getElementById('charRace' + this.sheetId).innerText =
      this.sheet.charRace.name;
    document
      .getElementById('proficiencyBonus')
      .setAttribute('id', 'proficiencyBonus' + this.sheetId);
    document.getElementById('proficiencyBonus' + this.sheetId).innerText =
      '+' + this.proficiencyBonus;
    document
      .getElementById('passiveWisdom')
      .setAttribute('id', 'passiveWisdom' + this.sheetId);
    document.getElementById('passiveWisdom' + this.sheetId).innerText =
      '' +
      (10 + this.sheet.modificators.wisdomModificator + this.proficiencyBonus);
  }
}
