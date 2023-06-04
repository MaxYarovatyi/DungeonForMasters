import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CharacterClass } from 'src/app/shared/models/characterClass';
import { CharacterRace } from 'src/app/shared/models/characterRace';
import { CharClass, Skills } from 'src/app/shared/models/sheet';
import { User } from 'src/app/shared/models/user';
import { AccountService } from '../../account/account.service';
import { SheetService } from '../sheet.service';
@Component({
  selector: 'app-create-sheet',
  templateUrl: './create-sheet.component.html',
  styleUrls: ['./create-sheet.component.scss'],
})
export class CreateSheetComponent implements OnInit {
  returnUrl: string;
  sheetForm: FormGroup;
  races: CharacterRace[] = [];
  classes: CharacterClass[] = [];
  skills: Skills;
  proficiencyBonus: number = 0;
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
  constructor(
    private fb: FormBuilder,
    private sheetService: SheetService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    this.createForm();
    this.changeModifiers();
    this.getRaces();
    this.getClasses();
    this.getSkills();
    this.calculateProficiencyBonus();
    this.calculateSkills();
  }

  createForm() {
    this.sheetForm = this.fb.group({
      charName: ['', [Validators.required]],
      playerName: ['', [Validators.required]],
      charClass: ['', [Validators.required]],
      charRace: ['', [Validators.required]],
      background: ['', [Validators.required]],
      alignment: ['', [Validators.required]],
      level: ['', [Validators.required]],
      expiriencePoints: ['', [Validators.required]],
      armorClass: ['', [Validators.required]],
      initiative: ['', [Validators.required]],
      speed: ['', [Validators.required]],
      maxHitPoints: ['', [Validators.required]],
      currentHitPoints: ['', [Validators.required]],
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
      skills: this.fb.group({
        acrobatics: [false, []],
        animalHandling: [false, []],
        arcana: [false, []],
        athletics: [false, []],
        deception: [false, []],
        history: [false, []],
        insight: [false, []],
        intimidation: [false, []],
        investigation: [false, []],
        medicine: [false, []],
        nature: [false, []],
        perception: [false, []],
        performance: [false, []],
        persuasion: [false, []],
        religion: [false, []],
        sleightOfHand: [false, []],
        stealth: [false, []],
        survival: [false, []],
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
            this.skillList.forEach((skill) => {
              if (this.skillsWithModifiers[skill] == char) {
                this.changeSkillValues(skill);
              }
            });
          }
        });
    }
    document.getElementById('passiveWisdom').innerText =
      10 + this.sheetForm.get('modificators').get('wisdomModificator').value;
  }
  getRaces() {
    this.sheetService.getRaces().subscribe((response: CharacterRace[]) => {
      for (let race of response) {
        this.races.push(race);
      }
    });
  }
  getClasses() {
    this.sheetService.getClasses().subscribe((response: CharClass[]) => {
      for (let charClass of response) {
        this.classes.push(charClass);
      }
    });
  }
  getSkills() {
    let skills = [];
    let skillsFromDocument = document.getElementsByClassName('skill');
    for (let i = 0; i < skillsFromDocument.length; i++)
      skills.push(skillsFromDocument[i].id);
  }
  calculateProficiencyBonus() {
    let pbElement = document.getElementById('proficiencyBonus');
    this.sheetForm.get('level').valueChanges.subscribe((value) => {
      this.proficiencyBonus = value;
      if (this.proficiencyBonus) {
        this.proficiencyBonus = Math.floor((this.proficiencyBonus - 1) / 4) + 2;
        pbElement.innerText = '+' + this.proficiencyBonus.toString();
      }
    });
  }
  calculateSkills() {
    this.skillList.forEach((skill) => {
      this.sheetForm
        .get('skills')
        .get(skill)
        .valueChanges.subscribe((value) => {
          this.changeSkillValues(skill);
        });
      this.sheetForm.get('level').valueChanges.subscribe((value) => {
        this.changeSkillValues(skill);
      });
    });
  }
  onSubmit() {
    let formValue = this.sheetForm.value;
    formValue.skills = {
      acrobatics: +document.getElementById('acrobatics').textContent,
      animalHandling: +document.getElementById('animalHandling').textContent,
      arcana: +document.getElementById('arcana').textContent,
      athletics: +document.getElementById('athletics').textContent,
      deception: +document.getElementById('deception').textContent,
      history: +document.getElementById('history').textContent,
      insight: +document.getElementById('insight').textContent,
      intimidation: +document.getElementById('intimidation').textContent,
      investigation: +document.getElementById('investigation').textContent,
      medicine: +document.getElementById('medicine').textContent,
      nature: +document.getElementById('nature').textContent,
      perception: +document.getElementById('perception').textContent,
      performance: +document.getElementById('performance').textContent,
      persuasion: +document.getElementById('persuasion').textContent,
      religion: +document.getElementById('religion').textContent,
      sleightOfHand: +document.getElementById('sleightOfHand').textContent,
      stealth: +document.getElementById('stealth').textContent,
      survival: +document.getElementById('survival').textContent,
    };
    console.log(formValue);
  }
  onReturn() {
    this.router.navigateByUrl(this.returnUrl);
  }
  private changeSkillValues(skill: string) {
    let element = document.getElementById(skill);
    let checked = this.sheetForm.get('skills').get(skill).value;
    let result = +this.sheetForm
      .get('modificators')
      .get(this.skillsWithModifiers[skill] + 'Modificator').value;
    if (checked) {
      let result = +this.sheetForm
        .get('modificators')
        .get(this.skillsWithModifiers[skill] + 'Modificator').value;
      element.innerText =
        (result > 0 ? '+' : '') + (result + this.proficiencyBonus);
    } else {
      element.innerText = (result > 0 ? '+' : '') + result;
    }
  }
}
