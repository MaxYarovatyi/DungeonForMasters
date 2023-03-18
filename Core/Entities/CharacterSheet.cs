using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CharacterSheet : BaseEntity
    {
        public string CharName { get; set; }
        public int Level { get; set; }
        public CharacterClass CharClass { get; set; }
        public int CharClassId { get; set; }
        public CharacterRace CharRace { get; set; }
        public int CharRaceId { get; set; }
        public int ArmorClass { get; set; }
        public string PlayerName { get; set; }
        public int ExpiriencePoints { get; set; }
        public int Initiative { get; set; }
        public int Speed { get; set; }
        public AbilityScores AbilityScores { get; set; }
        public SkillList Skills { get; set; }
        public string Background { get; set; }
        public string Alignment { get; set; }
        public string CurrentHitPoints { get; set; }
        public string MaxHitPoints { get; set; }
    }
}