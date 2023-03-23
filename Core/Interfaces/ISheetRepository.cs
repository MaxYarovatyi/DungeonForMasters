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
    }
}