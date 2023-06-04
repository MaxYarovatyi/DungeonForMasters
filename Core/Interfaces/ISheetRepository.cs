using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ISheetRepository
    {
        public Task<CharacterSheet> GetCharacterSheetByIdAsync(int id);
        public Task<IReadOnlyList<CharacterSheet>> GetCharacterSheetsAsync();
        public Task<IReadOnlyList<CharacterClass>> GetCharacterClassesAsync();
        public Task<IReadOnlyList<CharacterRace>> GetCharacterRacesAsync();
        public Task<AbilityScores> CreateAbilityScoresAsync(AbilityScores abilityScores);
        public Task<Modificators> CreateModificatorsAsync(Modificators modificators);
        public Task<SkillList> CreateSkillsAsync(SkillList skills);
        public Task<CharacterSheet> CreateCharacterSheetAsync(CharacterSheet sheet);
        public Task<CharacterClass> FindCharClass(string charClass);
        public Task<CharacterRace> FindCharRace(string charRace);
    }
}