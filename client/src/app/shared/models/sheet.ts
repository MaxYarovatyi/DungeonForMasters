export interface Sheet {
  id: number;
  charName: string; //
  level: number; //
  charClass: CharClass; //
  charClassId: number; //
  charRace: CharRace; //
  charRaceId: number; //
  armorClass: number; //
  playerName: string; //
  expiriencePoints: number; //
  initiative: number; //
  speed: number; //
  abilityScores: AbilityScores; //
  abilityScoresId: number; //
  skills: Skills;
  skillsId: number;
  background: string; //
  alignment: string; //
  currentHitPoints: number;
  maxHitPoints: number;
  modificators: Modificators; //
  modificatorsId: number; //
}

export interface CharClass {
  id: number;
  name: string;
}

export interface CharRace {
  id: number;
  name: string;
}

export interface AbilityScores {
  id: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Skills {
  id: number;
  acrobatics: number;
  animalHandling: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleightOfHand: number;
  stealth: number;
  survival: number;
}

export interface Modificators {
  id: number;
  strengthModificator: number;
  dexterityModificator: number;
  constitutionModificator: number;
  intelligenceModificator: number;
  wisdomModificator: number;
  charismaModificator: number;
}
