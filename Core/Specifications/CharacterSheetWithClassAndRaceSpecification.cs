using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class CharacterSheetWithClassAndRaceSpecification : BaseSpecification<CharacterSheet>
    {
        public CharacterSheetWithClassAndRaceSpecification(int id) : base(o => o.Id == id)
        {
            AddInclude(o => o.AbilityScores);
            AddInclude(o => o.CharClass);
            AddInclude(o => o.CharRace);
            AddInclude(o => o.Skills);
            AddInclude(o => o.Modificators);
        }

    }
}