using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CharacterSheetDto
    {
        public string CharName { get; set; }
        public string PlayerName { get; set; }
        public string CharClass { get; set; }
        public string CharRace { get; set; }
        public string Background { get; set; }
        public string Alignment { get; set; }
        public int Level { get; set; }
        public int ExpiriencePoints { get; set; }
        public int ArmorClass { get; set; }
        public int Initiative { get; set; }
        public int Speed { get; set; }
        public int MaxHitPoints { get; set; }
        public int CurrentHitPoints { get; set; }
        public AbilityScoresDto AbilityScores { get; set; }
        public ModificatorsDto Modificators { get; set; }
        public SkillsDto Skills { get; set; }
    }
}